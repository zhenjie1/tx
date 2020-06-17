/**
 * 全局混入的配置
 *
 * @param {Sockets} Sockets socket 类
 * @returns {void}
 */
export default function (Sockets) {
  return {
    /**
     * 进入页面，页面开始渲染之前的生命周期
     *
     * @returns {void}
     */
    beforeCreate () {
      if (typeof this.$options.sockets !== 'object') return

      for (const name in this.$options.sockets) {
        if (typeof this.$options.sockets[name] !== 'function') continue

        Sockets.emitter.addListener(name, this.$options.sockets[name], this)
      }
    },

    /**
     * 销毁组件之前的生命周期
     *
     * @returns {void}
     */
    beforeDestroy () {
      if (typeof this.$options.sockets !== 'object') return

      for (const name in this.$options.sockets) {
        if (typeof this.$options.sockets[name] !== 'function') continue

        Sockets.emitter.removeListener(name, this)
      }
    }
  }
}
