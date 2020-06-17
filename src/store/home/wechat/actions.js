import { fetchGetWechatList } from '@/api/wechat'
import IDBWechats from '@/indexDB/wechat'
import Store from '@/store/index'
import { IDBOperate } from '@/plugins/indexDB/indexDBOperate'

const wechatActions = {
  /**
   * 初始化微信号数
   *
   * @type {Promise}
   * @returns {Promise} 返回 Promise
   */
  async initWechats ({ state, commit }) {
    const fetchWechatList = await fetchGetWechatList()
    commit('setWechatList', fetchWechatList)

    IDBWechats.wechats.toArray().then(localWechats => {
      localWechats.map(wechat => {
        const hasExist = fetchWechatList.find(w => wechat.uin === w.uin)
        // 如果请求来的数据已经不存在了，直接删除相关数据
        if (!hasExist) {
          Store.dispatch('friendGroup/removeFriend', wechat.uin)
        }
        return wechat
      })
    })

    // 将最新的数据添加到 indexDB,并刷新页面
    await IDBOperate.bulkPut(IDBWechats, 'wechats', fetchWechatList, true)
  }
}
export default wechatActions
