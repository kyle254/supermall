<template>
  <div id="app">
     <!-- 排除详情页保持不变，让详情页重新请求数据 -->
    <keep-alive exclude="Detail">
    <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>

// import MainTabBar from 'components/content/mainTabbar/MainTaBar'
import MainTabBar from './components/content/mainTabbar/MainTaBar'

export default {
  name: 'app',
  components: {
     MainTabBar
  }
}
</script>
  
<style>
 @import 'assets/css/base.css';
</style>
