<template>
  <div>
    <p>{{ count }}</p>
    <div @click="handclick" style="border: 1px solid #ccc;width: 200px; padding: 10px 20px">click me</div>
  </div>
</template>
<script>
// import { thorttle } from '@/utils/dom'
export default {
  name: '',
  data() {
    return {
      count: 0
    };
  },
  created() {
    this.handclick = this.thorttle(this.add)
  },
  methods: {
    add() {
      this.count++
    },
    // handclick: thorttle(function(){
    //           this.add()
    //  },1000),
    thorttle(func, wait = 1000) {
      let timeout;
      return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
          timeout = setTimeout(() => {
              timeout = null;
              console.log(context);
              func.apply(context, args)
          }, wait)
        }
      }
    }
  },
};
</script>
<style lang='less' scoped></style>
