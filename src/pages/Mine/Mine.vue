<template>
    <div class="mine"> 
      <div>
        <select-login v-if='!userInfos'/>
        <div>
          <mine-top v-if='userInfos' :userInfos='userInfos.user_name'/>
          <h1 class='MineRecom'>精选推荐</h1>
        </div>
        <ul class="recommend">
          <shop-list tag='li' v-for="(item,index) in recommendshoplist" :item=item :key='index' :cellClick='addCart'/>
        </ul>
      </div>
    </div>
</template>

<script>
import MineTop from './MineTop'
import SelectLogin from '../Login/SelectLogin'
import {mapState} from 'vuex'
import ShopList from '../../components/ShopList/shoplist'
import BScroll from 'better-scroll'
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
    MineTop,
    ShopList
  },
  created() {
    this.userInfos = JSON.parse(window.localStorage.getItem("userInfo")) //进入我的界面 验证是否登录
     this.$store.commit('isShowTabbarHandle',true) // 显示tabbar
      this.$store.dispatch('reqRecommendShopList',{
          page:this.page,
          count:this.count
        })
  },
  computed: {
    ...mapState(['userInfo','recommendshoplist'])
  },
  methods: {
     async addCart(props){
        const res = await AddShopCart({
        goods_id : props.goods_id,
        goods_name : props.goods_name,
        thumb_url : props.thumb_url,
        price : props.price,
        //is_pay : // 0 未购买 1购买
        });
   },
    initScroll(){ //初始化滚动
        this.RecommendScroll = new BScroll('.mine',{
          probeType:3,
          scrollY:true,
          click:true
        });
    },
  },
  watch: {
    recommendshoplist(){  //异步监听组件方法1；
      this.$nextTick(()=>{
        this.initScroll();
        this.page+=1
      })
    }
  },
}
</script>

<style lang='scss' scoped>  
  .mine{
    background: #f5f5f5;
    height: 100%;
    .MineRecom{
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .recommend{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap; 
      padding: 0 5px;
    }
  
  }
</style>
