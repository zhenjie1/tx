/**
 * 全局混入的配置
 *
 * @param {IndexDB} IndexDB socket 类
 * @returns {void}
 */
import { getType, logs } from '@/libs/tools'
import IDBWechats from '@/indexDB/wechat'
import { indexDBObj } from '.'

/**
 * @param {IndexDB} IndexDB indexDB 类
 * @returns {void}
 */
export default function () {
  // .vue 文件中监听的 key 值
  const key = 'indexDB'
  return {
    /**
     * 进入页面，页面开始渲染之前的生命周期
     *
     * @returns {void}
     */
    created () {
      if (typeof this.$options[key] !== 'object') return

      for (const name in this.$options[key]) {
        const type = typeof this.$options[key][name]
        if (type !== 'function' && type !== 'object') continue

        const indexDBOptions = initOptions.call(this, name, this.$options[key][name])
        indexDBObj.emitter.addListener(name, indexDBOptions.handler, this, indexDBOptions.options)

        if (indexDBOptions.options.immediate) searchIndexDB(name, this)
      }
    },

    /**
     * 销毁组件之前的生命周期
     *
     * @returns {void}
     */
    beforeDestroy () {
      if (typeof this.$options[key] !== 'object') return

      for (const name in this.$options[key]) {
        if (!this.$options[key][name]) continue
        const indexDBOptions = initOptions.call(this, name, this.$options[key][name])

        indexDBObj.emitter.removeListener(name, indexDBOptions.components)
      }
    }
  }
}

/**
 * 初始化配置
 *
 * @param {any} event 名字
 * @param {any} indexDBObject .vue 文件中的配置
 * @returns {{immediate: boolean, handler: Function, components: any, options: object}} 返回值
 */
function initOptions (event, indexDBObject) {
  if (typeof indexDBObject !== 'function' && getType(indexDBObject) !== 'Object') {
    throw Promise.reject({
      message: '初始化 indexDB 配置失败，传入类型不正确',
      that: this,
      event,
      indexDBObject
    })
  }

  // 可选配置
  const options = {
    immediate: true,
    handler () {},
    components: this,
    options: {}
  }

  if (typeof indexDBObject === 'function') {
    options.handler = indexDBObject
  } else if (getType(indexDBObject) === 'Object') {
    for (const key in indexDBObject) {
      options[key] = indexDBObject[key]
    }
  } else {
    throw new Error('配置错误')
  }

  options.options = {
    immediate: options.immediate
  }

  return options
}

/**
 *  获取数据库
 *
 * @param {string} dataname 数据库名字
 * @returns {Dexie} 返回数据库
 */
function getIDBObject (dataname) {
  switch (dataname) {
    case 'wechats': return IDBWechats

    default: throw new Error(`没有找到indexDB库, dataname: ${dataname}`)
  }
}

/**
 * 搜索一下 indexDB 的值，赋值给页面
 *
 * @param {string} path 页面上 indexDB 设置的key （例：'wechat.allFriends'）
 * @param {Vue} that 要执行的 Vue 组件示例
 * @returns {void} 无返回
 */
function searchIndexDB (path, that) {
  const [basename, tablename] = path.split('.')
  // 没有传入表名
  if (!tablename) return logs('error', '没有传表名')

  // 根据名字获取数据库对象
  const database = getIDBObject(basename)
  // 数据库中没有找到对应的表
  if (!database.table(tablename)) return

  // 先检查缓存,如果缓存中有,可直接返回
  const indexDBCurrentPathState = indexDBObj.state.get(path)
  // 获取所有监听的此事件名
  const pathTemplateArray = indexDBObj.emitter.listeners.get(path)

  // 如果页面没有监听此事件,无需操作
  if (!Array.isArray(pathTemplateArray) || pathTemplateArray.length === 0) return

  // 根据 this 查找是否需要执行
  const template = pathTemplateArray.find(v => v.component === that)

  // 没有找到 或 找到了但没有回调函数
  if (!template || !template.callback) return

  if (indexDBCurrentPathState) {
    logs('log', '无需查询', template, that.$el)
    // 执行
    template.callback.call(that, { data: indexDBCurrentPathState })
  } else {
    // 将 indexDB 中的数据拿出来
    database.table(tablename).toArray().then(data => {
      // 保存起来
      indexDBObj.state.set(path, data)

      // 组装为页面所需的结构
      const dataParams = { data }

      // 执行
      template.callback.call(that, dataParams)
    })
  }
}
