<template>
  <div class="tab-router">
    <router-link to="recommed" class="item-link">
      <span class="item">推荐</span>
    </router-link>
    <router-link to="siger" class="item-link">
      <span class="item">歌手</span>
    </router-link>
    <router-link to="rank" class="item-link">
      <span class="item">排行</span>
    </router-link>
    <router-link to="search" class="item-link">
      <span class="item">搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Tab',
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
  .tab-router {
    display: flex;
    height: 44px;
    line-height: 44px;
    .item-link {
      flex: 1;
      text-align: center;
      color: @color-text-l;
      &.router-link-active {
        .item {
          color: @color-theme;
          border-bottom: 1px solid @color-theme;
        }
      }
    }
  }
</style>
