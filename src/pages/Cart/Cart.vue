<template>
    <div class="chat">
      <!--头部区域-->
      <div v-if='cardprods.length>0'>
        <div class="header">
          <a href="" class="icon_back"></a>
          <h3>购物车</h3>
          <a href="" class="icon_menu"></a>
        </div>
        <!--安全提示-->
        <div class="jd_safe_tip" >
          <p class="tip_word">
            您正在安全购物环境中，请放心购物
          </p>
        </div>
      </div>
      <!--中间的列表-->
      <main class="jd_shopCart_list">
        <section>
          <div class="shopCart_list_con" v-for='(item,index) in cardprods' :key='index'>
            <div class="list_con_left">
              <a href="javascript:;" class="cart_check_box" :checked="item.checked" @click.stop="selecthandler(item)"></a>
            </div>
            <div class="list_con_right">
              <div class="shop_img">
                <img :src="item.thumb_url" alt="">
              </div>
              <div class="shop_con">
                <a href="">{{item.goods_name}}</a>
                <p class="shop_price">{{item.price/100 | moneyFormat(item.price)}}</p>
                <div class="shop_deal">
                  <div class="shop_deal_left">
                    <span @click.stop="changeCount(item,false)">-</span>
                    <input type="tel" value="1" v-model="item.buy_count">
                    <span @click.stop="changeCount(item,true)"> +</span>
                  </div>
                  <div class="shop_deal_right" @click.stop="removeProds(item)">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <!--底部通栏-->
      <div id="tab_bar" v-if='cardprods.length>0'>
          <div class="tab-bar-left">
            <a href="javascript:;" class="cart_check_box" :checked="isSelectAll" @click.prevent="selectAllhandler(isSelectAll)"></a>
            <span style="font-size: 16px;">全选</span>
            <div class="select-all">
              合计：<span class="total-price">{{totalMoney | moneyFormat(totalMoney)}}</span>
            </div>
          </div>
          <div class="tab-bar-right">
            <a href="#" class="pay">去结算</a>
          </div>
      </div>
        <div v-else class='nullCart'> 
          <i class='iconfont'></i>
          <span>购物车是空的</span>
        </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import { Dialog } from 'vant';
  import BScroll from 'better-scroll'

  export default {
    name: "Cart",
    data(){
      return{
        //isCard:this.$store.state.cardprods,
        isSelectAll:false, //全选
        totalMoney:0 //总价
      }
    },
    filters:{
      moneyFormat(money){
        return '￥' + money.toFixed(2);
      }
    },
     watch: {
     cardprods(){  //异步监听组件方法1；
      this.$nextTick(()=>{
        this.initScroll();
      })
    }
  },
    methods: {
      change(props){
        console.log(props)
      },
        initScroll(){ //初始化滚动
        this.RecommendScroll = new BScroll('.jd_shopCart_list',{
          probeType:3,
          scrollY:true,
          click:true
        });
      },
      //加减商品数量
      changeCount(item,isAdd){
        if(isAdd === true){
          console.log('加数量')
          item.buy_count ++
          this.$store.commit('changeCardProds',true) //更新vuex数据
          this.GetTotalMoney()
        }else{
           console.log('减数量')
          if(item.buy_count<=1){
            return
          }else{
            item.buy_count--
            this.$store.commit('changeCardProds',false) //更新vuex数据
            this.GetTotalMoney()
          }
        }
      },
      //单选
      selecthandler(item){
        this.$store.commit('selectProds',item)
        this.GetTotalMoney()
        this.hasSelectAll();
      },
      //全选
      selectAllhandler(isSelectAll){
          this.isSelectAll = !isSelectAll
          this.$store.commit('selectAll',isSelectAll)
          this.GetTotalMoney()
      },
      //判断是否全选
       hasSelectAll(){
         let flag = true
         this.cardprods.forEach((item,index)=>{
            if(!item.checked){
              flag = false
            }
              this.isSelectAll = flag;
         })
      },
      //删除
      removeProds(item){
        Dialog.confirm({
          title: '删除商品',
          message: '您确定要删除该商品么？'
        }).then(() => {
           this.$store.commit('reomveProds',item)
        }).catch(() => {
          console.log("删除失败")
        });
       
      },
      //计算商品总计
      GetTotalMoney(){
        let totalMoney = 0;
        this.cardprods.forEach((item,index)=>{
          if(item.checked === true){
          totalMoney += (item.price * item.buy_count) / 100
          } 
        })
        this.totalMoney = totalMoney;
      }

    },
    computed: {
      ...mapState(['cardprods']),

    },
    mounted() {
      this.initScroll();
      this.$store.dispatch('reqGetCardProds')
    },
  }
</script>


<style scoped lang="stylus" ref="stylesheet/stylus">
  .chat
    width 100%
    height 100%
    background-color #e0e0e0
    display flex
    flex-direction column
    overflow hidden
    .header
      width: 100%;
      height: 44px;
      background: #ffffff;
      -webkit-background-size: 1px 44px;
      background-size: 1px 44px;
      border-bottom: 1px solid #e1e1e1;
      display flex
      justify-content center
      align-items center
      font-size 18px
      font-weight bolder
      color #E9232C
      z-index 999
    .jd_safe_tip
      height 36px
      line-height 36px
      border-bottom: 1px solid #e0e0e0;
      background-color #fff
      text-align center
      .tip_word
        display inline-block
        font-size 14px
        padding-left 20px
        position relative
        &:before
          content ''
          width 18px
          height 18px
          background url("./images/safe_icon.png") no-repeat
          -webkit-background-size 18px 18px
          background-size 18px 18px
          position absolute
          top 9px
          left 0
    .jd_shopCart_list
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
      margin-bottom 2px
      background-color #ffffff
      border-top 1px solid #e1e1e1
      border-bottom 1px solid #e1e1e1
      height 100%
      overflow hidden
      margin-top 1px
      flex 1
      section
        margin-top 15px
        border-top 1px solid #e0e0e0
        background-color #fff
        height auto
        .shopCart_list_con
          padding: 10px 0
          border-bottom 1px solid #e0e0e0
          .list_con_left
            .cart_check_box
              float left
              background url("./images/shop-icon.png") no-repeat
              -webkit-background-size 50px 100px
              background-size 50px 100px
              width 20px
              height 20px
              margin-top 17px
              margin-left 7px
            .cart_check_box[checked]
              background-position -25px 0
          .list_con_right
            overflow: hidden;
            padding: 0 7px;
            .shop_img
              float left
              img
                width 80px
                height 80px
                display block
            .shop_con
              overflow hidden
              padding-left 7px
              & > a
                font-size 14px
                color #666
                line-height 20px
                height 40px
                overflow hidden
                display block
                text-decoration none
              .shop_price
                color #E9232C
                margin-top 5px
              .shop_deal
                margin-top 5px
                .shop_deal_left
                  float left
                  & > span
                    border 1px solid #e0e0e0
                    width 30px
                    height 25px
                    display flex
                    justify-content center
                    align-items center
                    float left
                    &:first-child
                      border-top-left-radius 3px
                      border-bottom-left-radius 3px
                    &:last-child
                      border-top-right-radius 3px
                      border-bottom-right-radius 3px
                  input
                    border none
                    border-top 1px solid #e0e0e0
                    border-bottom 1px solid #e0e0e0
                    float left
                    width 50px
                    height 25px
                    text-align center
                .shop_deal_right
                  float right
                  & > span:first-child
                    background url('./images/delete_up.png') no-repeat
                    background-size 18px 4px
                    width 18px
                    height 4px
                    display block
                  & > span:last-child
                    background url('./images/delete_down.png') no-repeat
                    background-size 17px 17px
                    width 17px
                    height 17px
                    display block
                    margin-top -3px
    #tab_bar
      width 100%
      height 44px
      background-color #fff
      display flex
      justify-content space-between
      align-items center
      box-shadow 0 -5px 5px #e0e0e0
      border-bottom: 1px solid #e0e0e0
      .tab-bar-left
        display flex
        align-items center
        margin-left 7px
        .cart_check_box
          float left
          background url("./images/shop-icon.png") no-repeat
          -webkit-background-size 50px 100px
          background-size 50px 100px
          width 20px
          height 20px
          margin-top 4px
          margin-left 4px
          margin-right 15px
        .cart_check_box[checked]
          background-position -25px 0
        .select-all
          margin-left 8px
          font-size 16px
      .tab-bar-right
        .pay
          width 90px
          height 44px
          background-color #E9232C
          display flex
          justify-content center
          align-items center
          font-size 18px
          color #fff
          text-decoration none
   .nullCart
    width 100%
    height 80%
    position fixed
    top 0
    display flex
    justify-content center
    align-items center     
</style>
