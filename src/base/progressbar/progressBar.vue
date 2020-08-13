<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressBtnTouchStart" @touchmove.prevent="progressBtnTouchmove" @touchend.prevent="progressBtnTouchend">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from '@/utils/dom'
const transform = prefixStyle('transform')
const btnWidth = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.isMove) {
        const width = this.$refs.progressBar.clientWidth - btnWidth
        let offsetWidth = newPercent * width
        this._setOffset(offsetWidth)
      }
    }
  },
  methods: {
    progressBtnTouchStart(e) {
      this.touch.isMove = true
      this.touch.startX = e.touches[0].pageX
      this.touch.offsetWidth = this.$refs.progressBar.clientWidth - btnWidth
      this.touch.leftX = this.$refs.progress.clientWidth
    },
    progressBtnTouchmove(e) {
      if (!this.touch.isMove) return
      let moveX = Math.min(this.touch.offsetWidth, Math.max(0, e.touches[0].pageX - this.touch.startX + this.touch.leftX))
      this._setOffset(moveX)
    },
    progressBtnTouchend() {
      this.touch.isMove = false
      this._percentChange()
    },
    _setOffset(offsetWidth) {
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    },
    _percentChange() {
      const progressBarWidth = this.$refs.progressBar.clientWidth - btnWidth
      let percent = this.$refs.progress.clientWidth / progressBarWidth
      this.$emit('percentChange', percent)
    },
    progressClick(e) {
      // let percent = e.offsetX / (this.$refs.progressBar.clientWidth - btnWidth)
      // this.$emit('percentChange', percent) 

      // this._setOffset(e.offsetX) e.offsetX获取的位置有错误
      // 子组件应该具有独立修改percent的功能，不应该冒泡percentChange，让父组件修改percent，监听watch。
      let rect = this.$refs.progressBar.getBoundingClientRect()
      let offsetLeft = e.pageX - rect.left
      this._setOffset(offsetLeft)
      this._percentChange()
    }
  },
  created() {
    this.touch = {}
  },
}
</script>

<style scoped lang="less">
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: @color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid @color-text;
        border-radius: 50%;
        background: @color-theme;
      }
    }
  }
}
</style>