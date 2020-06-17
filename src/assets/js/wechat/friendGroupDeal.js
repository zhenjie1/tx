
/**
 * 为好友过群聊添加必要字段（如 letter: 首字母）
 * 注意，此函数将会改变原数据
 *
 * @param {object|Array} friend 好友或群数据
 * @returns {object|Array} 提供什么参数就返回什么类型
 */
export function lackFriendField (friend) {
  if (Array.isArray(friend)) return friend.map(f => lackFriendField(f))

  // 添加首字母
  friend.letter = getInitials(friend)

  return friend
}

/**
 * 给数据增加首字母
 *
 * @param {object} friend 好友或群数据
 * @returns {string} 返回该数据的首字母
 */
function getInitials (friend) {
  if (!friend) return '#'
  const keys = ['remarkPyQuanPin', 'remarkPyInitial', 'pyInitial', 'pyQuanPin']

  for (let i = 0; i < keys.length; i++) {
    const item = friend[keys[i]]
    if (typeof item !== 'string') continue

    // 将首字母转大写
    const letter = item.charAt(0).toLocaleUpperCase()

    // 检查首字母是不是A-z
    if (/^[A-Z]$/.test(letter)) return letter
    // 如果不是,检查下一个字段
    else continue
  }

  // 如果这几个字段都没有找到首字母,就返回 #
  return '#'
}
