<template>
  <div class="pageHeader">
    <div class="left"></div>
    <div class="right">
      <span class="user">{{userInfo.userName}}</span>
      <el-button class="logoutBtn" type="text">退出</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['userInfo'])
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
  .pageHeader{height: 100%;display: flex;justify-content: space-between;align-items: center;
    .right{
      .logoutBtn{margin-left: 10px;color: #f56c6c;}
    }
  }
</style>
