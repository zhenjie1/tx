import Vue from 'vue'
import Sockets from '.'
import { logs } from '@/libs/tools'
/**
 * 初始化 socket 的事件
 *
 * @param {Sockets} socketListener Sockets 类
 * @returns {void} 无返回值
 */
export default function initSocketEvent (socketListener) {
  if (!socketListener.socket) {
    setTimeout(() => initSocketEvent(socketListener), 200)
    return
  }
  /**
   * socket 接受到消息监听
   *
   * @param {any} messageEvent 收到的数据
   * @returns {void} 无返回值
   */
  socketListener.socket.onmessage = function (messageEvent) {
    let data = messageEvent.data
    try {
      data = JSON.parse(data)
    } catch {}

    const sockets = Vue.prototype.$sockets
    if (!sockets) return

    // 收到消息，心跳将重新计算
    socketListener.initHeartbeat()

    sockets.emitter.emit('message', data) // 收到消息的公共函数

    // 判断异常
    if (data.code !== 100000) {
      sockets.emitter.emit('codeError', data)
      // return
    }

    // 开始执行
    const name = data.data.msgType || 'emptyName'
    // console.log(name)
    sockets.emitter.emit(name, data)
  }

  /**
   * socket 连接成功监听
   *
   * @returns {void} 无返回值
   */
  socketListener.socket.onopen = function () {
    logs('log', '连接成功')
    const sockets = Vue.prototype.$sockets
    if (!sockets) return

    // 先将 sends 中的数据发出去
    socketListener.sendSaveData()

    sockets.emitter.emit('connct')
  }

  /**
   * socket 报错监听
   *
   * @returns {void} 无返回值
   */
  socketListener.socket.onerror = function () {
    logs('error', '报错了')
    // 断开重连
    if (socketListener.isReconnect) {
      setTimeout(() => socketListener.createSocket(true), socketListener.reconnectTime * 1000)
    }
  }

  /**
   * socket 断开监听
   *
   * @returns {void} 无返回值
   */
  socketListener.socket.onclose = function () {
    logs('error', '断开了')
    // 断开重连
    if (socketListener.isReconnect) {
      setTimeout(() => socketListener.createSocket(true), socketListener.reconnectTime * 1000)
    }
  }
}
