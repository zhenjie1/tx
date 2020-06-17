<template>
    <ul class="wehatList">
        <li
          v-for="item in wechats"
          :key="item.uin" class="wechatItem"
          @click="handlerWechatEv(item)"
          :class="{checked: wechat && wechat.uin === item.uin}"
          >
          <!-- 在线时显示这个 -->
          <el-badge :value="10" v-if="item[wechatOnloneKey]"><img :src="item | wechatAvatar" class="avatar" alt=""></el-badge>
          <!-- 离线时显示这个 -->
          <el-badge value="离线" type="warning" v-else><img :src="item | wechatAvatar" class="avatar" alt=""></el-badge>
          <span class="name">{{ item.nickName}}</span>
        </li>
    </ul>
</template>

<script>
import { indexDBObj } from '../../plugins/indexDB'
import { wechatOnloneKey } from '@/assets/js/wechat/varWechat'

export default {
  props: {
    wechat: [Object, undefined]
  },
  data () {
    return {
      wechatOnloneKey,
      wechats: [] // 微信号列表
    }
  },
  methods: {
    // 点击微信号列表执行
    handlerWechatEv (wechat) {
      const friends = indexDBObj.state.get('wechats.friends') || []
      const groups = indexDBObj.state.get('wechats.groups') || []

      const friendGroup = [...friends, ...groups]
      const hasExist = friendGroup.find(f => f.wechatUserId === wechat.wechatUserId)

      // 如果本地没有此微信的好友和群聊
      if (!hasExist) {
        const initFriendFetch = this.$store.dispatch('friend/initFriend', wechat)
        const initGroupFetch = this.$store.dispatch('group/initGroup', wechat)

        // 好友和群聊数据都获取后
        Promise.all([initFriendFetch, initGroupFetch]).then(() => {
          this.$store.dispatch('friendGroup/initConversation', wechat)
        })
      }

      this.$store.commit('wechat/checkedWechat', wechat)
    }
  },
  indexDB: {
    'wechats.wechats' ({ data }) {
      this.wechats = data
    }
  }
}
</script>

<style lang="scss" scoped>
.wehatList{overflow-y: auto;
    .wechatItem{display: flex;cursor: pointer;padding: 10px;
        .name{line-height: 36px;margin-left: 10px;width: calc(100% - 46px);text-overflow: ellipsis;white-space: nowrap;overflow: hidden;}

        &:hover{background-color: rgba(0,0,0,.02);}
        &.checked{background-color: rgba(0,0,0,.04);}
    }
}
</style>
