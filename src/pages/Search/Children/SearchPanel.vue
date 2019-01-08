<template>
  <div class="searchPanel">
    <div class="PanelTitle">
        <div class="searchInput">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" placeholder="请输入您需要的商品">
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
  .searchPanel{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99;
    background: #ffffff;
    .PanelTitle{
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      align-items: center;
      justify-content: center;
      .searchInput{
        width: 70%;
        height: 30px;
        background: #e0e0e0;
        border-radius: 5px;
        display: flex;
        align-items: center;
        font-size: 14px;
        i{
          margin: 0 10px;
          color: #666666;
        }
      }
    }
  }
</style>
