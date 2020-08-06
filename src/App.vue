<template>
  <div id="app">
    <CommonHeader />
    <Tab />
    <RouterView />
    <player></player>
  </div>
</template>
<script>
import CommonHeader from '@/components/CommonHeader/index.vue'
import Tab from '@/views/tab.vue'
import Player from '@/components/player/player.vue'
export default {
  components: {
    CommonHeader,
    Tab,
    Player
  }
}
</script>
<style lang="less">
</style>
