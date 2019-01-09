import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOPLIST,
  RECOMMEND_SHOPLIST,
  SEARCH_SHOPLIST
} from './mutation-type'

export default {
  isShowTabbarHandle(state,flag){ //控制是否显示tabbar
    state.isShowTabbar = flag
  },
  [HOME_CASUAL] (state, { homecasual }) {
    state.homecasual = homecasual;
  },
  [HOME_NAV] (state, { homenav }) {
    state.homenav = homenav;
  },
  [HOME_SHOPLIST] (state, { homeshoplist }) {
    state.homeshoplist = homeshoplist;
  },
  [RECOMMEND_SHOPLIST] (state, { recommendshoplist }) {
    state.recommendshoplist =  state.recommendshoplist.concat(recommendshoplist) ; //加载拼接vuex数据
  },
  [SEARCH_SHOPLIST] (state, { sreachshoplist }) {
    state.sreachshoplist = sreachshoplist;
  },
}