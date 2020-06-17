import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import wechatModule from './home/wechat/wechatStore'
import friendModule from './home/friend/friendStore'
import groupModule from './home/group/groupStore'
import friendGroupModule from './home/friendGroup/friendGroupStore'

import userModule from './user/userStore'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    wechat: wechatModule,
    friend: friendModule,
    group: groupModule,
    friendGroup: friendGroupModule,
    user: userModule
  },
  plugins: [
    createPersistedState()
  ]
})

export default Store
