// 全局混入的 socket
import SocketMixin from './mixin'
// socket 监听的收集与存储
import EventEmitter from '../emitter'
// 一个 webSocket 类
import { SocketListener } from './socket'

import Vue from 'vue'

export default class Sockets extends SocketListener {
  /**
   * 构造函数
   *
   * @param {object} root0 参数配置
   * @param {object} root0.globalSocket js 文件中的 socket 监听
   */
  constructor ({ globalSocket }) {
    // 先执行下 父级的构造函数
    super()

    // 保存 socket 监听对象
    this.emitter = new EventEmitter()

    // 写在 .js 文件中的 socket
    this.globalSocket = globalSocket
  }

  /**
   * 在 vue.use 时执行
   *
   * @param {Vue} Vue 第一个参数为 Vue 类
   * @returns {void} 无返回值
   */
  install (Vue) {
    Vue.prototype.$sockets = this
    Vue.mixin(SocketMixin(this))

    this.installGlobalSocket()
  }

  /**
   * 安装全局的 socket
   *
   * @returns {void}
   */
  installGlobalSocket () {
    if (!this.globalSocket) return

    // 循环目录的单个文件
    for (const filename in this.globalSocket) {
      if (filename === 'index') continue

      // 循环单个文件中返回的 socket 监听函数
      for (const event in this.globalSocket[filename]) {
        this.emitter.addListener(
          event, // 监听的 socket 名字
          this.globalSocket[filename][event], // 监听的 socket 对应的函数
          undefined // 执行时的 this 指向
        )
      }
    }
  }
}
