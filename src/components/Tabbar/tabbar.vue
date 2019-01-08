    <template>
      <ul class="tabbarBox">
        <router-link to='/'>
          <li :class="{active:$route.fullPath.includes('/home')}">
            <i class="iconfont icon-shouye1"></i>
            <span>首页</span>
          </li>
        </router-link>
        <router-link to='/recommend'>
          <li :class="{active:$route.fullPath.includes('/recommend')}">
            <i
              class="iconfont icon-tuijian"
              style="font-size:28px"
            ></i>
            <span>推荐</span>
          </li>
        </router-link>
        <router-link to='/search'>
          <li :class="{active:$route.fullPath.includes('/search')}">
            <i class="iconfont icon-sousuo "> </i>
            <span>搜索</span>
          </li>
        </router-link>
        <router-link to='/chat'>
          <li :class="{active:$route.fullPath.includes('/chat')}">
            <i class="iconfont icon-liaotian"> </i>
            <span>聊天</span>
          </li>
        </router-link>
        <router-link to='/mine'>
          <li :class="{active:$route.fullPath.includes('/mine')}">
            <i class="iconfont icon-icon7"></i>
            <span>我的</span>
          </li>
        </router-link>

      </ul>
    </template>

    <script>
    /* import '../../assets/icon.css' */
    export default {
      name: 'tabbar'
    }
    methods: {

    }
    </script>

    <style lang='scss' scoped>
    .tabbarBox {
      background: #ffffff;
      width: 100%;
      height: 55px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #f1f1f1;
      li {
        height: 55px;
        color: #666;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .iconfont {
          font-size: 24px;
        }
      }
    }
    .active{
      color: #f00 !important; 
    }
    </style>
