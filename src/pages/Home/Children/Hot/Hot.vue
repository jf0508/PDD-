  <template>
    <div class="hot">
      <div>
     <!--   轮播图 -->
          <div class="swiper-container" v-if='homecasual.length>0' cancelable='true'>
            <div class="swiper-wrapper" >
              <div class="swiper-slide" v-for="(item,index) in homecasual" :key="index">
              <img data-index="8" data-banner_id="11884" data-gg_id="0" v-lazy="item.imgurl">
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
          </div>
        <!-- 标签导航 -->
          <hot-nav></hot-nav>
          <!-- 广告位 -->
          <div class="hot-ad">
            <img src="../../../../assets/imgs/home/hot_ad/home_ad.gif">
          </div>
          <Hot-shop-list></Hot-shop-list>
        </div>
    </div>
  </template>

  <script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HotNav from './HotNav.vue'
  import HotShopList from './HotShopList.vue'
  import { mapState } from 'vuex';
  import BScroll from 'better-scroll'

  export default {
    name: 'Hot',
    components:{
      HotNav,
      HotShopList
    },
    created() {},
    computed: {
     ...mapState(['homecasual'])
    },
    mounted() {
       // 1. 请求轮播图的数据
      this.$store.dispatch('reqHomeCasual');
      //获取导航数据
      this.$store.dispatch('reqHomeNav');
      //获取首页商品数据
      this.$store.dispatch('reqHomeShopList');
     
    },
    methods: {
       initScroll(){
      let initScroll = new BScroll('.hot', {})
    }
    },
    watch: {
      homecasual(){
        this.$nextTick(()=>{  //通过监听Homecasual变化后 才创建swiper实例
            var mySwiper = new Swiper ('.swiper-container', {
            autoplay:true,
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          }) 
        })
         this.initScroll();
      },
     
    },
  }
  </script>

  <style lang='scss' scoped>
  .hot {
    height: 100%;
    background: #f5f5f5;
    .swiper-container {
       width: 100%;
      height: 140px;
      img{
        width: 100%;
        height: 100%;
      }
  }
  .hot-ad{
    background: #ffffff;
    width: 100%;
    margin:8px 0;
    img{
      width: 100%;
      padding: 5px;
    }
  }
  }
  </style>
