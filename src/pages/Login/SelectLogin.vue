<template>
  <div class="selectLogin">
     <img src="./imgs/login.png">
     <h4>选择登录方式</h4>
     <button @click="$router.push('/login')">手机号登录</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped> 
  .selectLogin{
    position: fixed;
    background: #f5f5f5;
    width: 100%;
    height: 100%;
    z-index: 99;
    display: flex;
    align-items: center;
    flex-direction: column;
    img{
      width: 160px;
      height: 60px;
      margin-top: 40%;
    }
    h4{
      width: 100%;
      text-align: center;
      line-height: 80px;
      font-size: 20px;
    }
    button{
      width: 90%;
      height: 50px;
      background: #df3c3c;
      border-radius: 5px;
      color: #f5f5f5;
      font-size: 18px;
    }
  }
</style>
