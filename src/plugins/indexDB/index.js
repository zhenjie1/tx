// 全局混入的 indexDB
import IndexDBMixin from './mixin'
// indexDB 监听的收集与存储
import EventEmitter from '../emitter'
// 数据库初始化的文件
// 如果想要创建数据库，请按照此文件拷贝一份并引入
import '@/indexDB/wechat'

import Vue from 'vue'

class IndexDB {
  /**
   * 构造函数
   *
   * @param {object} root0 参数配置
   * @param {object} root0.globalIndexDB js 文件中的 indexDB 监听
   */
  constructor ({ globalIndexDB = {} }) {
    // 保存 indexDB 监听对象
    this.emitter = new EventEmitter()

    // 数据库中的数据更新后，将自动将最新的数据保存在这里
    // 在组件初始化时，先在这里找，如果没有找到，才会查库
    this.state = new Map()

    // 写在 .js 文件中的 indexDB
    this.globalIndexDB = globalIndexDB
  }

  /**
   * 在 vue.use 时执行
   *
   * @param {Vue} Vue 第一个参数为 Vue 类
   * @returns {void} 无返回值
   */
  install (Vue) {
    Vue.prototype.$indexDB = this
    Vue.mixin(IndexDBMixin(this))

    this.installGlobalSocket()
    window.indexDB = this
  }

  /**
   * 安装全局的 indexDB
   *
   * @returns {void}
   */
  installGlobalSocket () {
    if (!this.globalIndexDB) return

    // 循环目录的单个文件
    for (const filename in this.globalIndexDB) {
      if (filename === 'index') continue

      // 循环单个文件中返回的 indexDB 监听函数
      for (const event in this.globalIndexDB[filename]) {
        this.emitter.addListener(
          event, // 监听的 indexDB 名字
          this.globalIndexDB[filename][event], // 监听的 indexDB 对应的函数
          undefined // 执行时的 this 指向
        )
      }
    }
  }
}

let indexDBObj

/**
 * IndexDB 初始化
 *
 * @param {{globalIndexDB: object}} options 配置
 * @returns {IndexDB} 返回 IndexDB 实例
 */
export default function initIndexDB (options) {
  if (indexDBObj) return indexDBObj

  indexDBObj = new IndexDB(options)

  return indexDBObj
}

export {
  indexDBObj
}
