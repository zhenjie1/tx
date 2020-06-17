export default {
  /**
   * 保存微信号列表数据
   *
   * @param {object} state vuex state 数据
   * @param {Array} wechatList 微信号列表数据
   * @returns {void}
   */
  setWechatList (state, wechatList) {
    if (!Array.isArray(wechatList)) throw new Error('设置微信号数据失败, wechatList 只能说 Array 类型')
  },

  /**
   * 选中一个微信号
   *
   * @param {object} state vuex state 数据
   * @param {object} wechat 微信号数据
   * @returns {void}
   */
  checkedWechat (state, wechat) {
    if (typeof wechat !== 'object') throw new Error('选中失败')

    state.checkedWechat = wechat
  }
}
