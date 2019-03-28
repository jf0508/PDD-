<template>
  <div class="serachBox">
    <transition name="slide-fade">
       <SearchPanel v-if='isSearchShow' :isShow='isShow'/>
    </transition>   
    <search-nav :isShow='isShow'/>
    <div class="shopContainer">
      <div class="search-left">
        <ul class="content">
          <li
            v-for='(item,index) in sreachshoplist'
            :key='index'
            :class="{current: index === currentIndex}"
            @click="clickLeft(index)"
            ref='menuList'
          >{{item.name}}</li>
        </ul>
      </div>

      <div class="search-right">
        <ul ref='shopParents'>
          <li
            class="shop-li"
            v-for='(prod,index1) in sreachshoplist'
            :key='index1'
          >
            <div class="shops-title">
              <h4>{{prod.name}}</h4>
              <a href=""> 查看更多></a>
            </div>
            <ul class="phoneType" v-if="prod.tag == 'phone'">
              <li v-for="(phone,index) in prod.category" :key="index">
                <img :src="phone.icon">
              </li>
            </ul>
            <ul class='shops-item'>
              <li
                v-for="(itemspic,index2) in prod.items"
                :key="index2"
              >
                <img :src="itemspic.icon">
                <span>{{itemspic.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SearchNav from './Children/SearchNav'
import SearchPanel from './Children/SearchPanel'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'

export default {
  name: 'Search',
  data () {
    return {
      scrollY:'', //滚动垂直位置
      RightTops:[],  //右侧商品坐标
      isSearchShow:false
    }
  },
  components: {
    SearchNav,
    SearchPanel
  },
  computed: {
    ...mapState(['sreachshoplist']),
    //动态决定左侧选中类
    currentIndex(){
      const {scrollY,RightTops} = this //结构赋值
      return RightTops.findIndex((LiTop,index)=>{
        this._leftScroll(index);
        return scrollY >= LiTop && scrollY <= RightTops[index+1]
      })
    }
  },
  watch: {
    sreachshoplist () {
      this.$nextTick(() => {
        this.initScroll();
        this.initTightTops();
        /* console.log(this.RightTops) */
      })
    }
  },
  methods: {
    isShow(flag){
      this.isSearchShow = flag
    },
    initScroll(){
      this.Leftscroll = new BScroll('.search-left', {click: true,probeType:3 })
      this.Rightscroll = new BScroll('.search-right', {
        click: true, //允许点击事件
        probeType:3  //监听滚动
      }) //全局赋值
      this.Rightscroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(pos.y) //取绝对值
      })
    },
    //右侧板块头部位置
    initTightTops(){
      let tempArr = []; //临时数组
      let tempTop = 0; //临时高度
      tempArr.push(tempTop);
      //遍历Li标签
      let alllis = this.$refs.shopParents.getElementsByClassName('shop-li')
      Array.prototype.slice.call(alllis).forEach(li=>{
          tempTop += li.clientHeight
          tempArr.push(tempTop);
      })
       this.RightTops = tempArr;
    },
    //左侧点击
    clickLeft(index){
      this.scrollY = this.RightTops[index] //点击切换位置
      this.Rightscroll.scrollTo(0,-this.scrollY,300) //动画时长300ms
    },
    //右侧联动
    _leftScroll(index){
        let menulsits = this.$refs.menuList
        let el = menulsits[index] //左侧当前Li标签滚动位置
        this.Leftscroll.scrollToElement(el,300,0,-100)
    }
  },
  created() {
     this.$store.commit('isShowTabbarHandle',true) // 显示tabbar
  },
  mounted () {
    //获取搜索列表
    this.$store.dispatch('reqSearchShopList',()=>{  //异步监听组件方法2；
      this.initScroll();
    })
  },
}
</script>

<style lang='scss' scoped>
.serachBox {
  background: #f5f5f5;
  height: 100%;
  display: flex;
  flex-direction: column;
  .shopContainer {
    flex: 1;
    overflow: hidden;
    display: flex;
    .search-left {
      width: 25%;
      height: 100%;
      overflow: hidden;
      li {
        width: 100%;
        height: 40px;
        background: #fafafa;
        padding: 5px 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 14px;
      }
      .current {
        color: #e02024;
        background: #ffffff;
        &::after {
          content: "";
          width: 4px;
          height: 25px;
          background: #e02024;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
    .search-right {
      width: 75%;
      height: 100%;
      overflow: hidden;
      background: #ffffff;
      .shops-title {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        color: #666666;
        font-size: 15px;
        a {
          color: #cccccc;
          font-size: 14px;
        }
      }
      .phoneType{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #f1f1f1;
        li{
          width: 33.3%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
          img{
            width: 70%;
          }
        }
      }
      .shops-item {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 32%;
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 1%;
          margin-bottom: 5px;
          justify-content: center;
          img {
            width: 60%;
            height: 60%;
            margin-bottom: 5px;
          }
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
