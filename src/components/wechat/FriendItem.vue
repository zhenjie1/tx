<template>
    <!-- 显示单个好友 -->
    <div class="friendItemTemplate" @click="handlerFriendEv">
      <el-badge v-if="badge" :value="friend[messageCountKey] || 4"><img :src="friend | wechatAvatar" class="avatar"/></el-badge>
      <img v-else :src="friend | wechatAvatar" class="avatar"/>

      <div class="content">
        <p class="name">{{ friend | wechatName }}</p>

        <div class="message" v-if="messageShow">
          <div class="msgContent"><slot name="message">{{ friend[messageContent] }}</slot></div>
          <span class="msgTime">{{ friend[messageUploadTime] | conversationTime }}</span>
        </div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { messageUploadTime, messageContent, messageCountKey } from '@/assets/js/wechat/varChat'
import { weekTime } from '@/assets/js/wechat/chat'

export default {
  props: {
    // 单个好友数据
    friend: {
      type: Object,
      required: true
    },
    // 是否显示最新的消息
    messageShow: {
      type: Boolean,
      default: false
    },
    // 是否显示未读消息数
    badge: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      messageUploadTime,
      messageContent,
      messageCountKey
    }
  },
  methods: {
    ...mapMutations('friendGroup', ['checkedFriend']),
    /**
     * 点击好友列表执行
     *
     * @returns {void}
     */
    handlerFriendEv () {
      this.checkedFriend(this.friend)
    }
  },
  created () {
  },
  filters: {
    conversationTime (time) {
      return weekTime(time)
    }
  }
}
</script>

<style lang="scss" scoped>
  .friendItemTemplate{display: flex;padding: 10px;align-items: center;
    .content{width: calc(100% - 46px);margin-left: 10px;
      .name{@include omit;font-size: 14px;line-height: 1;}
      .message{display: flex;font-size: 12px;justify-content: space-between;line-height: 1;margin-top:10px;
        .msgContent{flex:1;@include omit;height: 12px;}
        .msgTime{height: 12px;white-space: nowrap;}
      }
    }
    &:hover{background-color: rgba(0,0,0,.04);cursor: default;}
    &.checked{background-color: rgba(0,0,0,.06);}
  }
</style>
