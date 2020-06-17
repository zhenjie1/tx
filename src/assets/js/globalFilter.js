import Vue from 'vue'

/**
 * 获取好友数据的名字
 *
 * @param {object} item 好友数据
 * @returns {string} 返回显示的名字
 */
export function getWechatName (item) {
  if (!item) return '无'

  return item.remarkName || item.nickName
}

Vue.filter('wechatName', function (item) {
  return getWechatName(item)
})

/**
 * 获取好友数据的名字
 *
 * @param {object} item 好友数据
 * @returns {string} 返回显示的名字
 */
export function getWechatAvatar (item) {
  if (!item) return 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

  return item.headImgUrl || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
}

Vue.filter('wechatAvatar', function (item) {
  return getWechatAvatar(item)
})
