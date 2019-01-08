<template>
        <div class="recommend-item" >
          <img :src="item.thumb_url" style="width:100%" v-if="item.thumb_url">
          <h4 class="item-title">{{item.short_name}}</h4>
          <div class="tags"></div>
          <div class="item-bottombox">
              <span class="item-price">￥{{item.price/100}}</span>
              <span class="item-sales-tip">{{item.sales_tip}}</span>
              <button>找相关</button>
          </div>
        </div>
      
</template>

<script>
export default {
  name:"ShopList",
  props:{
      item:Object
    },
  data(){
    return{}
  },
}
</script>

<style lang='scss' scoped>  
      .recommend-item{
        width: 49.5%;
        background: #ffffff;
        padding-bottom: 8px;
        margin-bottom: 10px;
        &:nth-child(2n-1){
          margin-right: 1%;
        }
        .item-title{
          line-height: 20px;
          font-size: 13px;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 5px;
          padding: 0 5px;
        }
        .item-bottombox{
          display: flex;
          align-items: center;
          margin-top: 8px;
          padding: 0 6px;
          .item-price{
            flex: 2;
            font-weight: bold;
            color: red;
            font-size: 12px
          }
          .item-sales-tip{
            flex: 4;
            font-size: 10px;
            transform: scale(0.8);
            color: #666666;
          }
          button{
            flex: 2;
            border:1px solid orange;
            height: 25px;
            font-size: 12px;
            border-radius: 5px;
            color: orangered;
          }
        }
      }
</style>
