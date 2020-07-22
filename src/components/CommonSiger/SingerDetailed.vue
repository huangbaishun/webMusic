<template>
  <transition name="slide">
    <music-list :songs="singerdDetailed" :title="title" :bg-image="bgImage" class="singer-detailed"></music-list>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
import { createSong } from '@/utils/song'
import MusicList from '../musiclist/index'
export default {
  name: '',
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'singerdDetailed'
    ]),
    title() {
      return this.singerdDetailed.name
    },
    bgImage() {
      return this.singerdDetailed.img
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.singerdDetailed.uid) {
        this.$router.push({
          path: '/singer'
        })
      }
      let arr = []
      for (let index = 0; index < 20; index++) {
        arr.push('一路向北'+ index)
      }
      this.$set(this.singerdDetailed, 'arr', arr)
      // this.songs = this._normalizeSongs(this.singerdDetailed)
      // console.log(this.singerdDetailed);
    },
    _normalizeSongs(list) {
      // let ret = []
      // list.forEach(item => {
      //   let obj = {}
      //   ret.push(createSong(item))
      // });
      ret.push(createSong(item))
      return ret
    }
  },
  components : {
    MusicList
  }
};
</script>
<style lang='less' scoped>
.singer-detailed {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: @color-background;
  z-index: 100;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
  // transform: translateX(100%);
}
</style>
