import Vue from 'vue'
import VueSockets from '@/plugins/sockets'

import { importFile } from '@/libs/util'

// 要全局监听的 socket 文件夹
const socketData = importFile(require.context('../libs/globalSocketsWatch', false, /\.js$/), 'filename')

let socketObj = {}
/**
 * 创建 socket 的公共闭包函数
 *
 * @returns {VueSockets} 返回 socket 实例
 */
function createSocket () {
  const vueSockets = new VueSockets({
    globalSocket: socketData
  })

  // 保存 sockets
  socketObj = vueSockets
  window.socketObj = socketObj

  Vue.use(vueSockets)
  return vueSockets
}

/**
 * 只是初始化了 socket 相关的回调收集，并没有开始连接 socket
 * 如需连接 socket，请执行 initSocket.createSocket()
 */
const initSocket = createSocket()

export {
  socketObj,
  initSocket
}
