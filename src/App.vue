<template>
  <div id="app">
    <CommonHeader />
    <Tab />
    <RouterView />
  </div>
</template>
<script>
import CommonHeader from '@/components/CommonHeader/index.vue'
import Tab from '@/views/tab.vue'
export default {
  components: {
    CommonHeader,
    Tab
  }
}
</script>
<style lang="less">
</style>
