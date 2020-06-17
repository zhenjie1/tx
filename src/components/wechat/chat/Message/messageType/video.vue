<template>
  <div class="MessageVideo">
    <video :src="data.content" class="video"></video>
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
  .MessageVideo{
    .video{max-width: 300px;}
  }
</style>
