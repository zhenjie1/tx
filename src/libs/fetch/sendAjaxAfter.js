import { ajaxTokenInvalid } from './sendAjaxBefore'
import router from '@/router'

/**
 * 发送请求结束并成功后的执行
 *
 * @param {object} result config 配置
 * @returns {Promise} 返回Promise
 */
export function sendAjaxAfter (result) {
  if (result.data.code === 900019) {
    const ajaxDeal = ajaxTokenInvalid(result)
    return ajaxDeal
  } else if (result.data.code === 900101) {
    router.push('/login')
  } else if (result.data.code === 900010) { // 登陆失效
    router.push('/login')
  } else if (result.data.code === 900018) { // refreshToken 失效
    router.push('/login')
  }
  return result
}

/**
 * 发送请求结束，但请求失败时执行
 *
 * @param {any} error 错误详情
 * @returns {Promise} 返回
 */
export function sendAjaxAfterError (error) {
  return error
}
