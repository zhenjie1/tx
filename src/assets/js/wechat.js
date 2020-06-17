/**
 * 判断两个好友是不是同一个人
 *
 * @param {object} f1 好友数据
 * @param {object} f2 好友数据
 * @returns {boolean} 返回布尔值
 */
export function isSomeFriend (f1, f2) {
  if (!f1 || !f2) return false

  return f1.wechatUserId === f2.wechatUserId && f1.wxId === f2.wxId
}

/**
 * 检查是不是群聊
 *
 * @param {string} wxId 好友或群的 wxId
 * @returns {boolean} 返回布尔值
 */
export function isGroup (wxId) {
  if (/(@chatroom)$/.test(wxId)) return true
  return false
}

/**
 * 检查是不是群聊
 *
 * @param {string} wxId 好友或群的 wxId
 * @returns {boolean} 返回布尔值
 */
export function isFriend (wxId) {
  return !isGroup(wxId)
}
