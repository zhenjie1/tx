import fetch from '@/libs/fetch/fetch'

/**
 * 获取微信号列表
 *
 * @returns {Promise} 返回 Promise
 */
export const fetchGetWechatList = () => fetch({
  url: '/wechat.account.list',
  method: 'get',
  dataArr: ['data', 'data']
})
