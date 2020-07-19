<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
// import BScroll from '@better-scroll/core'
// import Slide from '@better-scroll/slide'
// BScroll.use(Slide)
import BScroll from 'better-scroll'

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
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    initScroll() {
      if(this.$refs.wrapper) return
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
      })
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.refresh()
      })
    }
  }
};
</script>
<style lang='less' scoped></style>
