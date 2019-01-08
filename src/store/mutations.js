import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOPLIST,
  RECOMMEND_SHOPLIST,
  SEARCH_SHOPLIST
} from './mutation-type'

export default {
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
    state.recommendshoplist = recommendshoplist;
  },
  [SEARCH_SHOPLIST] (state, { sreachshoplist }) {
    state.sreachshoplist = sreachshoplist;
  },
}