import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecommendShopList,
  getSearchShopList
} from '../api'
import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOPLIST,
  RECOMMEND_SHOPLIST,
  SEARCH_SHOPLIST
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

  async reqHomeShopList({commit},callback){  //首页商品
    const res = await getHomeShopList();
    commit(HOME_SHOPLIST,{homeshoplist:res.message.goods_list})
    callback && callback();
  },
  async reqRecommendShopList({commit},callback){  //推荐列表商品
    const res = await getRecommendShopList();
    commit(RECOMMEND_SHOPLIST,{recommendshoplist:res.message.data})
    callback && callback();
  },

  async reqSearchShopList({commit},callback){  //搜索页列表
    const res = await getSearchShopList();
    commit(SEARCH_SHOPLIST,{sreachshoplist:res.message.data})
    callback && callback();
  }

  
}