import Cookie from 'js-cookie'

export default {
  /**
   * 更新用户的数据
   *
   * @param {object} state vuex state 数据
   * @param {object} data 登陆接口返回的数据
   * @returns {void}
   */
  updateUserInfo (state, data) {
    state.userInfo = data.userInfo
    state.pageAuthority = data.permissionList.split(',')

    Cookie.set('accessToken', data.accessToken, { expires: (0.1 / 60) / 24 }) // 有效期 29 分钟
    Cookie.set('refreshToken', data.refreshToken, { expires: 1 }) // 有效期 1 天
  }
}
