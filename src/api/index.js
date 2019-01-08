import http from './ajax'

//首页轮播图
export const getHomeCasual = () => http.get("/api/homecasual");
//首页导航
export const getHomeNav = () => http.get("/api/homenav");
//首页 首页拼单列表
export const getHomeShopList = () => http.get("/api/homeshoplist");
//推荐商品列表
export const getRecommendShopList = () => http.get("/api/recommendshoplist");

//搜索 商品列表
export const getSearchShopList = () => http.get("/api/searchgoods");