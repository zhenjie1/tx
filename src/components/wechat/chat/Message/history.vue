<template>
    <div class="historyTemplate" :class="{left: !isMySend, right: isMySend, systemMessage: isSystemMessage}">
      <img class="avatar" v-if="!isSystemMessage" :src="getFriend | wechatAvatar"/>
      <div class="messageInfo">
        <p class="nickname" v-if="!isSystemMessage">{{ getFriend | wechatName }}</p>
        <div class="messageContent">
          <component :is="templateInfo.name" :data="data" class="messageTotal"></component>
          <i class="el-icon-loading statusIcon" v-if="!isSystemMessage"></i>
        </div>
      </div>
    </div>
</template>

<script>
import MessageText from './messageType/text'
import MessageImageBuf from './messageType/ImageBuf'
import MessageImage from './messageType/Image'
import MessageVideo from './messageType/video'
import MessageSystem from './messageType/System'
import { templateInfo } from '@/assets/js/wechat/chat'

export default {
  props: {
    // 此好友对应的微信号
    wechat: {
      type: Object,
      required: true
    },
    // 单个消息数据
    data: {
      type: Object,
      required: true
    },
    // 好友数据，用力区分数据是不是自己发的
    friend: {
      type: Object,
      required: true
    }
  },
  computed: {
    // 是不是系统消息（通过 avatar === false 判断的）
    isSystemMessage () {
      return this.templateInfo.avatar === false
    },
    // 是不是自己发的（消息显示的位置）
    isMySend () {
      if (!this.friend) return false

      return this.friend.wxId === this.data.fromUserName
    },
    // 获取显示的好友信息
    getFriend () {
      if (this.isMySend) {
        return this.wechat
      } else {
        return this.friend
      }
    },
    // 获取数据的类型
    templateInfo () {
      if (!this.data) return {}
      const info = templateInfo(this.data)
      if (!info) return {}
      return info
    }

  },
  components: {
    MessageText,
    MessageImageBuf,
    MessageImage,
    MessageVideo,
    MessageSystem
  }
}
</script>

<style lang="scss" scoped>
  .historyTemplate.right .messageContent .MessageText{background-color: #95eb6a;color: #1a1a1a;}

  .historyTemplate{overflow: hidden;font-size: 14px;
    .avatar{margin: 0 10px;}
    .messageInfo{width: calc(100% - 56px * 2);
      .messageContent{overflow: hidden;
        .statusIcon{width: 14px;height: 20px;line-height: 20px;font-size: 14px;margin: 0 10px;}
        .messageTotal{max-width: calc(100% - 60px);}
      }
    }
    &.left .nickname{text-align: left;}
    &.right .nickname{text-align: right;}
    &.left > *, &.left .messageContent > *{float: left;}
    &.right > *, &.right .messageContent > *{float: right}

    &.systemMessage .messageInfo{width: 85%;margin:0 auto;float: none;}
  }
</style>
