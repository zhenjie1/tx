
/**
 * 获取聊天组件信息
 *
 * @param {IHistory<any>} messageItem 123
 * @returns {'ITemplateInfo' | undefined} 返回数据
 */
export function templateInfo (messageItem) {
  const data = new Map([
    ['1', { name: 'MessageText', text: messageItem.content }],
    ['3', { name: 'MessageImageBuf', text: '[图片]' }],
    [5, { name: 'MessageShare', text: '[分享]' }],
    [34, { name: 'MessageAudio', text: '[语音]' }],
    [42, { name: 'MessageBusinessCard', text: '[名片]' }],
    ['43', { name: 'MessageVideo', text: '[名片]' }],
    [47, { name: 'MessageImage', text: '[图片]' }],
    [48, { name: 'MessageMap', text: '[地图]' }],
    ['10000', { name: 'MessageSystem', text: '[系统消息]', avatar: false }],
    ['10002', { name: 'MessageSystem', text: '[系统消息]', avatar: false }]
  ])
  const templatename = data.get(messageItem.msgType)

  // 简单类型，找到直接返回即可
  if (templatename) return templatename

  // 既不是简单类型，又不是复杂类型？，直接返回 undefined
  if (messageItem.msgType !== 49) {
    console.error('返回的类型从未处理过', messageItem)
    return undefined
  }

  // 复杂类型
  //   let messageData: IHistory<>
  const multipleType = new Map([
    ['3', { name: 'MessageShare', text: '[分享]' }],
    ['4', { name: 'MessageShare', text: '[分享]' }],
    ['5', { name: 'MessageShare', text: '[分享]' }],
    ['6', { name: 'MessageFile', text: '[文件]' }],
    ['8', { name: 'MessageImage', text: '[图片]' }],
    ['19', { name: 'MessageGroup', text: '[聊天记录]' }],
    ['24', { name: 'MessageFavorite', text: '[收藏]' }],
    ['33', { name: 'MessageMinProgram', text: '[小程序]' }],
    ['36', { name: 'MessageMinProgram', text: '[小程序]' }],
    ['2000', { name: 'MessageTransfer', text: '[转账]' }],
    ['2001', { name: 'MessageRedEnvelope', text: '[红包]' }]
  ])

  if (!messageItem.content_json.type) return undefined

  return multipleType.get(messageItem.content_json.type.toString())
}

/**
 * 将时间戳转为文字
 *
 * @param {number} time 时间戳
 * @returns {string} 返回显示的字符
 */
export function weekTime (time) {
  if (!time) return ''
  if (time.toString().length === 10) time = time * 1000
  const currentTime = new Date()
  const enterTime = new Date(time)

  // 60 秒内
  if (time + 60 * 1000 >= currentTime.getTime()) {
    return '刚刚'
  }

  // 大于60秒，当天时间
  if (currentTime.toLocaleDateString() === new Date(time).toLocaleDateString()) {
    return `${enterTime.getHours()}:${enterTime.getMinutes()}`
  }

  const oneTime = 60 * 60 * 24 * 1000 // 一天的毫秒数

  // 小于等于六天
  if (currentTime.getTime() - oneTime * 6 < enterTime.getTime()) {
    return numberToWeek(enterTime)
  }

  // 大于六天
  const date = `${enterTime.getFullYear()}-${enterTime.getMonth() + 1}-${enterTime.getDate()}`
  return date
}

/**
 * 返回目标时间与当前时间的描述
 *
 * @param {Date} time 时间类型
 * @returns {string} 返回字符串
 */
function numberToWeek (time) {
  const currentTime = new Date()
  const oneTime = 60 * 60 * 24 * 1000 // 一天的毫秒数

  if (time.getTime() + oneTime * 1 >= currentTime.getTime()) return '昨天'
  if (time.getTime() + oneTime * 2 >= currentTime.getTime()) return '前天'

  const number = time.getDay()
  switch (number) {
    case 1: return '周一'
    case 2: return '周二'
    case 3: return '周三'
    case 4: return '周四'
    case 5: return '周五'
    case 6: return '周六'
    case 7: return '周日'
  }
  return '参数有误'
}
