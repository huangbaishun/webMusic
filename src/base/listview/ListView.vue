<template>
  <div class="listview">
    <ul ref="ulContent">
      <li v-for="group in data" :key="group.id" class="list-group" ref="listGroup">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.arr" :key="item.uid" class="list-group-item">
            <img v-lazy="item.img" alt="" class="avatar"/>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcut" :key="item" class="item" :class="{'current': index === currentIndex}" :data-index="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getData } from '@/utils/dom.js'
const anchorHeight = 18
export default {
  name: 'listview',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    shortcut() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  data() {
    return {
      currentIndex: -1
    };
  },
  created() {
    this.touch = {} // 为什么不在data里面定义，因为不需要绑定在dom上做响应式更新
  },
  methods: {
    onShortcutTouchStart(e) {
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      let anchorIndex = parseInt(getData(e.target, 'index'))
      this.touch.anchorIndex = anchorIndex
      this.currentIndex = anchorIndex
      // console.log(anchorIndex);
      this.scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = Math.abs(this.touch.y2 - this.touch.y1) / 18 | 0 // 向下取整
      let anchorIndex = parseInt(this.touch.anchorIndex) + parseInt(delta)
      // console.log(anchorIndex);
    },
    scrollTo(index) {
      this.listHeight = []
      let list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight
        this.listHeight.push(height)
      }
      this.$refs.listGroup[index].scrollIntoView()
      // this.$refs.ulContent.style.transform = `translateY(${-this.listHeight[index]}px)`
    }
  },
};
</script>
<style lang='less' scoped>
.listview {
  width: 100%;
  height: 100%;
  overflow: auto;
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
      .avatar {
        width: 60px;
        height: 60px;
        vertical-align: middle;
        border-radius: 50%;
        padding: 10px 20px;
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
}
</style>
