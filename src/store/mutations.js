import Vue from 'vue'
import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOPLIST,
  RECOMMEND_SHOPLIST,
  SEARCH_SHOPLIST,
  GET_USERINFO,
  GET_CARDGOODS
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
  //购物车信息
  [GET_CARDGOODS] (state, { cardprods }) {
    state.cardprods = cardprods;
  },
  //用户信息同步
  userInfohandler(state,users){
    state.userInfo = users;
  },
  //购物车加减数量
  changeCardProds(state,isAdd,cardprods){
    if(isAdd ===true){
      state.cardprods.buy_count++
    }else{
      if(state.cardprods.buy_count<=0){
        return
      }else{
        state.cardprods.buy_count--
      }
    }
  },
  //删除
  reomveProds(state,item){  
    const index = state.cardprods.indexOf(item)
    console.log(index)
    state.cardprods.splice(index, 1)
  },
  //单选
  selectProds(state,item){
    if(item.checked){
      item.checked=!item.checked
    }else{
      Vue.set(item,"checked",true)
      console.log('不存在checked')
    }
  },
  //全选
  selectAll(state,isSelectAll){
    state.cardprods.forEach((item,index)=>{
      if(item.checked){
        item.checked = !isSelectAll
      }else{
        Vue.set(item,"checked",!isSelectAll)
      }
    })
  },
  //已经登录过得用户信息同步
  [GET_USERINFO](state,{uesrInfo}){
    state.userInfo = uesrInfo;
  }
}