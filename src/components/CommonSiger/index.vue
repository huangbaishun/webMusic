<template>
  <div class="singer">
    <list-view :data="singers">

    </list-view>
  </div>
</template>
<script>
import ListView from '@/base/listview/ListView.vue'
export default {
  name: '',
  data() {
    return {
      singerList: [
        {'img': require('@/assets/imgs/jay.jpg'), name: '周杰伦'},
        {'img': require('@/assets/imgs/jay1.jpg'), name: 'JAY'},
        {'img': require('@/assets/imgs/hu.jpg'), name: '胡六'},
        {'img': require('@/assets/imgs/wang.jpg'), name: '王力宏'},
        {'img': require('@/assets/imgs/xue.jpg'), name: '薛之谦'},
      ],
      singers: []
    };
  },
  created() {

  },
  mounted() {
    this._initSinger()
  },
  methods: {
    _initSinger() {
      this.getData()
    },
    getData() {
      let letters = [{
        id: 0,
        title: '热门',
        arr: []
      }]
      for (let i = 0; i < 26; i++) {
        let obj = {
          id: i+1,
          title: String.fromCharCode(65 + i),
          arr: []
        }
        letters.push(obj)
      }
      this.singers = letters
      let uid = 0;
      letters.forEach(item => {
        this.singerList.forEach((it) => {
          let obj = {
            img: it.img,
            name: `${it.name}${uid}`,
            uid: uid++
          }
          item.arr.push(obj)
        })
      });
    }
  },
  components: {
    ListView
  }
};
</script>
<style lang='less' scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
