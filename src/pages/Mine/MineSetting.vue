<template>
<div class="me-setting">
   <div> 
     <setting-cell left-icon="iconfont icon-daifahuo" left-title="免密支付设置" :clickCell='Sethandler'/>
     <setting-cell left-icon="iconfont icon-daifahuo" left-title="免拼卡设置" :clickCell='Sethandler'/>
     <setting-cell left-icon="iconfont icon-daifahuo" left-title="消息接收设置" right-title='免打扰'/>
   </div>
    <div class='Setitem'>
     <setting-cell left-icon="iconfont icon-daifahuo" left-title="消息接收设置" :clickCell='Sethandler'/>
     <setting-cell left-icon="iconfont icon-daifahuo" left-title="常见问题" :clickCell='Sethandler'/>
     <setting-cell left-icon="iconfont icon-daifahuo" left-title="意见反馈" :clickCell='Sethandler'/>
   </div>
    <div class='Setitem'>
     <setting-cell left-icon="iconfont icon-daifahuo" left-title="商家免费入住" :clickCell='Sethandler'/>
     <setting-cell left-icon="iconfont icon-daifahuo" left-title="检查更新" :clickCell='Sethandler' :isShowRightArrow='false' />
   </div>

   <div class='logout' @click='logoutHandler'>退出登录</div>
    <div class='back' @click='$router.back()'>返回</div>
  </div>
</template>

<script> 
  import SettingCell from './SettingCell.vue'
  import {Toast,MessageBox} from 'mint-ui'
export default {
    data(){
      return{

      }
    },
    components:{
    SettingCell
    },
    methods: {
      Sethandler(props){
        console.log(props)
        Toast('点击了'+props)
      },
      logoutHandler(){
        MessageBox.confirm('确定要退出么?').then(res => {
          console.log('退出成功')
          window.localStorage.removeItem("userInfo")
          this.$router.replace('/home')
        })
      }
    },
    created() {
      this.$store.commit('isShowTabbarHandle',false)
    },
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .me-setting
    width 100%
    height 100%
    background-color #ececec
    .logout
      height 40px
      line-height 40px
      background-color #fff
      margin-top 20px
      text-align center
    .Setitem
      margin-top 6px
    .logout
      width 100%
      height 50px
      display flex
      justify-content center
      align-items center
    .back
      width 80%
      height 50px
      background red
      margin 0 auto
      border-radius 5px
      color #ffffff
      display flex
      margin-top 80px
      font-size 20px
      justify-content center
      align-items center
</style>
