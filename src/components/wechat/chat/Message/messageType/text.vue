<template>
  <div class="MessageText">
<!--    <pre>{{ data }}</pre>-->
    <p class="content" v-html="data.content"></p>
  </div>
</template>

<script>
export default {
  props: {
    // 单个历史消息数据
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .MessageText{display: inline-block;padding: 4px 10px;border-radius: 2px;background-color: white;}
</style>
