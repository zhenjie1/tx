<template>
    <div class="friendListTemplate">
      <el-tabs stretch v-model="tabsModel" class="topTabs">
          <el-tab-pane label="会话" name="message" class="tabPane">
            <ConversationList :wechat="wechat"></ConversationList>
          </el-tab-pane>
          <el-tab-pane label="通讯录" name="contactPerson" class="tabPane">

            <ul class="friendNav">
              <li v-for="(item, key) in friendNav" :key="key" class="navItem" :class="{checked: key === friendTypeModel}" @click="friendTypeModel = key">{{ item.text }}</li>
            </ul>

            <my-virtual-scroll :data="virtualData" :show-number="20" :itemHeight="56" class="virtualContent" ref="virtualFriend">
              <template v-slot="{ item }">
                <my-friend-item :friend="item" :class="{checked: friend && item.wxId === friend.wxId}"></my-friend-item>
              </template>
            </my-virtual-scroll>
          </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import ConversationList from '../conversation/conversationList'
// eslint-disable-next-line no-unused-vars
import IDBWechats from '@/indexDB/wechat'

export default {
  props: {
    // 要显示的数据对应的微信号
    wechat: {
      type: Object
    },
    // 谁被选中
    friend: {
      type: Object
    }
  },
  data () {
    return {
      tabsModel: 'contactPerson', // 切换导航
      friendTypeModel: 'friend', // 通讯录中的切换导航
      friendNav: {
        friend: { text: '好友' },
        group: { text: '群聊' },
        newFriend: { text: '新朋友' }
      },
      friends: [], // 微信号对应的好友数据
      groups: [] // 微信号对应的群聊数据
    }
  },
  computed: {
    virtualData () {
      return this.friendTypeModel === 'friend' ? this.friends : this.friendTypeModel === 'group' ? this.groups : []
    }
  },
  watch: {
    wechat (value, oldData) {
      if (oldData && (oldData.uin === value.uin)) return
      this.setFriendGroup('all')
    }
  },
  methods: {
    async setFriendGroup (type) {
      if (type !== 'friend' && type !== 'group' && type !== 'all') return

      if (type === 'friend' || type === 'all') {
        this.friends = await IDBWechats.friends.where('letter').belowOrEqual('Z').filter(v => v.uin === this.wechat.uin).toArray()
      }

      if (type === 'group' || type === 'all') {
        this.groups = await IDBWechats.groups.where('letter').belowOrEqual('Z').filter(v => v.uin === this.wechat.uin).toArray()
      }
    }
  },
  created () {

  },
  indexDB: {
    'wechats.friends' ({ data }) {
      if (!this.wechat) return
      this.setFriendGroup('friend')
    },
    'wechats.groups' ({ data }) {
      if (!this.wechat) return
      this.setFriendGroup('group')
    }
  },
  components: {
    ConversationList
  }
}
</script>

<style scoped>
.friendListTemplate >>> .el-tabs__item{padding: 0 0px;}
.friendListTemplate >>> .el-tabs__content{height: calc(100% - 40px);}
</style>

<style lang="scss" scoped>
.friendNav{display: flex;justify-content: space-around;
  .navItem{line-height: 40px;cursor: pointer;color: #999;padding: 0 10px;white-space: nowrap;}
  .navItem.checked{color: $mainColor;}
}
.friendListTemplate{height: 100%;
  .topTabs{height: 100%;
  .tabPane {height: 100%;}
  }
  .virtualContent{height: calc(100% - 40px) !important;}
}
</style>
