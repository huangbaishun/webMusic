<template>
  <div class="m-header">
    <span class="icon-div icon iconfont">&#xeb9a;</span>
    <h1 class="text">Web Music</h1>
    <!-- <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link> -->
  </div>
</template>
<script>
export default {
  name: 'CommonHeader',
};
</script>
<style lang='less' scoped>
.m-header {
  position: relative;
    height: 44px;
    text-align: center;
    color: @color-theme;
    font-size: 0;
    .icon-div {
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 44px;
      margin-right: 9px;
      line-height: 44px;
      background-size: 30px 32px;
    }
    .text {
      display: inline-block;
      vertical-align: middle;
      line-height: 44px;
      font-size: @font-size-large;
    }
    .mine {
      position: absolute;
      top: 0;
      right: 0;
      .icon-mine {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: @color-theme;
      }
    }
}
</style>
