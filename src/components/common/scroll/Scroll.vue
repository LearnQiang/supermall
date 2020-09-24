<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  }
  ,
  data() {
    return {
      scroll: null
    }
  }
  ,
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //2.监听滚动的位置
    this.scroll.on('scroll', position => {
      //拿到position传入父组件,让其能使用这个方法
      this.$emit('scroll', position)
    })
    //3.监听上拉事件
    this.scroll.on('pullingUp', () => {
      //把这个方法传入父组件使用
      this.$emit('pullingUp')
    })
  }
  ,
  methods: {
    scrollTo(x, y, time = 800) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>