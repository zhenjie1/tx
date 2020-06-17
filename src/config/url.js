import { getQueryString } from '@/libs/tools'

const protocol = location.protocol + '//'
const firstUrl = protocol // 地址前面拼接的值
const lastUrl = '/product' // 地址后面拼接的值

const urlConfig = {
  lineOn: {
    ajax: firstUrl + location.host + lastUrl,
    ws: location.host
  },
  test: {
    ajax: protocol + 'pcfy2fzn.qulvkeji.com' + lastUrl,
    ws: 'pcfy2fzn.qulvkeji.com'
  },
  fzj: {
    ajax: firstUrl + 'qulvxxx.com' + lastUrl,
    ws: 'qulvxxx.com'
  },
  gt: {
    ajax: firstUrl + '192.168.31.19:9811' + lastUrl,
    ws: 'qulvtest2.com'
  }
}

/**
 * 获取真实的请求地址
 *
 * @returns {{ws: string, ajax: string}} 返回地址
 *
 */
export function getAjaxUrl () {
  const url = getQueryString('url')
  if (!url || !urlConfig[url]) return urlConfig.lineOn
  return urlConfig[url]
}
