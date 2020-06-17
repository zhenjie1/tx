import fetch from '@/libs/fetch/fetch'

import Cookies from 'js-cookie'

/**
 * 通过 refreshToken 获取 accessToken
 *
 * @returns {Promise} 返回
 */
export const fetchRefreshToAccessToken = () => {
  const refreshToken = Cookies.get('refreshToken')
  if (!refreshToken) return Promise.reject('无法通过 refreshToken 获取 accessToken, refreshToken 为空')

  return fetch({
    url: '/product.token.get',
    method: 'get',
    data: {
      isRefreshAccessToken: true
    },
    headers: { refreshToken }
  })
}

/**
 * 获取登陆所需的图形码
 *
 * @returns {Promise} 返回
 */
export const fetchGetLoginQrCode = () => {
  return fetch({
    url: '/secret.graphcode.get',
    method: 'get',
    dataArr: ['data', 'data'],
    data: {
      isRefreshAccessToken: true
    }
  })
}

/**
 * 登录接口
 *
 * @param {object} data 所需数据
 * @returns {Promise} 返回 Promise
 */
export const fetchLogin = (data) => fetch({
  url: '/product.user.login',
  data: {
    isRefreshAccessToken: true,
    ...data
  }
})
