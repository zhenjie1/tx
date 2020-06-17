<template>
  <div class="MessageSystem">
    <p class="content">{{ data.content }}</p>
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
  .MessageSystem{font-size: 12px;width: 100%;max-width: 100% !important;text-align: center;}
</style>
