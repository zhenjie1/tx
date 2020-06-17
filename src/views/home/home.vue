<template>
  <div class="home">
    <el-row class="pageRow">
      <el-col :span="4" class="pageCol wechatList">
        <div class="topOperting">
          <p class="wechatStatistics">微信号({{ 0 + '/' + wechats.length }})</p>
          <el-input size='small' v-model="wechatSearch" class="wechatSearchInput" />
        </div>
        <WechatList class="wechatListContainer" :wechat='checkedWechat'/>
      </el-col>
      <el-col :span="4" class="pageCol friendList">
        <FriendList :wechat="checkedWechat" :friend='checkedFriend'/>
      </el-col>
      <el-col :span="12" class="pageCol chatContainer">
         <Chat :friend='checkedFriend' :wechat="checkedWechat"/>
      </el-col>
      <el-col :span="4" class="pageCol optaing">

      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chat from '@/components/wechat/chat/Chat'
import WechatList from '@/components/wechat/wechatList'
import FriendList from './friendList/friendList.vue'
import { mapActions, mapState } from 'vuex'
import { initSocket } from '../../config/socketConfig'
import { IDBOperate } from '@/plugins/indexDB/indexDBOperate'
import IDBWechats from '@/indexDB/wechat'
import { wechatOnloneKey } from '@/assets/js/wechat/varWechat'

export default {
  name: 'Home',
  data () {
    return {
      wechats: [], // 微信号列表数据
      wechatSearch: '' // 搜索微信号 input 的值
    }
  },
  computed: {
    ...mapState('wechat', ['checkedWechat']),
    ...mapState('friendGroup', ['checkedFriend'])
    // 获取在线的微信号
    // onlineWechat () {

    // }
  },
  methods: {
    ...mapActions('wechat', ['initWechats']),
    // 获取页面所需数据
    async initDataFn () {
      this.initWechats()
    }
  },
  created () {
    this.initDataFn()
    initSocket.createSocket()

    this.$sockets.send('onlineStatus', {})
  },
  sockets: {
    // 获取在线微信号列表
    async onlineStatus ({ data: { content: onlineWechatList } }) {
      const wechats = await IDBWechats.wechats.toArray()

      // 先将所有微信号都标记为离线
      wechats.map(w => w[wechatOnloneKey] = false)

      // 将在线的设置为在线
      onlineWechatList.map(wxId => {
        const index = wechats.findIndex(w => w.wxId === wxId)
        if (index === -1) return
        wechats[index][wechatOnloneKey] = true
      })

      IDBOperate.bulkPut(IDBWechats, 'wechats', wechats)
    }
  },
  indexDB: {
    'wechats.wechats' ({ data }) {
      this.wechats = data
    }
  },
  components: {
    WechatList,
    FriendList,
    Chat
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/wechat.scss';
</style>

<style lang="scss" scoped>
.home{height: 100%;
  .pageRow{height: 100%;
    .pageCol{height: 100%;}
    .pageCol + .pageCol{box-sizing: border-box;border-left: 1px solid #e6e6ee;}
  }
  .wechatList{
    .wechatStatistics{font-size: 16px;padding: 10px;}
    .wechatSearchInput{margin: 0 10px;width: calc(100% - 20px);padding: 10px 0;}
    .wechatListContainer{height: calc(100% - 96px);}
  }
  .chatContainer{background-color: rgba(0,0,0,.04);}
}
</style>
