/**
 * 选中单个好友
 *
 * @param {object} state vuex state 数据
 * @param {object} friend 要选中的好友
 * @returns {object} 返回选中的好友
 */
export function checkedFriend (state, friend) {
  if (!friend) throw new Error('选中失败, friend 为空')
  state.checkedFriend = friend
  return friend
}
