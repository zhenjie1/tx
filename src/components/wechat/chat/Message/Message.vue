<template>
    <div class="messageTemplate">
      <code v-if="friend">{{friend.wxId}}</code>
      <History :wechat="wechat" :friend="friend" :data="item" v-for="item in chatRecording" :key="item.id"></History>
    </div>
</template>

<script>
import { isSomeFriend } from '@/assets/js/wechat'

import History from './history'

export default {
  props: {
    // 此好友对应的微信号
    wechat: {
      type: Object
    },
    // 必传参数,单个好友数据
    friend: {
      type: Object
    }
  },
  data () {
    return {
      // 历史消息
      chatRecording: []
    }
  },
  watch: {
    // 好友发生变化
    friend: {
      immediate: true,
      handler (value, oldValue) {
        if (oldValue && (isSomeFriend(oldValue, value))) return

        this.initDataFn()
      }
    }
  },
  methods: {
    // 初始化页面数据
    initDataFn () {
      this.chatRecording = []
      if (!this.friend) return

      this.$sockets.send('getMessage', {
        uin: this.friend.uin,
        content: {
          uin: this.friend.uin,
          wxId: this.friend.wxId
        }
      })
    }
  },
  sockets: {
    // socket 第一次获取聊天记录
    getMessage ({ data: { content } }) {
      console.info(content)
      this.chatRecording = content
    }
  },
  components: {
    History
  }
}
</script>

<style lang="scss" scoped>
.messageTemplate{overflow-y: auto;}
</style>
