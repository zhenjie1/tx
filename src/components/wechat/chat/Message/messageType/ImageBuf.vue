<template>
  <div class="MessageImageBuf">
    <img :src="url" class="image" />
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
  },
  computed: {
    url () {
      return this.data.content
    }
  }
}
</script>

<style lang="scss" scoped>
  .MessageImageBuf{
    .image{max-width: 180px;}
  }
</style>
