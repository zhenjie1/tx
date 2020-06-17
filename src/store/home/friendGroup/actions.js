// import IDBWechats from '@/indexDB/wechat'

import { IDBOperate } from '@/plugins/indexDB/indexDBOperate'
import IDBWechats from '@/indexDB/wechat'
import { fetchGetConversation } from '@/api/conversation'
import { isFriend } from '@/assets/js/wechat'

/**
 * 删除指定微信号下所有的好友与群聊
 *
 * @param {object} root0 vuex action 数据
 * @param {object} root0.state vuex state 数据
 * @param {string} uin 微信号 uin
 * @returns {Promise} 返回Promise
 */
export async function removeFriend ({ state }, uin) {
  if (!uin) throw new Error('删除失败, 缺少 uin 标识')

  IDBOperate.delete(IDBWechats, 'wechats', uin)
//   IDBWechats
}

/**
 * 初始化某个微信号的会话数据
 *
 * @param {object} root0 vuex action 数据
 * @param {object} root0.state vuex state 数据
 * @param {object} wechat 单个微信号数据
 * @returns {Promise} 返回最新的会话
 */
export async function initConversation ({ state }, wechat) {
  if (!wechat) throw new Error('初始化会话数据失败, 缺少 wechat 数据')

  const converDataFetch = fetchGetConversation(wechat)

  const localFriend = IDBWechats.friends.where('uin').equals(wechat.uin).toArray()
  const localGroup = IDBWechats.groups.where('uin').equals(wechat.uin).toArray()

  // console.log(localFriend, localGroup)
  return Promise.all([converDataFetch, localFriend, localGroup]).then(result => {
    const [converData, friendData, groupData] = result
    // 将会话数据合并入好友数据
    converData.map(conver => {
      const sourceData = isFriend(conver.wxId) ? friendData : groupData
      const index = sourceData.findIndex(f => f.wxId === conver.wxId)
      if (index === -1) return

      Object.assign(sourceData[index], conver)
    })

    // 将合并好的数据保存到 indexDB
    IDBOperate.bulkPut(IDBWechats, 'friends', friendData)
    IDBOperate.bulkPut(IDBWechats, 'groups', groupData)
  })
}
