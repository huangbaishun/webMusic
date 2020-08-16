<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back iconfont icondirection-left"></i>
    </div>
    <h2 class="title">{{ title }}</h2>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div
          ref="playBtn"
          v-show="songs.arr && songs.arr.length > 0"
          class="play"
          @click="palyRandom"
        >
          <i class="iconfont icon-play iconicon-test1"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>

    <div class="bg-layer" ref="layer"></div>
    <scroll
      :data="songs.arr"
      class="list"
      ref="list"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      @scroll="scroll"
    >
      <song-list :songs="songs.arr" @clickSongItem="clickSongItem">
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
import Scroll from "@/base/scroll/index";
import SongList from "@/base/songlist/SongList";
import { prefixStyle } from "@/utils/dom";
import { mapActions } from "vuex";

const TRANSLATE_TOP = 40;
const transform = prefixStyle("transform");
export default {
  name: "MusicList",
  data() {
    return {
      scrollY: 0,
    };
  },
  props: {
    bgImage: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    songs: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Scroll,
    SongList,
  },
  mounted() {
    // console.log(this.songs);
    // this.$refs['list-song'].style.top = this.$refs.bgImg.clientHeight + 'px'
    this.bgHeight = this.$refs.bgImg.clientHeight;
    // let height = this.$refs.bgImg.clientHeight
    this.minTranslateY = -this.bgHeight + TRANSLATE_TOP;
    this.$refs.list.$el.style.top = `${this.bgHeight}px`;
  },
  computed: {
    bgStyle() {
      // background-position-y:30%
      return `background-image:url(${this.bgImage});`;
    },
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY);

      // this.$refs.layer.style.transform = `translate3d(0, ${translateY}px, 0)`
      // this.$refs.layer.style['webkit-transform'] = `translate3d(0, ${translateY}px, 0)`
      this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;

      let zIndex = 5;
      let scale = 1;
      let precent = 1 + Math.abs(newY / this.bgHeight);
      if (newY > 0) {
        zIndex = 15;
        this.$refs.bgImg.style.transform = `scale(${precent})`;
        this.$refs.bgImg.style["webkit-transform"] = `scale(${precent})`;
      }
      if (newY < this.minTranslateY) {
        zIndex = 15;
        this.$refs.bgImg.style.height = `${TRANSLATE_TOP}px`;
        this.$refs.bgImg.style.paddingTop = "0px";
      } else {
        this.$refs.bgImg.style.height = "0px";
        this.$refs.bgImg.style.paddingTop = "70%";
      }
      this.$refs.bgImg.style.zIndex = zIndex;
    },
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y; // 向上负值
    },
    back() {
      this.$router.back();
    },
    clickSongItem(item, index) {
      let other = {
        img: this.songs.img || "",
        name: this.songs.name || "",
      };
      this.selectPlay({ list: this.songs.arr || [], index, other });
    },
    palyRandom() {
      let other = {
        img: this.songs.img || "",
        name: this.songs.name || "",
      };
      this.selectPlayRandom({
        list: this.songs.arr || [],
        other,
      });
    },
    ...mapActions(["selectPlay", "selectPlayRandom"]),
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
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    z-index: 5;
    .play-wrapper {
      position: absolute;
      bottom: 40px;
      z-index: 50;
      width: 100%;
      .play {
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid @color-theme;
        color: @color-theme;
        border-radius: 100px;
        font-size: 0;
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: @font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: @font-size-small;
        }
      }
    }
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
