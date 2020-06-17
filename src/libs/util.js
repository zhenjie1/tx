
/**
 * 导入某个目录下的文件
 *
 * @param {any} currentCpmponents 通过 require.context 返回的对象
 * @param {string} keyType 返回对象的key类型 ['filename' = '文件名字', 'path': '路径']
 * @returns {object} 返回 .js 模块返回的对象
 */
export function importFile (currentCpmponents, keyType = 'path') {
  const modules = currentCpmponents.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const fileName = moduleName.replace(/(.*\/)*([^.]+).*/ig, '$2')

    const value = currentCpmponents(modulePath)

    const data = {}
    if (value.default) Object.assign(data, value.default)
    for (const i in value) {
      data[i] = value[i]
    }

    if (keyType === 'filename') modules[fileName] = data
    else if (keyType === 'path') modules[moduleName] = data

    return modules
  }, {})
  return modules
}

// 查看当前环境是不是开发环境
export const isDev = process.env.NODE_ENV === 'development'
