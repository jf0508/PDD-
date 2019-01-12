<template>
    <div class="mine"> 
      <select-login v-if='!userInfos'/>
      <div>
        <mine-top v-if='userInfos' :userInfos='userInfos.user_name'/>
      </div>
      
    </div>
</template>

<script>
import MineTop from './MineTop'
import SelectLogin from '../Login/SelectLogin'
import {mapState} from 'vuex'
export default {
  name:'Mine',
  data(){
    return{
      userInfomsg:{},
      userInfos:''
    }
  },
  components:{
    SelectLogin,
    MineTop
  },
  created() {
    this.userInfos = JSON.parse(window.localStorage.getItem("userInfo")) //进入我的界面 验证是否登录
  },
  computed: {
    ...mapState(['userInfo'])
  },
}
</script>

<style lang='scss' scoped>  
  .mine{
    background: #f5f5f5;
    height: 100%;
   
  }
</style>
