import fetch from '@/libs/fetch/fetch'
import { lackFriendField } from '@/assets/js/wechat/friendGroupDeal'

/**
 * 获取指定微信号的所有好友数据
 *
 * @param {object} wechat 微信号数据
 * @param {number} pageNum 第几页
 * @param {number} pageSize 每页多少条数据
 * @returns {Promise} 返回好友数据
 */
export const fetchGetFriendList = (wechat, pageNum = 1, pageSize = 5000) => fetch({
  url: '/wechat.friend.list',
  method: 'get',
  dataArr: ['data', 'data', 'list'],
  data: {
    weChatUserId: wechat.wxId,
    pageNum,
    pageSize,
    sign: 1 // 1 好友  2 群聊
  }
}).then(res => {
  res.map(v => {
    v.uin = wechat.uin

    lackFriendField(v)
    return v
  })
  return res
})
