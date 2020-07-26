<template>
  <div class="song-list">
    <ul>
      <li v-for="item in songs" :key="item.uid" class="item">
        <div class="content">
          <h2 class="name no-warp">{{ item.name }}</h2>
          <p class="desc no-warp">{{ item.desc }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    height: 64px;
    font-size: @font-size-medium;
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        color: @color-text;
      }
      .desc {
        margin-top: 4px;
        color: @color-text-d;
      }
    }
  }
}
</style>
