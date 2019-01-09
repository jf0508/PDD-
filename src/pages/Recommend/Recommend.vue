<template>
    <div class="remcomend-container" v-if="recommendshoplist.length>0">
      <ul class="recommend">
        <!--  
          <li class="recommend-item" v-for="(item,index) in recommendshoplist" :key='index'>
         <img :src="item.thumb_url" alt="" style="width:100%" v-if="item.thumb_url">
          <h4 class="item-title">{{item.short_name}}</h4>
          <div class="tags"></div>
          <div class="item-bottombox">
              <span class="item-price">￥{{item.price/100}}</span>
              <span class="item-sales-tip">{{item.sales_tip}}</span>
              <button>找相关</button>
          </div> 
        </li>
        -->
      <shop-list tag='li' v-for="(item,index) in recommendshoplist" :item=item :key='index'/>
      </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ShopList from '../../components/ShopList/shoplist'
import BScroll from 'better-scroll'
export default {
  name:'Recommend',
  data(){
    return{
      currentPage:'',
      page:1,
      count:10,
    }
  },
  components:{
    ShopList
  },
  
  computed: {
    ...mapState(['recommendshoplist'])
  },
  methods: {
     initScroll(){ //初始化滚动
      this.RecommendScroll = new BScroll('.remcomend-container',{
        probeType:3,
        scrollY:true
      });
       //监听滚动
    this.RecommendScroll.on('touchEnd',(pos)=>{
     /*  console.log(pos) */
      //下拉刷新
      if(pos.y>50){
        console.log('下拉刷新')
      }
      //上拉加载
      let RecommendMaxScroll = this.RecommendScroll.maxScrollY
      if(pos.y<RecommendMaxScroll){
        console.log('上拉加载')
          this.$store.dispatch('reqRecommendShopList',{
          page:this.page,
          count:this.count
        })
      }
      
    })
    this.RecommendScroll.on('scrollEnd',()=>{
       this.RecommendScroll.refresh()
    })
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
  mounted() {
    this.$store.dispatch('reqRecommendShopList',{
      page:this.page,
      count:this.count
    })
  },
}
</script>

<style lang='scss' scoped>  
  .remcomend-container{
    background: #f5f5f5;
    height: 100%;
    width: 100%;
    .recommend{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap; 
      padding: 0 5px;
     /*  li{
        width: 49.5%;
        background: #ffffff;
        padding-bottom: 8px;
        margin-bottom: 10px;
        &:nth-child(2n-1){
          margin-right: 1%;
        }
        .item-title{
          line-height: 20px;
          font-size: 13px;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 5px;
          padding: 0 5px;
        }
        .item-bottombox{
          display: flex;
          align-items: center;
          margin-top: 8px;
          padding: 0 6px;
          .item-price{
            flex: 2;
            font-weight: bold;
            color: red;
            font-size: 12px
          }
          .item-sales-tip{
            flex: 4;
            font-size: 10px;
            transform: scale(0.8);
            color: #666666;
          }
          button{
            flex: 2;
            border:1px solid orange;
            height: 25px;
            font-size: 12px;
            border-radius: 5px;
            color: orangered;
          }
        }
      } */
    }
  }
</style>
