import Vue from 'vue'
import { indexDBObj } from '@/plugins/indexDB/index'

/**
 * au: account_username,
 * u: username
 */
export default class IndexDBOperate {
  // 添加一条数据
  add (databaseObject, tableName, data, isUpdate) {
    const table = databaseObject[tableName]
    if (!table) return Promise.reject(`添加失败，没有找到对应的表: ${databaseObject.name} - ${tableName}`)

    return table.put(data).then((res) => {
      if (isUpdate) updateIDB(databaseObject, tableName)
    })
  }

  /**
   * 添加多条数据
   *
   * @param {Dexie} databaseObject 要操作的数据库
   * @param {string} tableName 数据库对应的表名
   * @param {Array} datas 添加的数据
   * @param {boolean} isClear 是否清空原来的数据
   * @param {isUpdate} isUpdate 是否更新页面上的数据
   * @param {{fun: string}} param5 配置
   * @returns {Promise} 返回
   */
  bulkAdd (databaseObject, tableName, datas, isClear, isUpdate, { fun = 'put' } = {}) {
    if (!Array.isArray(datas)) return Promise.reject('datas 只能是数组类型')
    if (isClear === true) {
      // eslint-disable-next-line no-console
      console.log(`清空 indexDB 表 ${tableName}`)
      databaseObject[tableName].clear()
    }

    const table = databaseObject[tableName]
    if (!table) return Promise.reject(`添加失败，没有找到对应的表: ${databaseObject.name} - ${tableName}`)

    const funName = fun === 'put' ? 'bulkPut' : 'bulkAdd'
    return table[funName](datas).then(() => {
      if (isUpdate) updateIDB(databaseObject, tableName)
    })
  }

  // 更新数据
  put (databaseObject, tableName, data, isUpdate = true) {
    return this.add(databaseObject, tableName, data, isUpdate)
  }

  // 更新多条数据
  bulkPut (databaseObject, tableName, data, isUpdate = true, isClear = false, options) {
    return this.bulkAdd(databaseObject, tableName, data, isClear, isUpdate, options)
  }

  // 删除 - 根据主键删
  delete (databaseObject, tableName, key, isUpdate = true) {
    const table = databaseObject[tableName]
    if (!table) return Promise.reject(`删除失败，没有找到对应的表: ${databaseObject.name} - ${tableName}`)

    return table.delete(key)
      .then(() => isUpdate && updateIDB(databaseObject, tableName))
  }

  // 删除多条 - 根据主键删
  bulkDelete (databaseObject, tableName, keys) {
    const allResult = keys.map((key) => this.delete(databaseObject, tableName, key, false))
    return Promise.all(allResult)
      .then(() => updateIDB(databaseObject, tableName))
  }

  // 删除多条 - 根据索引删
  // bulkIndexDelete(databaseObject: any, indexName: )
}

/**
 * 修改indexDB数据后，开始发布
 *
 * @param {any} databaseObject 数据库对象
 * @param {T<string>} tableName 数据库名字
 * @returns {Promise<any>} 返回 Promise 对象
 */
export function updateIDB (databaseObject, tableName) {
//   eslint-disable-next-line no-console
  console.log(`%c indexDB: ${tableName}`, 'font-size:12px;color:blue;')

  // 如果没有查到对应的表名
  if (!databaseObject || !tableName) return Promise.reject('缺少参数')
  const table = databaseObject[tableName]
  if (!table) return Promise.reject(`没有找到对应的表: ${databaseObject.name} - ${tableName}`)

  return table.toArray().then(data => {
    const path = `${databaseObject.name}.${tableName}`

    indexDBObj.state.set(path, data)
    Vue.prototype.$indexDB.emitter.emit(path, { data })
    // eventEmitter.emit(path, { data, table, database: databaseObject })
  })
}

export const IDBOperate = new IndexDBOperate()
