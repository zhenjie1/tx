import { isDev } from '@/libs/util'
import Cookie from 'js-cookie'
import initSocketEvent from '@/plugins/sockets/socketEvent'

import debounce from 'lodash/debounce'
import { getAjaxUrl } from '@/config/url'
import Store from '@/store'
/**
 * 与服务器创建一个 socket 连接
 */
export class SocketListener {
  constructor () {
    this.timeOut = isDev ? 40 : 10 // 心跳间隔，单位：秒

    this.sends = [] // 调用 send 发送消息时，由于有去抖，可能会出现 this.socket 为空，此时先将要发的数据存起来，连接成功后一次发送

    this.reconnectTime = 2 // socket 连接失败重连的间隔，单位：秒

    this.serverTimeObj = undefined // 定时器

    this.socket = undefined // socket 对象初始化

    this.isReconnect = true // 断开是否重连
  }

  /**
   * 重新创建一个 socket 连接
   *
   * @param {boolean} isReconnection 是否是重连
   * @returns {WebSocket}
   */
  createSocket = debounce(function (isReconnection = false) {
    const token = Cookie.get('accessToken')

    // 将之前的 socket 连接断开
    // 如果是重连，无需断开，因为 this.close 方法会将 this.isReconnect 设置为 false，从而导致只重连一次的问题
    if (!isReconnection) this.close(false)

    // token 过期重新获取
    if (token === null) {
      // 重新设置token
      Store.dispatch('getAccessToken')
      // 等待设置token后再次尝试连接
      setTimeout(() => this.createSocket(), 2000)
      return
    }

    const p = location.protocol
    const protocol = p === 'https:' ? 'wss' : p === 'file:' ? 'wss' : 'ws'
    const urlConfig = getAjaxUrl()
    const url = `${protocol}://${urlConfig.ws}/${protocol}?accessToken=${token}`

    // 保存 socket 对象
    this.socket = new WebSocket(url)

    /**
     * 初始化 socket 事件处理程序
     */
    initSocketEvent.call(this, this)

    /**
     * 开启心跳
     */
    this.initHeartbeat()
  }, 200)

  sendSaveData () {
    this.sends.map(({ name, data }) => {
      this.send(name, data)
    })
    this.sends = []
  }

  /**
   * 心跳
   *
   * @returns {void} 无返回值
   */
  initHeartbeat () {
    if (this.serverTimeObj) clearInterval(this.serverTimeObj)

    this.serverTimeObj = setInterval(() => {
      const token = Cookie.get('accessToken')
      if (!token) return

      this.send('heartBeat', { accessToken: token })
    }, this.timeOut * 1000)
  }

  /**
   * 发送消息
   *
   * @param {string} name 要发消息的 msgType
   * @param {any} data 要发送的数据
   * @returns {void} 无返回值
   */
  send (name, data) {
    if (typeof data === 'undefined') throw new Error('不能发送空数据')

    // 将对象转换为字符串
    if (typeof data === 'object') {
      data.msgType = name
      data.userName = Store.state.user.userInfo.userName
      data = JSON.stringify(data)
    }

    // 开始发送
    if (this.socket) this.socket.send(data)
    else {
      this.sends.push({ name, data })
    }
  }

  /**
   * 断开 socket 连接
   *
   * @param {boolean} isReconnect 是否重连
   * @returns {void} 无返回值
   */
  close (isReconnect = true) {
    if (this.socket) {
      // 设置是否重连
      this.isReconnect = isReconnect

      // 关闭 socket 心跳
      if (this.serverTimeObj) clearInterval(this.serverTimeObj)

      // 主动断开连接
      this.socket.close()

      // 将重连机制打开
      setTimeout(() => { this.isReconnect = true }, 900)
    }
  }
}
