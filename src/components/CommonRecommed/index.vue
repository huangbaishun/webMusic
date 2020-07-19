<template>
  <div class="recommed">
    <div class="recommed-content">
      <div class="slider-warpper" v-if="objImgs.length">
        <slider>
          <div v-for="item in objImgs" :key="item.id">
            <a href="http://www.baidu.com">
              <img :src="item.img" alt="" width="100%" />
            </a>
          </div>
        </slider>
      </div>
      <div class="recommed-list">
        <h1>热门歌单推荐</h1>
        <ul>

        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Slider from '@/base/slider/slider'
export default {
  name: '',
  data() {
    return {
      objImgs:  [
        {'img': require('@/assets/imgs/1.jpeg'), id: 1},
        {'img': require('@/assets/imgs/2.jpeg'), id: 2},
        {'img': require('@/assets/imgs/3.jpeg'), id: 3},
        {'img': require('@/assets/imgs/4.jpeg'), id: 4},
      ]
    };
  },
  components: {
    Slider,
  },
  mounted() {
  },
};
</script>
<style lang='less' scoped>
.recommed {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  .recommed-content {
    height: 100%;
    overflow: hidden;
    .slider-warpper {
      position: relative;
      overflow: hidden;
      width: 100%;
    }
    .recommed-list {

    }
  }
}
</style>
