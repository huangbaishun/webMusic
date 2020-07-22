<template>
  <div ref="wrapperhbs">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'

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
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll() {
      if(!this.$refs.wrapperhbs) return
      this.scroll = new BScroll(this.$refs.wrapperhbs, {
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
        this.scroll.refresh()
      })
    }
  }
};
</script>
<style lang='less' scoped></style>
