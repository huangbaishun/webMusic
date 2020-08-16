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
        <h1 class="title">热门歌单推荐</h1>
        <!-- <div style="height: 300px; overflow: hidden" class="wrapperhbs" ref="wrapperhbs">
          <ul class="content">
            <li v-for="item in hostList" :key="item.id" class="item">
              <div class="icon">
                <img alt="" width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc">{{ item.desc }}</p>
              </div>
            </li>
          </ul>
        </div> height: calc(100% - 353px)-->
        <div>
          <scroll
            style="height: 300px; overflow: hidden;"
            class="wrapperhbs"
            ref="scroll"
          >
            <ul class="content">
              <li
                v-for="item in hostList"
                :key="item.id"
                class="item"
                @click="goDetailed(item)"
              >
                <div class="icon">
                  <img alt="" width="60" height="60" v-lazy="item.imgurl" />
                </div>
                <div class="text">
                  <h2 class="name">{{ item.name }}</h2>
                  <p class="desc">{{ item.desc }}</p>
                </div>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Slider from "@/base/slider/slider";
// import BScroll from '@better-scroll/core'
import Scroll from "@/base/scroll/index";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      objImgs: [
        { img: require("@/assets/imgs/1.jpeg"), id: 1 },
        { img: require("@/assets/imgs/2.jpeg"), id: 2 },
        { img: require("@/assets/imgs/3.jpeg"), id: 3 },
        { img: require("@/assets/imgs/4.jpeg"), id: 4 },
      ],
      hostImgs: [
        {
          img: require("@/assets/imgs/jay.jpg"),
          name: "一路向北",
          desc: "非常好听的一首歌",
        },
        {
          img: require("@/assets/imgs/jay1.jpg"),
          name: "夜曲",
          desc: "非常好听的一首歌",
        },
        {
          img: require("@/assets/imgs/hu.jpg"),
          name: "后来遇见她",
          desc: "非常好听的一首歌",
        },
        {
          img: require("@/assets/imgs/wang.jpg"),
          name: "小城故事",
          desc: "非常好听的一首歌",
        },
        {
          img: require("@/assets/imgs/xue.jpg"),
          name: "演员",
          desc: "非常好听的一首歌",
        },
      ],
      hostList: [],
    };
  },
  components: {
    Slider,
    Scroll,
  },
  created() {
    this.setImg();
  },
  mounted() {
    // this.$refs.scroll.$el.style.height = 'calc(100% - 353px)'
  },
  methods: {
    ...mapMutations({
      setSinger: "SET_SINGER",
    }),
    setImg() {
      let len = new Array(6);
      let arr = [];
      for (let i = 0, l = len.length; i < l; i++) {
        this.hostImgs.forEach((item) => {
          let obj = {
            id: arr.length,
            uid: arr.length,
            name: item.name,
            desc: item.desc,
            imgurl: item.img,
            img: item.img,
          };
          arr.push(obj);
        });
      }
      this.hostList = arr;
    },
    goDetailed(item) {
      this.setSinger(item);
      this.$router.push({
        path: `/singer/${item.uid}`,
      });
    },
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
      .title {
        color: @color-theme;
        text-align: center;
        height: 65px;
        line-height: 65px;
        font-size: @font-size-medium;
      }
      .item {
        display: flex;
        padding: 0 20px 20px 20px;
        align-items: center;
        .icon {
          width: 60px;
          height: 60px;
          padding-right: 20px;
        }
        .text {
          height: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-size: @font-size-medium;
          .name {
            color: @color-text;
          }
          .desc {
            color: @color-text-d;
          }
        }
      }
    }
  }
}
</style>
