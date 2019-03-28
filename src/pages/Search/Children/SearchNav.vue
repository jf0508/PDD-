<template>
  <div class="search-nav">
    <div class='search-nav-btn' @click.prevent="isShow(true)">
      <i class='iconfont icon-sousuo'></i>
      <span>请输入商品关键字</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchNav",
  props:{
    isShow:Function
  }
}
</script>

<style lang='scss' scoped>
.search-nav {
  width: 100%;
  background: #ffffff;
  height: 60px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-nav-btn{
    width: 90%;
    height: 40px;
    background: #ededed;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #a1a0a0;
    font-size: 14px;
    border-radius: 10px;
    i{
      margin-right: 10px;
    }
  }
}
</style>
