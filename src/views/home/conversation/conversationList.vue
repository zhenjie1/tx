<template>
  <div class="conversationList">
    <pre v-if="wechat">{{ wechat.uin }}</pre>

    <my-virtual-scroll :data="converData" :show-number="20" :itemHeight="56" class="virtualContent" ref="virtualFriend">
      <template v-slot="{ item }">

        <my-friend-item :friend="item" messageShow badge></my-friend-item>
      </template>
    </my-virtual-scroll>
  </div>
</template>

<script>
import IDBWechats from '@/indexDB/wechat'
import { isConverKey, messageUploadTime } from '@/assets/js/wechat/varChat'

export default {
  props: {
    // 要显示的数据对应的微信号
    wechat: {
      type: Object
    }
  },
  data () {
    return {
      // 会话好友和群聊的数据
      converData: []
    }
  },
  watch: {
    wechat (value, oldData) {
      if (oldData && (oldData.uin === value.uin)) return
      this.initDataFn()
    }
  },
  methods: {
    // 初始化数据
    initDataFn () {
      this.initConveData()
    },
    // 初始化会话数据
    async initConveData () {
      if (!this.wechat) return

      /**
       * 对数据进行排序
       *
       * @param {object} a 好友数据
       * @param {object} b 好友数据
       * @returns {number} 返回数字
       */
      function sortConver (a, b) {
        return b[messageUploadTime] - a[messageUploadTime]
      }

      let friendConvas = IDBWechats.friends.where('uin').equals(this.wechat.uin).filter(v => v[isConverKey]).toArray()
      let groupConvas = IDBWechats.friends.where('uin').equals(this.wechat.uin).filter(v => v[isConverKey]).toArray()

      Promise.all([friendConvas, groupConvas]).then(resule => {
        [friendConvas, groupConvas] = resule

        this.converData = [...friendConvas, ...groupConvas].sort(sortConver)
        // console.log(friendConvas)
      })
    }
  },
  created () {
    this.initDataFn()
  },
  indexDB: {
    'wechats.friends' ({ data }) {
      this.initConveData()
    },
    'wechats.groups' ({ data }) {
      this.initConveData()
    }
  }
}
</script>
