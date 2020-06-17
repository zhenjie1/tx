import Dexie from 'dexie'
import { isConverKey } from '@/assets/js/wechat/varChat'

const stores = {
  friends: `wechatContactId, wxId, uin, wechatUserId, letter, groupId, ${isConverKey}`,
  groups: `wechatContactId, wxId, uin, wechatUserId, letter, groupId, ${isConverKey}`,
  groupMember: 'id, group_username, username, account_username',
  wechats: 'uin, wxId, wechatUserId, groupId'
}

const IDBWechats = new Dexie('wechats')
IDBWechats.version(1).stores(stores)

// 第 2 个版本
// IDBWechats.version(2).stores({
//   currentWechatFriends: 'username'
// })

IDBWechats.open().then(async IDBWechats => {
  // 打开数据库成功

})

export default IDBWechats
