import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecommendShopList,
  getSearchShopList,
  GetCardProds,
  getUserInfo
} from '../api'
import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOPLIST,
  RECOMMEND_SHOPLIST,
  RECOMMEND_SHOPLISTS,
  SEARCH_SHOPLIST,
  GET_CARDGOODS,
  GET_USERINFO
} from './mutation-type'

export default {
  async reqHomeCasual({commit}) {//首页轮播图
    const result = await getHomeCasual();
    commit(HOME_CASUAL, {homecasual: result.data})
  },

  async reqHomeNav({commit}){  //首页导航
    const res = await getHomeNav();
    commit(HOME_NAV,{homenav:res.message.data})
  },

  async reqHomeShopList({commit},parms,callback){  //首页商品
    const res = await getHomeShopList(parms);
    commit(HOME_SHOPLIST,{homeshoplist:res.message.goods_list})
    callback && callback();
  },
  async reqRecommendShopList({commit},parms,callback){  //推荐列表商品
    const res = await getRecommendShopList(parms);
    commit(RECOMMEND_SHOPLIST,{recommendshoplist:res.data})
    callback && callback();
  },
  async reqRecommendShopLists({commit},parms,callback){  //下拉刷新推荐列表商品
    const res = await getRecommendShopList(parms);
    if(res.data.length>0){
      commit(RECOMMEND_SHOPLISTS,{recommendshoplist:res.data})
    }else{
      return
    }
    
    callback && callback();
  },

  async reqSearchShopList({commit},callback){  //搜索页列表
    const res = await getSearchShopList();
    commit(SEARCH_SHOPLIST,{sreachshoplist:res.message.data})
    callback && callback();
  },

  async reqGetCardProds({commit},callback){  //获取购物车商品
    const res = await GetCardProds();
    commit(GET_CARDGOODS,{cardprods:res.message})
    callback && callback();
  },
    //获取已经登录的用户信息
  /* async reqUserInfo({commit}){
    const res = await getUserInfo();
    console.log(res)
    if(res.success_code === 200){
      commit([GET_USERINFO],{uesrInfo:res.message})
    }
  } */
}