<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)

export default {
  name: '',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {};
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initScroll()
    // })
    this.initScroll()
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll() {
      if(!this.$refs.wrapper) return
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        scrollY: true,
        scrollX: false,
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: false,
      })
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  }
};
</script>
<style lang='less' scoped></style>
