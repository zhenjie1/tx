<template>
    <div class="VirtualScroll" ref="virtualScrollContent" :style="{height: height}">
        <ul :style="{ height: parentHeight }" class="virtualContent">
            <li v-for="(item, index) in listData" :key="item.id || index" class="virtualItem"
                :style="{top: positionIndex[index] * itemHeight + 'px'}"
            >
                <slot :item='item'></slot>
            </li>
        </ul>
    </div>
</template>

<script>
import throttle from 'lodash/throttle'
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: '100%'
    },
    itemHeight: {
      type: Number,
      required: true
    },
    showNumber: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      allData: [],
      listData: [],
      parentHeight: '0',
      positionIndex: [],
      io: undefined
    }
  },
  watch: {
    data: {
      immediate: true,
      handler () {
        this.allData = this.data
        this.parentHeight = this.itemHeight * (this.allData.length) + 'px'
        this.scrollEv()
      }
    }
  },
  activated () {
    this.scrollEv()
  },
  created () {
    // this.io = new IntersectionObserver((enters) => {
    //   enters.map(item => {
    //     if (!item.isIntersecting) {
    //       let y = (this.$refs.virtualScrollContent || {}).scrollTop || 0
    //       setCache('virtualScrollTop', y, 'sess')
    //       console.log('hide', y)
    //     } else {
    //       if (!this.$refs.virtualScrollContent) return
    //       let top = parseInt(getCache('virtualScrollTop') || 0)
    //       console.log('show', top)
    //       this.$refs.virtualScrollContent.scrollTop = top
    //     }
    //   })
    // })
  },
  mounted () {
    // this.$refs.virtualScrollContent.addEventListener('scroll', this.scrollEv)
    this.$refs.virtualScrollContent.addEventListener('scroll', throttle(() => this.scrollEv(), 50))
    // this.io && this.io.observe(this.$refs.virtualScrollContent)
  },
  beforeDestroy () {
    // this.io && this.io.unobserve(this.$refs.virtualScrollContent)
  },
  methods: {
    scrollEv (e) {
      // console.log(this.listData)
      const y = (this.$refs.virtualScrollContent || {}).scrollTop || 0
      const startIndex = Math.floor(y / this.itemHeight)
      const endIndex = startIndex + this.showNumber

      let data = []

      if (this.allData.length === 0) {
        this.listData = []
        return
      }

      for (let i = 0; i < this.showNumber; i++) this.positionIndex[i] = i + startIndex

      for (let i = startIndex; i < endIndex; i++) {
        if (!this.allData[i]) continue
        // this.allData[i]['positionIndex'] = i
        data.push(this.allData[i])
      }

      requestAnimationFrame(() => {
        this.$emit('scroll', {
          scrollTop: y,
          event: e,
          startIndex,
          endIndex
        })
      })
      this.listData = data
      data = null
    }
  }
}
</script>

<style lang="scss" scoped>
.VirtualScroll{overflow-y: auto;
    .virtualContent{position: relative;
        .virtualItem{position: absolute;left:0;top:0;width: 100%;}
    }
}
</style>
