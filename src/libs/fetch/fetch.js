import Vue from 'vue'
import axios from 'axios'
import { getAjaxUrl } from '@/config/url'
import sendAjaxBefore from '@/libs/fetch/sendAjaxBefore'
import { sendAjaxAfter, sendAjaxAfterError } from '@/libs/fetch/sendAjaxAfter'

import Cookie from 'js-cookie'
import Qs from 'qs'

/**
 * 发送一个请求
 *
 * @param {object} params 参数
 * @param {object | string} params.url 请求地址或配置
 * @param {object | FormData} params.data 请求参数
 * @param {'get' | 'post'} params.method 请求方式 post | get
 * @param {boolean} params.loading 是否显示全局loading
 * @param {boolean} params.isCodeDeal 是否对code进行验证
 * @param {Array} params.dataArr 获取数据方式
 * @param {boolean} params.file 区分是上传文件还是普通接口
 * @returns {Promise} 返回 Promise
 */
export default function fetch (params) {
  let {
    url = '',
    data = {},
    method = 'post',
    isCodeDeal = true,
    headers = {},
    dataArr = ['data'],
    file = false
  } = params
  method = method.toLowerCase()

  const accessToken = Cookie.get('accessToken')

  const config = {
    method,
    data,
    baseURL: getAjaxUrl().ajax,
    url,
    // withCredentials: true,
    timeout: 10 * 1000,
    headers: {
      accessToken: accessToken
    }
  }

  if (method === 'get' && Object.keys(data).length > 0) {
    const params = Qs.stringify(data)
    config.url = `${config.url}?${params}`
    // console.info()
  }

  Object.assign(config.headers, headers)

  if (file) config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

  return axios(config).then(res => {
    const { data } = res
    const responseData = getResponseParams(dataArr, res)

    if (!isCodeDeal) return responseData

    if (data.code === 100000) {
      return responseData
    } else {
      // Vue.prototype.$Notify.error({ title: data.msg })
      Vue.prototype.$Message.error(data.msg)
      // console.warn('code 没有通过', config.url)
      throw data
    }
  }).catch(err => {
    throw err
  })
}

/**
 * 发起请求前
 *
 */
axios.interceptors.request.use(config => {
  const ajaxAfter = sendAjaxBefore(config)

  return ajaxAfter
})
/** 请求返回 拦截器
 * 第一个参数： 成功后执行的函数
 * 第二个参数： 接口异常后执行的函数，如 500， 400
 */
axios.interceptors.response.use(data => {
  return sendAjaxAfter(data)
  // return data
}, err => {
  sendAjaxAfterError(err)
  return Promise.reject(err)
})

/**
 * 递归拿到需要的请求返回值
 *
 * @param { Array } arr 数据位置
 * @param {object} res 数据源
 * @returns {any} 返回的数据
 */
function getResponseParams (arr, res) {
  if (!Array.isArray(arr) || typeof res !== 'object') return res
  const item = arr[0]
  if (arr.length <= 1) return res[item]

  arr.shift()
  return getResponseParams(arr, res[item])
}
