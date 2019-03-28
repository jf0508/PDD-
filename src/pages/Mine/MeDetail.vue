<template>
 <div class="user-detail">
    <div class="user-detail-top">基本信息</div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img src="./images/me_icon.png" alt="">
      </div>
      <div class="user-item">
        <span>手机</span>
        <span>{{this.user_phone}}</span>
      </div>
      <div class="user-item">
        <span>昵称</span>
        <span><input type="text" v-model="user_name"></span>
      </div>
      <div class="user-item" @click="sheetVisible = true">
        <span>性别</span>
        <span>{{user_sex}}</span>
      </div>
      <div class="user-item" @click="setAddress">
        <span>常住地</span>
        <span>{{user_address}}</span>
      </div>
      <div class="user-item" @click="$refs.picker.open()">
        <span>生日</span>
        <span>{{user_birthday}}</span>
      </div>
      <div class="user-item">
        <span>个性签名</span>
        <span><input type="text" v-model="user_sain"></span>
      </div>
    </div>
    <!--选择性别-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <!--选择出生日期-->
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate=startDate
      :endDate=endDate
      @confirm="handleBirthday"
    >
    </mt-datetime-picker>
  
   <van-popup v-model="show" position="bottom" :overlay="true">
     <van-area :area-list="arealist" @confirm='selectAddres' value="110101" title='常住地址'/> 
    </van-popup>
    <button class='changeUser' @click="changeUser">保存修改</button>
     <div class='back' @click='$router.back()'>返回</div>
  </div>
</template>

<script> 
import moment from 'moment'
import { Popup,Area } from 'vant';
import {arealist} from './arealist.js'
import {ChangeUserInfo} from '../../api/index.js'
import { Toast } from 'vant';
export default {
    data(){
      return{
        show:false,
        arealist:arealist,
        user_phone:'', //手机号
        user_name:'雅儿',
        user_sain:'',
        user_sex:'女', // 1. 性别
        user_birthday:'',
        user_address:'',
        actions: [
          {name: "男", method: this.selectSex},
          {name: "女", method: this.selectSex},
        ],
        sheetVisible: false,
        startDate:new Date('1995-06-17'), //日历控件 初始最小时间
        endDate:new Date()
      }
    },
    components:{
    },
    mounted() {
      //console.log(arealist)
    },
    methods:{
      selectAddres(props){
        //console.log(props);
        this.user_address = ''
        props.forEach((item,index) => {
          //console.log(item.name)
          this.user_address += `${item.name} `;
        });
        this.show = false;
      },
      setAddress(){
        this.show = true
      },
      selectSex(props){
        //console.log(props);
        this.user_sex = props.name;
      },
      handleBirthday(data){
          this.user_birthday =  moment(data).format('YYYY年MM月DD日');
      },
      //修改用户信息
      changeUser(){
        ChangeUserInfo({
          user_id:this.user_id,
          user_name : this.user_name,
          user_sex : this.user_sex,
          user_birthday : this.user_birthday,
          user_address : this.user_address,
          user_sain : this.user_sain
        }).then(res=>{console.log(res)})
        Toast.success('保存成功');
        this.userInfo = {
          user_id : this.user_id,
          user_phone : this.user_phone,
          user_name : this.user_name,
          user_sain : this.user_sain,
          user_sex : this.user_sex,
          user_birthday : this.user_birthday,
          user_address : this.user_address
        }
        window.localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
      }
    },
    created() {
      this.$store.commit('isShowTabbarHandle',false)
      let storageInfo =  JSON.parse(window.localStorage.getItem("userInfo")) //进入我的界面 验证是否登录
        this.user_phone = storageInfo.user_phone,
        this.user_id = storageInfo.id
        this.user_name = storageInfo.user_name ||'未设置',
        this.user_sain = storageInfo.user_sain ||'未填写个性签名',
        this.user_sex = storageInfo.user_sex ||'男', // 1. 性别
        this.user_birthday = storageInfo.user_birthday ||'未设置',
        this.user_address = storageInfo.user_address ||'未设置'
        console.log(this.user_id)
    },
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.user-detail
    width 100%
    height 100%
    .user-detail-top
      width 100%
      height 60px
      line-height 60px
      padding-left 10px
      font-weight bold
    .user-detail-group
      .user-icon
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          border-radius 50%
      .user-item
        height 40px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border none
          outline none
          text-align right
     
    .right-title-color
      color #999
      font-size 14px
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
    .changeUser
      width 90%
      height 40px
      line-height 40px
      background-color #09f
      text-align center
      margin 20px 5%
      border none
      font-size 16px
      color #fff
      border-radius 10px
</style>
