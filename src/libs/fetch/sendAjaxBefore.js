import Cookie from 'js-cookie'
import router from '@/router'
import { fetchRefreshToAccessToken } from '@/api/login'
import { logs } from '../tools'
import axios from 'axios'

// 如果是正在换取 accessToken 期间
// 先将请求都存起来, 换到新的 accessToken 后在请求
let fetchState = []

/**
 * 发送请求前执行
 *
 * @param {object} config config 配置
 * @returns {Promise} 务必要把 config 返回去
 */
export default function sendAjaxBefore (config) {
  if (config.data.isRefreshAccessToken) return config
  const refreshToken = Cookie.get('refreshToken')
  // const accessToken = Cookie.get('accessToken')

  // 没有 refreshToken, 直接跳转到 login 页
  if (!refreshToken) {
    router.push('/login')
    return Promise.reject('没有 refreshToken, 已跳转到登陆')
  }

  // if (!accessToken) {
  //   return ajaxTokenInvalid(config)
  // }

  return config
}

/**
 * 首发请求时,处理无效 token
 *
 * @param {object} config config
 * @returns {void}
 */
export function ajaxTokenInvalid (config) {
  const refreshToken = Cookie.get('refreshToken')

  // 没有 refreshToken, 直接跳转到 login 页
  if (!refreshToken) {
    router.push('/login')
    return Promise.reject('没有 refreshToken, 已跳转到登陆')
  }

  if (config.data.isRefreshAccessToken) {
    return config
  }

  // 有 refreshToken, 没有 accessToken,
  // 先通过 refreshToken 获取 accessToken, 在拿着新的 accessToken 获取数据
  const promise = new Promise((resolve, reject) => fetchState.push({
    resolve,
    reject,
    config
  }))

  // 返回 Promise,使请求进入等待状态
  if (fetchState.length !== 1) return promise

  // 获取新的 token
  fetchRefreshToAccessToken().then(({ data: newToken }) => {
    // 保存新的 accessToken
    Cookie.set('accessToken', newToken, { expires: (29 / 60) / 24 }) // 有效期 29 分钟

    // 将之前存起来的请求循环再次重新请求
    fetchState.map(option => {
      const newConfig = option.config.config ? option.config.config : option.config
      // 设置新的 accessToken
      newConfig.headers.accessToken = newToken

      // 开始发送请求
      axios(newConfig).then(newResult => {
        // 请求成功后,将请求标记为 成功状态
        option.resolve(newResult)
      }).catch(err => {
        logs('error', '新的额 token 请求报错', err)
        option.reject(err)
      })

      // 清空存的请求
      fetchState = []
    })
  }).catch((err) => {
    router.push('/login')
    fetchState.map(f => f.reject(err))
  })
  return promise
}
