<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back iconfont icondirection-left"></i>
    </div>
    <h2 class="title">{{ songs.name }}</h2>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="filter"></div>
    </div>

    <div class="list" ref="list-song">
      <ul>
        <li v-for="item in songs.arr" :key="item.uid" class="li-list">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MusicList',
  data() {
    return {};
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
  mounted() {
    // console.log(this.songs);
    this.$refs['list-song'].style.top = this.$refs.bgImg.clientHeight + 'px'
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage});background-position-y:30%`
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
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: @color-background;
    overflow: auto;
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
