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
    listenScroll: {
      type: Boolean,
      default: false,
    }
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
      if(!this.$refs.wrapperhbs) return
      this.scroll = new BScroll(this.$refs.wrapperhbs, {
        probeType: this.probeType,
        // stopPropagation: false,
        // tap: true,
        click: true,
      })

      if (this.listenScroll) {
        let vm = this
        this.scroll.on('scroll', (pos) => {
          vm.$emit('scroll', pos)
        })
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // scrollTo会传入参数，此处用apply来用传入的参数调用 this.scroll.scrollTo
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
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
