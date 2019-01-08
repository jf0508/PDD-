  <template>
    <div class="hotNav" v-if='homenav.length>0'>
      <div class="hot-nav-content">
        <div class="content-inner">
          <div class="inner-item" v-for="(item,index) in homenav" :key="index">
            <img :src="item.iconurl" style='height:60%'>
            <span>{{item.icontitle}}</span>
          </div>
            <!-- 滚动条 -->
            <div class="hotnav-bottom">
              <div class="hot-nav-bottom-item" :style="innerBarStyle"></div>
            </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import {state} from '../../../../store'
  import { mapState } from 'vuex';
  export default {
    name: "HotNav",
    data () {
      return {
        //p屏幕宽度
        screenw:Window.innerWidth||document.documentElement.clientWidth || document.body.clientWidth,
        //滚动内容宽度
        scrollContentWidth:720,
        //滚动条背景长度
        bgBarW:100,
        //滚动条宽度度
        baXwidth:0,
        //触摸起点
        touchStartX:'',
         //触摸终点
        touchEndX:'',
         //触摸移动距离
        touchMoveWidth:'',
      }
    },
    created() {
    },
    mounted() {
      
      this.getBottomWidth()
      //移动端事件监听
      this.bindEvent()
    },

    methods: {
      getBottomWidth(){ //获取滚动条长度
        this.baXwidth = this.bgBarW*(this.screenw / this.scrollContentWidth)
      },
      bindEvent(){
        this.$el.addEventListener('touchstart',this.touchStarthandler,false)
        this.$el.addEventListener('touchmove',this.touchMovehandler,false)
        this.$el.addEventListener('touchend',this.touchEndhandler,false)
      },
      touchStarthandler(e){ //开始触摸
        let touch  = e.touches[0]
        //求出起点
        this.touchStartX =  Number(touch.pageX)
        /*  console.log(this.touchStartX ) */
      }, 
      touchMovehandler(e){ //开始移动
         let touch  = e.touches[0]
         let MoveWidth =  Number(touch.pageX) -  this.touchStartX 
         /* 求出滚动条移动距离 */
         this.touchMoveWidth = - (MoveWidth * (this.bgBarW / this.scrollContentWidth)-this.touchEndX)
         //边界值处理
         if( this.touchMoveWidth<=0){ //左侧
           this.touchMoveWidth = 0
         }else if(this.touchMoveWidth>=this.bgBarW-this.baXwidth){
          this.touchMoveWidth= this.bgBarW-this.baXwidth
         }
      }, 
      touchEndhandler(e){ //结束触摸
        this.touchEndX =   this.touchMoveWidth;
      },
    },
    computed: {
      ...mapState(['homenav']),
      innerBarStyle(){
        return {
          width:`${this.baXwidth}px`,
          left: `${this.touchMoveWidth}px`
        }
      }
    },
  }
  </script>

  <style lang='scss' scoped>
  .hotNav{
    width: 100%;
    height: 160px;
    background: #ffffff;
    position: relative;
    .hot-nav-content{
        width: 100%;
        height: 100%;
        overflow-x:scroll;
        overflow-y: hidden;
         padding-bottom: 15px;
         box-sizing: border-box;
        &::-webkit-scrollbar{
          display: none;
        }
        .content-inner{
          width: 720px;
          height: 160px;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 10px;
          .inner-item{
            width: 90px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 8px 0;
            align-items: center;
            font-size: 14px;
            color: #666666;
             img {
                width: 45%;
                height: 50%;
              }
          }
        }
    }
    .hotnav-bottom{
      width: 100px;
      height: 2px;
      background: #cccccc;
      position: absolute;
      left: 50%;
      bottom: 5px;
      margin-left: -50px;
      .hot-nav-bottom-item{
        position: absolute;
        left: 0;
        height: 100%;
        width: 5px;
        background: red;
      }
    }
  }
  
  </style>
