<template>
    <div class="mine"> 
      <select-login/>
    </div>
</template>

<script>
import SelectLogin from '../Login/SelectLogin'
export default {
  name:'Mine',
  components:{
    SelectLogin
  }
}
</script>

<style lang='scss' scoped>  
  .mine{
    background: #f5f5f5;
    height: 100%;
  }
</style>
