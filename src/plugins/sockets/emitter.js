/**
 * 为 socket 存储回调
 */
export default class EventEmitter {
  constructor () {
    this.listeners = new Map()
  }

  /**
   * 添加一个 socket 监听
   *
   * @param {string} event 要监听的 socket 名字
   * @param {Function} callback 回调函数
   * @param {any} component 执行回调函数时的 this 指向
   * @returns {void}
   */
  addListener (event, callback, component) {
    if (typeof callback === 'function') {
      // 如果之前没有监听过，初始化一个空数组
      if (!this.listeners.has(event)) this.listeners.set(event, [])

      this.listeners.get(event).push({ callback, component })
    } else {

    }
  }

  /**
   * 删除一个事件的监听
   *
   * @param {string} event 要监听的 socket 名字
   * @param {any} component 执行回调函数时的 this 指向
   * @returns {void}
   */
  removeListener (event, component) {
    if (this.listeners.has(event)) {
      // 将与 component 不一样的过滤出来
      const listeners = this.listeners.get(event).filter(listener => (
        listener.component !== component
      ))

      // 删除
      if (listeners.length > 0) {
        this.listeners.set(event, listeners)
      } else {
        this.listeners.delete(event)
      }
    }
  }

  /**
   * 执行指定名字的 socket 回调
   *
   * @param {string} event 要监听的 socket 名字
   * @param {Array} args 参数
   * @returns {void}
   */
  emit (event, args) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((listener) => {
        listener.callback.call(listener.component, args)
      })
    }
  }
}
