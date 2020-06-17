<template>
    <div class="chatTemplate">
      <TopTool :wechat="wechat" :friend='friend'/>
      <Message :wechat="wechat" :friend='friend' class="message"/>
      <RichText :friend='friend' class="richText"/>
    </div>
</template>

<script>
import TopTool from './topTool/TopTool'
import Message from './Message/Message'
import RichText from './RichText/RichText'
import { isSomeFriend } from '@/assets/js/wechat'

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
    initDataFn () {

    }
  },
  components: {
    TopTool,
    Message,
    RichText
  }
}
</script>

<style lang="scss" scoped>
.chatTemplate{height: 100%;overflow: hidden;
    .message{height: 75%;}
    .richText{height: 25%;}
}
</style>
