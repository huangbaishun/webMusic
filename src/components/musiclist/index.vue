<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back iconfont icondirection-left"></i>
    </div>
    <h2 class="title">{{ title }}</h2>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="filter"></div>
    </div>
    
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs.arr" class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
      <song-list :songs="songs.arr">
        <!-- <div class="list" ref="list-song">
        <ul>
          <li v-for="item in songs.arr" :key="item.uid" class="li-list">{{ item }}</li>
        </ul>
      </div> -->
      </song-list>
    </scroll>
  </div>
</template>
<script>
import Scroll from '@/base/scroll/index'
import SongList from '@/base/songlist/SongList'

const TRANSLATE_TOP = 40
export default {
  name: 'MusicList',
  data() {
    return {
      scrollY: 0
    };
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    songs: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Scroll,
    SongList,
  },
  mounted() {
    // console.log(this.songs);
    // this.$refs['list-song'].style.top = this.$refs.bgImg.clientHeight + 'px'
    this.bgHeight = this.$refs.bgImg.clientHeight
    // let height = this.$refs.bgImg.clientHeight
    this.minTranslateY = -this.bgHeight + TRANSLATE_TOP
    this.$refs.list.$el.style.top  = `${this.bgHeight}px`
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage});background-position-y:30%`
    }
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      
      this.$refs.layer.style.transform = `translate3d(0, ${translateY}px, 0)`
      this.$refs.layer.style['webkit-transform'] = `translate3d(0, ${translateY}px, 0)`
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y // 向上负值
    }
  },
};
</script>
<style lang='less' scoped>
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: @color-background;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: @font-size-large-x;
      color: @color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-align: center;
    line-height: 40px;
    font-size: @font-size-large;
    color: @color-text;
  }
  .bg-image{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 60%;
    transform-origin: top;
    background-size: cover;
    z-index: 5;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    width: 100%;
    height: 100%;
    background: @color-background;
    z-index: 5;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: @color-background;
    padding: 20px 30px;
    z-index: 10;
    // overflow: hidden;
    // .song-list-wrapper
    //   padding: 20px 30px
    // .loading-container
    //   position: absolute
    //   width: 100%
    //   top: 50%
    //   transform: translateY(-50%)
  }
  .li-list {
    color: @color-text-l;
    padding: 10px 10px 10px 20px;
  }
}
</style>
