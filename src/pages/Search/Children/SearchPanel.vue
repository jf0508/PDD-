<template>
  <div class="searchPanel">
    <div class="PanelTitle">
        <div class="searchInput">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" ref='mysearch' placeholder="请输入您需要的商品">
        </div>
        <div class='backBtn' @click="isShow(false)">取消</div>
    </div>
    <div class="serachHot">
      <div class="hottitle">
        <i class='iconfont icon-huo'></i>
        <span>热门搜索</span>
      </div>
      <ul class="hotContent">
        <li>热门1</li>
        <li>热门12</li>
        <li>热门133</li>
        <li>热门1444</li>
        <li>热门1555</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{ //接收父组件方法
    isShow:Function
  },
  mounted() {
    this.$refs.mysearch.focus();
  },
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
      height: 55px;
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      .searchInput{
        width: 85%;
        height: 35px;
        background: #ededed;
        border-radius: 5px;
        display: flex;
        align-items: center;
        font-size: 14px;
        input{
          outline: none;
          width: 100%;
        }
        i{
          margin: 0 10px;
          color: #666666;
        }
      }
      .backBtn{
        font-size: 16px;
        text-align: center;
        color: #aaaaaa;
      }
    }
    .serachHot{
      padding: 0 15px;
      .hottitle{
      width: 100%;
      height: 40px;
      line-height: 50px;
      color: #666666;
      span{
        font-size: 14px;
      }
    }
    .hotContent{
      display: flex;
      flex-wrap: wrap;
      li{
        padding: 5px 15px;
        background: #f1f1f1;
        margin-right: 15px;
        margin-top: 15px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        font-size: 14px;
        color: #aaaaaa;
      }
    }
    }
    
  }
</style>
