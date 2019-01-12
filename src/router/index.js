import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'//默认路径
    },
    {
      name:'Home',
      path: '/home',
      component: resolve=>require(['@/pages/Home/Home.vue'],resolve),
      children:[
        {
          name:'Hot',
          path: 'hot',
          component: resolve=>require(['@/pages/Home/Children/Hot/Hot.vue'],resolve),
          meta:{isShowTabbar:true}
        },{
          name:'Department',
          path: 'department',
          component: resolve=>require(['@/pages/Home/Children/Department.vue'],resolve)
        },{
          name:'Dianqi',
          path: 'dianqi',
          component: resolve=>require(['@/pages/Home/Children/Dianqi.vue'],resolve)
        },{
          name:'Dres',
          path: 'dres',
          component: resolve=>require(['@/pages/Home/Children/Dres.vue'],resolve)
        },{
          name:'Muyin',
          path: 'muyin',
          component: resolve=>require(['@/pages/Home/Children/muyin.vue'],resolve)
        }, {
          name:'Nanzhuang',
          path: 'nanzhuang',
          component: resolve=>require(['@/pages/Home/Children/Nanzhuang.vue'],resolve)
        },{
          name:'Phone',
          path: 'phone',
          component: resolve=>require(['@/pages/Home/Children/Phone.vue'],resolve)
        },{
          name:'Shoebag',
          path: 'shoebag',
          component: resolve=>require(['@/pages/Home/Children/Shoebag.vue'],resolve)
        }, {
          path:'/home',
          redirect:'/home/hot'
        }
      ]
    },{
      name:'Recommend',
      path: '/recommend',
      component:resolve=>require(['@/pages/Recommend/Recommend.vue'],resolve),
      meta:{isShowTabbar:true}
    },{
      name:'Search',
      path: '/search',
      component:resolve=>require(['@/pages/Search/Search.vue'],resolve),
      meta:{isShowTabbar:true}
    },{
      name:'Cart',
      path: '/cart',
      component:resolve=>require(['@/pages/Cart/Cart.vue'],resolve),
      meta:{isShowTabbar:true}
    },{
      name:'Mine',
      path: '/mine',
      component:resolve=>require(['@/pages/Mine/Mine.vue'],resolve),
      meta:{isShowTabbar:true}
    },{
      name:'Login',
      path: '/login',
      component:resolve=>require(['@/pages/Login/Login.vue'],resolve)
    },{
      name:'Setting',
      path: '/setting',
      component:resolve=>require(['@/pages/Mine/MineSetting.vue'],resolve)
    }
    ,{
      name:'Medetail',
      path: '/medetail',
      component:resolve=>require(['@/pages/Mine/MeDetail.vue'],resolve)
    }
  ]
})
