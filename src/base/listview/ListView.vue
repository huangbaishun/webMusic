<template>
  <scroll class="list-content" :data="data" :listenScroll="listenScroll" :probeType="probeType" ref="listview" @scroll="scroll">
      <ul ref="ulContent">
        <li v-for="group in data" :key="group.id" class="list-group" ref="listGroup">
          <h2 class="title">{{ group.title }}</h2>
          <ul>
            <li v-for="item in group.arr" :key="item.uid" class="list-group-item" @click="singerDetailed(item)">
              <img v-lazy="item.img" alt="" class="avatar"/>
              <span class="name">{{ item.name }}</span>
            </li>
          </ul>
        </li>
      </ul>

      <div class="list-shortcut" @touchstart="onshortcutTouchstart" @touchend="onshortTouchEnd" @touchmove.stop.prevent="onshortcutTouchMove">
        <ul>
          <li v-for="(item, index) in shortcut" :key="item" class="item" :class="{'current': index === currentIndex}" :data-index="index">{{ item }}</li>
        </ul>
      </div>

      <div class="list-fixed" v-if="fixedTitle" ref="fixed">
        <h1 class="fixed-title">{{ fixedTitle }}</h1>
      </div>
  </scroll>
</template>
<script>
import { getData } from '@/utils/dom.js'
import Scroll from '@/base/scroll/index.vue'
const anchorHeight = 18 // li的高度
export default {
  name: 'listview',
  props: {
    data: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    shortcut() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) return ''
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    };
  },
  created() {
    this.touch = {}, // 为什么不在data里面定义，因为不需要绑定在dom上做响应式更新
    this.listenScroll = true,
    this.listHeight = [],
    this.probeType = 3
  },
  methods: {
    singerDetailed(item) {
      this.$emit('singerDetailed', item)
    },
    onshortcutTouchstart(e,f) {
      let anchorIndex = getData(e.target, 'index')
      let firtTouch = e.touches[0]
      this.touch.Y1 = firtTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this.scrollTo(anchorIndex)
      // this.currentIndex = anchorIndex
    },
    onshortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.Y2 = firstTouch.pageY
      let move = Math.floor((this.touch.Y2 - this.touch.Y1) / anchorHeight)
      let anchorIndex = parseInt(this.touch.anchorIndex) + move
      
      this.scrollTo(anchorIndex)
      // this.currentIndex = anchorIndex
    },
    onshortTouchEnd(e) {

    },
    scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if(index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    calcHeight() { // 计算每一个list的高度
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(0)
      for(let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.calcHeight();
      })
    },
    scrollY(newdata) {
      const listHeight = this.listHeight
      // 当滚动到顶部 newdata > 0
      if (newdata > 0) {
        this.currentIndex = 0
        return
      }
      // 滚动在中级部分
      for (let i = 0; i < listHeight.length -1; i++) {
        let h1 = listHeight[i]
        let h2 = listHeight[i + 1]
        if (-newdata >= h1 && -newdata < h2) {
          this.currentIndex = i
          this.diff = h2 + newdata
          return
        }
      }
      //当滚动到底部，且-newdata 大雨最后一个元素到上限
      this.currentIndex = listHeight.length -2
    },
    diff(newVal) {
      // if (!newVal || newVal > 40)return
      let fixtop = (newVal > 0 && newVal < 30) ? newVal - 30 : 0;
      if (this.fixtop === fixtop) return // 节流处理
      this.fixtop = fixtop
      this.$refs.fixed.style.transform = `translate3d(0, ${this.fixtop}px, 0)`
    }
  },
  components: {
    Scroll
  },
  mounted() {
  },
};
</script>
<style lang='less' scoped>
.list-content {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.list-group {
  padding-bottom: 20px;
  .title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: @font-size-medium;
    color: @color-text-l;
    background: @color-highlight-background;
  }
  .list-group-item {
    padding: 10px 20px;
    .avatar {
      width: 60px;
      height: 60px;
      vertical-align: middle;
      border-radius: 50%;
      margin-right: 10px;
    }
    .name{
      font-size: @font-size-medium;
      color: @color-text-l;
    }
  }
}
.list-shortcut {
  position: absolute;
  width: 20px;
  padding: 20px 0;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  border-radius: 10px;
  background: @color-background-d;
  font-family: Helvetica;
  .item {
    font-size: @font-size-small;
    text-align: center;
    padding: 3px;
    line-height: 1;
    &.current {
      color: @color-theme;
    }
  }
}
.list-fixed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  .fixed-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: @font-size-medium;
    color: @color-text-l;
    background: @color-highlight-background;
  }
}
</style>
