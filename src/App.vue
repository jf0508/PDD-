<template>
  <div id="app">
    <div class="aapScroll">
      <router-view></router-view>
    </div>
    <tabbar></tabbar>
  </div>
  
</template>

<script>
import './assets/icon.css'
import tabbar from './components/Tabbar/tabbar'
export default {
  name: 'App',
  components:{
    tabbar
  }
}
</script>

<style lang='scss' scoped>
$col:red;
  #app{
    background: #f5f5f5;
    width: 100%;
    height: 100%;
    display: flex;  
    flex-direction: column;
    overflow: hidden;
    .aapScroll{
      flex: 1;
      overflow-x: hidden;
    }
  }
</style>
