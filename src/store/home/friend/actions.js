import { fetchGetFriendList } from '@/api/friend'
import { IDBOperate } from '@/plugins/indexDB/indexDBOperate'
import IDBWechats from '@/indexDB/wechat'

/**
 * 初始化某个微信号的好友数据
 *
 * @param {object} root0 vuex action 数据
 * @param {object} root0.state vuex state 数据
 * @param {object} wechat 微信号对象
 * @returns {Promise} 返回新数据
 */
export async function initFriend ({ state }, wechat) {
  if (typeof wechat !== 'object') throw new Error('初始化失败, wechat 为空')

  if (!wechat.wechatUserId) throw new Error('初始化失败, 没有找到唯一标识')

  const friendData = await fetchGetFriendList(wechat)

  await IDBOperate.bulkPut(IDBWechats, 'friends', friendData)
}
