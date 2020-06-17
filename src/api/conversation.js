import fetch from '@/libs/fetch/fetch'
import { isConverKey, messageContent, messageCountKey, messageUploadTime } from '@/assets/js/wechat/varChat'

/**
 * 获取会话数据
 *
 * @param {object} wechat 微信号对象
 * @returns {Promise} 返回数据
 */
export const fetchGetConversation = (wechat) => fetch({
  url: '/wechating.friend.list',
  method: 'get',
  dataArr: ['data', 'data'],
  data: {
    uin: wechat.uin
  }
}).then(result => {
  return result.map(v => {
    return {
      [isConverKey]: true,
      [messageContent]: '',
      [messageUploadTime]: v.lastMessageTime ? +new Date(v.lastMessageTime) : 0,
      wxId: v.wxId,
      wechatUserId: v.wechatUserId,
      [messageCountKey]: v.chatRoomMemberCount || 0
    }
  })
})
