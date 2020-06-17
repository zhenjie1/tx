<template>
  <div id="app">
    <el-container class='pageContainer'>
        <!-- 页面左侧 -->
      <el-aside width="200px">
        <!-- 页面左侧的菜单 -->
        <PageLeftMenu></PageLeftMenu>
      </el-aside>
      <el-container>
        <el-header class="myPageHeader"><PageHeader/></el-header>
        <el-main class="mainTemplate">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PageLeftMenu from '@/components/common/pageLeftMenu'
import PageHeader from '@/components/common/pageHeader'

export default {
  components: {
    PageLeftMenu,
    PageHeader
  }
}
</script>

<style lang="scss" scope>
.pageContainer{height: 100%;
  .myPageHeader{border-bottom: 1px solid #e6e6e6;}
  .mainTemplate{padding: 0;}
}
</style>
