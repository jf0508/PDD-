<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img
            src="./imgs/login.png"
            alt=""
            width="250"
          >
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a
            href="javascript:;"
            :class="{current: loginMode}"
            @click="dealLoginMode(true)"
          >验证码登录</a>
          <a
            href="javascript:;"
            :class="{current: !loginMode}"
            @click="dealLoginMode(false)"
          >密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current: loginMode}">
            <section class="login-message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              >
              <button
                v-if="!countDown"
                class="get-verification"
                :class="{phone_right: phoneRight}"
                @click.prevent="getVerifyCode()"
              >
                获取验证码
              </button>
              <button
                v-else
                disabled="disabled"
                class="get-verification"
              >
                已发送({{countDown}}s)
              </button>
            </section>
            <section class="login-verification">
              <input
                type="tel"
                maxlength="6"
                placeholder="验证码"
                v-model="code"
              >
            </section>
            <section class="login-hint">
              温馨提示：未注册拼多多帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="用户名/手机/邮箱"
                  v-model="user_name"
                >
              </section>
              <section class="login-verification">
                <!-- 铭文密码 -->
                <input
                  type="password"
                  maxlength="18"
                  placeholder="密码"
                  v-if="pwdMode"
                  v-model="pwd"
                >
                <!-- 暗文密码 -->
                <input
                  type="text"
                  maxlength="18"
                  placeholder="密码"
                  v-else
                  v-model="pwd"
                >
                <div class="switch-show">
                    <img @click.prevent="dealPwdMode(false)" :class="{on:pwdMode}" src="./imgs/hide_pwd.png"
                       width="20">
                    <img @click.prevent="dealPwdMode(true)" :class="{on:!pwdMode}" src="./imgs/show_pwd.png"
                       width="20">
                </div>
              </section>
              <section class="login-message">
                <input
                  type="text"
                  maxlength="4"
                  placeholder="验证码"
                  v-model="captcha"
                >
                <img
                  ref="captcha"
                  class="get-verification"
                  src="http://10.211.55.6:3000/api/captcha"
                  alt="captcha"
                  @click.prevent="getCaptcha()"
                >
              </section>
            </section>
          </div>
          <button
            class="login-submit"
            @click.prevent="login()"
          >登录</button>
        </form>
        <button
          class="login-back"
          @click="$router.back()"
        >返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import vuex from 'vuex'
import Axios from 'axios';
import {getPhoneCode,PhoneCodeLogin,UserPwdLogin,getUserInfo} from '../../api/index.js'
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      loginMode: true, // 登录方式, true 验证码登录 false 账号登录
      phone: '', // 手机号码
      countDown: 0, // 倒计时
      pwdMode: true, // 密码的显示方式 true 密文 false 明文
      pwd: '', // 密码
      code: '', // 验证码
      userInfo: {}, // 用户的信息
      user_name: '', // 用户名
      captcha: '',  // 图形验证码
    }
  },
  created () {
    this.$store.commit('isShowTabbarHandle', false) //隐藏tabbar
  },
  methods: {
    //登录方法
    dealLoginMode (flag) {
      this.loginMode = flag
    },
    async getVerifyCode(){
      if(this.phoneRight){
      //验证码倒计时
      if(this.phoneRight){
        this.countDown = 60
        this.ineterVal = setInterval(() => {
          this.countDown --
          if(this.countDown == 0){
            clearInterval( this.ineterVal)
          }
        }, 1000);
      }
      let instance=Toast({
          message: '发送成功',
          iconClass:'iconfont icon-duigou'
        });
      await getPhoneCode({phone:this.phone}).then(res=>{
        console.log(res)
        this.Regcode = res.message
        instance.close();
      });
       }else{ return}
    },
    //密码显示方式
    dealPwdMode(flag){
      this.pwdMode = flag;
    },
    //更换验证码
    getCaptcha(){  
        this.$refs.captcha.src = 'http://10.211.55.6:3000/api/captcha?time='+new Date();
    },
    async login(){
      if(this.loginMode){ //验证码登录
         console.log('验证码登录')
         if(!this.phone){ //未输入
           Toast('请输入手机号')
           return
         }else if(!this.phoneRight){ //乱输入
           Toast('请输入正确的手机号')
           return
         }

         if(!this.code){
            Toast('请输入验证码')
           return
         }else if(!(/^\d{6}$/gi.test(this.code))){
            Toast('验证码格式错误')
            return
         }else if(this.code !=this.Regcode){
           Toast('验证码错误')
            return
         }

        //登录后台校验
      const result =  await PhoneCodeLogin({phone:this.phone,code:this.code})
       console.log('短信前台登录成功-进入后台校验',result) 
       if(result.code === 200){ //登录成功
         this.userInfo = result.message
         window.localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
         this.$store.commit('userInfohandler',this.userInfo)
         this.$router.back();
       }else{ //登录失败
         Toast('手机号或者验证码错误')
       }

      }else{ //密码登录
         console.log('密码登录')
          if(!this.user_name){ //未输入
           Toast('请输入用户名/手机号/邮箱')
           return
         }else if(!this.pwd){ //乱输入
           Toast('请输入密码')
           return
         }else if(!this.captcha){ //未输入验证码
           Toast('请输入验证码')
           return
         }
         console.log(this.captcha)
         //用户名密码登录
          //登录后台校验
      const result =  await UserPwdLogin({
        user_name:this.user_name,
        pwd:this.pwd,
        captcha:this.captcha
      })
       console.log('前台密码登录成功-进入后台校验',result) 
       if(result.code === 200){ //登录成功
         this.userInfo = result.message
         this.$store.commit('userInfohandler',this.userInfo)
         this.$router.back();
       }else{ //登录失败
         Toast('手机号或者密码错误')
       }


      }
    }
  },
  computed: {
    phoneRight(){ //验证手机号
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
    }
  },
}
</script>

<style lang='scss' scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #fff;
  .login-inner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
    .login-logo {
      width: 300px;
      height: 80px;
      text-align: center;
      img{
        height: 100%;
      }
    }
    .login-header-title {
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 60px;
      padding: 0 20%;
      >a{
        color: #333;
        width: 180px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        font-size: 14px;
        padding-bottom: 4px;
        &:first-child {
        margin-right: 40px;
      }
      &.current {
        color: rgb(238, 30, 41);
        font-weight: 700;
        border-bottom: 2px solid rgb(238, 30, 41);
      }
      }
      
    }
    .login-content {
      & > form {
        & > div {
          display: none;
          &.current {
            display: block;
          }
          input {
            width: 100%;
            height: 100%;
            padding-left: 8px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;
            &:focus {
              border: 1px solid rgb(238, 30, 41);;
            }
          }
          .login-message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            .get-verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
              &.phone_right {
                color: rgb(238, 30, 41);;
              }
            }
          }
          .login-verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            .switch-show {
              position: absolute;
              right: 10px;
              top: 12px;
            }
            img {
              display: none;
            }
            img.on {
              display: block;
            }
          }
          .login-hint {
            margin-top: 12px;
            color: #999;
            font-size: 12px;
            line-height: 20px;
            & > a {
              color: rgb(238, 30, 41);;
            }
          }
        }
        .login-submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: rgb(238, 30, 41);;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }
      .login-back {
        display: block;
        width: 100%;
        height: 42px;
        margin-top: 15px;
        border-radius: 4px;
        background: transparent;
        border: 1px solid rgb(241, 22, 187);
        color: rgb(238, 30, 41);
        text-align: center;
        font-size: 16px;
        line-height: 42px;
      }
    }
  }
}
</style>
