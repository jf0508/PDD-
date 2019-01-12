<template>
  <div class="me-top">
    <router-link tag="div" class="user" to="/medetail">
      <img src="./images/me_icon.png" alt="">
      <p>{{userInfos | phoneFormat}}</p>
      <i class="itlike-3"></i>
    </router-link>
    <div class="my-older">
      <div class="older-top">
        <h3>我的订单</h3>
        <span>查看全部 > </span>
      </div>
      <div class="older-bottom">
        <div class="bottom-item">
          <i class="iconfont icon-daifukuan"></i>
          <span>待付款</span>
        </div>
        <div class="bottom-item">
          <i class="iconfont icon-fenxiang"></i>
          <span>待分享</span>
        </div>
        <div class="bottom-item">
          <i class="iconfont icon-daifahuo"></i>
          <span>待发货</span>
        </div>
        <div class="bottom-item">
          <i class="iconfont icon-wuliu"></i>
          <span>待收货</span>
        </div>
        <div class="bottom-item">
          <i class="iconfont icon-daipingjia"></i>
          <span>待评价</span>
        </div>
      </div>
    </div>
    <div class="setting">
      <div class="setting-item">
        <i class="iconfont icon-hongbao"></i>
        <span>新人红包</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-shuiguo"></i>
        <span>多多果园</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-kanjiajieguochaxun"></i>
        <span>砍价免费拿</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-fenxiangzhuanqian"></i>
        <span>边逛边赚</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-hongbao"></i>
        <span>天天领红包</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-tubiao201"></i>
        <span>收货地址</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-fankui"></i>
        <span>我的评价</span>
      </div>
      <div class="setting-item">
        <i class="iconfont icon-kefu"></i>
        <span>官方客服</span>
      </div>
      <router-link tag="div" class="setting-item" to="/setting">
        <i class="iconfont icon-shezhi"></i>
        <span>设置</span>
      </router-link>
    </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "MeTop",
        props:{
          userInfos:''
        },
        data(){
          return{
          
          }
        },
        computed:{
          ...mapState(["userInfo"])
        },
        filters:{ //过滤器
           phoneFormat(phone){
              // 1. 转成数组
             let phoneArr = [...phone];
             let str = '';
             phoneArr.forEach((item, index)=>{
                if(index === 3 || index === 4 || index === 5 || index === 6){
                    str += '*'
                }else {
                   str += item;
                }
             });
             return str
           }
        },
      created() {
        this.$store.commit('isShowTabbarHandle',true)
      },
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .me-top
    font-size 14px
    .user
      display flex
      flex-direction row
      align-items center
      padding 20px
      background-color #fff
      margin-bottom 10px
      p
        margin 0 10px
      img
        width 60px
        height 60px
        border-radius 50%
      i
        font-size 25px
    .my-older
      background-color #fff
      .older-top
        display flex
        flex-direction row
        padding 0 10px
        justify-content space-between
        height 44px
        line-height 44px
      .older-bottom
        display flex
        .bottom-item
          flex 1
          height 60px
          display flex
          flex-direction column
          justify-content center
          align-items center
          i
            font-size 30px
            color #E9232C
            margin-bottom 5px
    .setting
      margin-top 10px
      background-color #fff
      display flex
      justify-content space-between
      flex-wrap wrap
      .setting-item
        width 90px
        height 70px
        display flex
        flex-direction column
        justify-content center
        align-items center
        i
          font-size 30px
          color orange
          margin-bottom 5px
</style>
