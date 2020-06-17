export const isDev = process.env.NODE_ENV === 'development'

/**
 * 获取地址栏的参数
 *
 * @param {string} name 参数名
 * @returns {string|null} 返回 null 或 获取的参数
 */
export function getQueryString (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]); return null
}

/**
 * 获取储存的内容
 *
 * @param {string} key key
 * @param {'local' | 'sess'} type 获取位置
 * @returns {object | undefined} 返回值
 */
export function getCache (key, type = 'local') {
  type = type === 'local' ? 'localStorage' : 'sessionStorage'
  let data = window[type].getItem(key)
  try {
    data = JSON.parse(data)
  } catch (err) {}
  return data === null ? undefined : data
}

/**
 * 获取类型
 *
 * @param {any} value 要检查类型的值
 * @returns {any} 返回数据类型
 */
export function getType (value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 将数据用 JSON.string 深拷贝
 *
 * @param {any} data 要拷贝的数据
 * @returns {object} 返回深拷贝后的数据
 */
export function JSONToStr (data) {
  if (!data) return ''

  return JSON.parse(JSON.stringify(data))
}

/**
 * 设置储存的内容
 *
 * @param {string} key key
 * @param {any} value 要储存的值
 * @param {'local' | 'sess'} type 获取位置
 * @returns {void} 无返回
 */
export function setCache (key, value, type = 'local') {
  type = type === 'local' ? 'localStorage' : 'sessionStorage'
  if (typeof value === 'object') value = JSON.stringify(value)
  window[type].setItem(key, value)
}

// eslint-disable-next-line valid-jsdoc
/**
 * 打印日志
 *
 * @param {keyof console} type console 上的方法名
 * @param  {Array} args 要打印的值
 * @returns {boolean} fanhu
 */
export function logs (type, ...args) {
  if (!isDev) return false
  // eslint-disable-next-line no-console
  console[type].apply(null, args)
  return true
}

/**
 * 时间戳转日期格式
 *
 * @param {number} t 时间戳
 * @returns {string} 返回日期格式
 */
export function dateFormatter (t) {
  if (!t) return ''
  t = new Date(t).getTime()
  t = new Date(t)
  var year = t.getFullYear()
  var month = (t.getMonth() + 1)
  month = checkAddZone(month)

  var date = t.getDate()
  date = checkAddZone(date)

  var hour = t.getHours()
  hour = checkAddZone(hour)

  var min = t.getMinutes()
  min = checkAddZone(min)

  var se = t.getSeconds()
  se = checkAddZone(se)

  return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + se
}

/**
 * 小于10的数据补0
 *
 * @param {number} num 数字
 * @returns {string} 返回补0后的字符串
 */
function checkAddZone (num) {
  return num < 10 ? '0' + num.toString() : num
}
