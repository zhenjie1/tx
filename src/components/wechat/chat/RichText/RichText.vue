<template>
    <div class="richTextTemplate">
        <ToolMenu />
        <textarea
            class="textarea"
            v-model="textarea">
        </textarea>
        <el-button type="primary" class="sendBtn" :disabled="isDisabledSend">发 送</el-button>
    </div>
</template>

<script>
import ToolMenu from './ToolMenu'
export default {
  props: {
    // 必传参数,单个好友数据
    friend: {
      type: Object
    }
  },
  data () {
    return {
      textarea: ''
    }
  },
  computed: {
    // 是否禁用发送按钮
    isDisabledSend () {
      return this.textarea.length === 0 || !this.friend
    }
  },
  components: {
    ToolMenu
  }
}
</script>

<style lang="scss" scoped>
.richTextTemplate{position: relative;
    .textarea{height: calc(100% - 40px);width: 100%;background-color: $bgColor;box-sizing: border-box;border: none;padding: 10px;resize: none;}

    .sendBtn{position: absolute;right:20px;bottom: 20px;}
}
</style>
