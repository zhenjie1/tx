import Vue from 'vue'
import VueRouter from 'vue-router'

import { importFile } from '@/libs/util'

// 合并所有路由 - 开始
const allRouterFile = importFile(require.context('./', false, /\.js$/))
if (allRouterFile.index) delete allRouterFile.index

let allRouterPath = []
for (const i in allRouterFile) allRouterPath = allRouterPath.concat(allRouterFile[i].default)
// 合并所有路由 - 结束 - 数据存放在 allRouterPath

Vue.use(VueRouter)

/**
 * 所有的路由都将在这里被导入
 */
export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/home'),
    meta: { title: '聊天', authority: '' }
  },
  ...allRouterPath
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
