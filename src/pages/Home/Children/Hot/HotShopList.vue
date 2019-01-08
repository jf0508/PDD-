<template>
  <div class="shop-container" v-if="homeshoplist.length>0">
    <ul class="shop-list">
      <li class="shop-list-item" v-for="(item,index) in homeshoplist" :key="index">
        <img :src="item.image_url">
        <h4 class="list-bottom-title">{{item.goods_name}}</h4>
        <div class="list-item-bottom">
            <span class="item-price">￥{{item.normal_price/100}}</span>
            <span class="item-conter">{{item.sales_tip}}</span>
            <span class="item-user">
              <img :src="itemUser.avatar" v-for="(itemUser,Uindex) in item.bubble" :key="Uindex">
            </span>
            <span>
              <button class="item-buy">去拼单></button>
            </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'HotShopList',
  data(){
    return{

    }
  },
  computed: {
    ...mapState(['homeshoplist'])
  },
}
</script>

<style lang='scss' scoped> 
  .shop-container{
    background: #f5f5f5;
    .shop-list{
      .shop-list-item{
        margin-bottom: 10px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        &>img{
          width: 100%;
          height: 200px;
        }
        .list-bottom-title{
          line-height: 50px;
          width: 94%;
          margin-left:3%;
          height: 44px;
          overflow: hidden;
        }
        .list-item-bottom{
          display: flex;
          margin: 10px 0;
          justify-content: space-around;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          img{
            width: 100%;
          }
          .item-price{
            color: red;
            font-weight: bold;
            font-size: 18px;
            flex: 1;
          }
          .item-conter{
            flex: 2;
            color: #cccccc;
            font-size: 14px;
          }
          .item-user{
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
             img:nth-child(2){
                margin-left: -10px;
              }
          }
          .item-buy{
            width: 100%;
            height: 34px;
            font-size: 15px;
            border: none;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            background: orangered;
            margin-left: 10px;
            border-radius: 10px;
          }
        }
      }
    }
  }
</style>
