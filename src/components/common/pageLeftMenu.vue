<template>
    <div class="pageLeftMenu" :class="{isCollapse: isCollapse}">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <div class="menu" v-for="(item, index) in leftMenuData" :key="index">
          <el-submenu :index='index + ""' v-if="item.children">
            <template slot='title'>
              <i class="el-icon-location"></i>
              <span slot="title" v-if="item.meta">
                {{ item.meta.title }}
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(child, ind) in item.children" :key="ind" :index="child.path">
                <span slot="title" v-if="child.meta">{{ child.meta.title }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item :index="item.path" v-else :route="item">
            <i class="el-icon-menu"></i>
            <span slot="title" v-if="item.meta">{{ item.meta.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
</template>

<script>
import { routes } from '@/router'

export default {
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    // 返回左边的菜单
    leftMenuData () {
      return routes
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.info(1, key, keyPath)
    },
    handleClose (key, keyPath) {
      console.info(2, key, keyPath)
    }
  }
}
</script>

<style lang="scss">
// .pageLeftMenu.isCollapse .el-submenu__title > span{display: none;}
</style>
<style lang="scss" scoped>
.pageLeftMenu{height: 100%;
  .el-menu-vertical-demo{height: 100%;}
}
</style>
