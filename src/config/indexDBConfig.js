import Vue from 'vue'
import { importFile } from '@/libs/util'
import initIndexDB from '@/plugins/indexDB/index'

// 要全局监听的 socket 文件夹
const indexDBData = importFile(require.context('../libs/globalIndexDBWatch', false, /\.js$/))

const vueIndexDB = initIndexDB({
  globalIndexDB: indexDBData
})

Vue.use(vueIndexDB)
