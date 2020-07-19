<template>
  <div class="slider" ref="slider">
    <div class="slider-group content" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="item" :class="{'active': curSliderIndex === index}"></span>
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)
import { addClass } from '@/utils/dom.js'
export default {
  name: '',
  props: {
    /**
     * 是否可以循环轮播
     */
    loop: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否可以自动轮播
     */
    autoPlay: {
      type: Boolean,
      default: true,
    },
    /**
     * 轮播时间间隔
     */
    interval: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      dots: [],
      curSliderIndex: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this._setSliderWidth()
      this.initDots()
      this.initSlider()
      if(this.autoPlay) this._play()
    })

    window.addEventListener('resize', ()=>{
      if (!this.slider) return
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    /**
     * 动态设置width
     */
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth

      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
      
    },
    /**
     * 初始化点
     */
    initDots() {
      this.dots = new Array(this.children.length)
    },
    /**
     * 初始化better-scroll
     */
    initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        slide: {
            loop: this.loop,
            threshold: 100
        },
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: false,
        probeType: 2,
      })

      this.slider.on('scrollEnd', () => {
        let index = this.slider.getCurrentPage().pageX
        if (this.loop) {
          // index -= 1
        }
        this.curSliderIndex = index;

        if (this.autoPlay) {
          this.timer && clearTimeout(this.timer)
          this._play()
        }
      })
    },
    /**
     * 自动轮播
     */
    _play() {
      let pageIndex = this.curSliderIndex + 1
      if(pageIndex === this.children.length - 2) pageIndex = 0
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
};
</script>
<style lang='less' scoped>
.slider {
  min-height: 1px; //有何用意？
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      text-align: center;
      overflow: hidden;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
      }
      img {
        display: block;
        width: 100%;
        height: 200px;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 4px;
      background-color: @color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background-color: @color-text-ll;
      }
    }
  }
}
</style>
