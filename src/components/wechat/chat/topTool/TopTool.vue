<template>
  <section class="topToolTemplate">
    <div class="left">
      <span class="friendName">{{ friend | wechatName }}</span>
    </div>
  </section>
</template>

<script>
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
  }

}
</script>

<style lang="scss" scoped>
  .topToolTemplate{height: 40px;line-height: 40px;padding: 0 10px;border-bottom: 1px solid $borderColor;}
</style>
