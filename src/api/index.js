import http from './ajax'

//首页轮播图
export const getHomeCasual = () => http.get("/api/homecasual");
//首页导航
export const getHomeNav = () => http.get("/api/homenav");
//首页 首页拼单列表
export const getHomeShopList = () => http.get("/api/homeshoplist");

//推荐商品列表
export const getRecommendShopList = (parms) => http.get("/api/recommendshoplist",parms);

//搜索 商品列表
export const getSearchShopList = () => http.get("/api/searchgoods");

//获取短信验证码
export const getPhoneCode = (phone) => http.get("/api/phone_code",phone);

//短信验证码登录
export const PhoneCodeLogin = (parms) => http.post("/api/login_code",parms);    

//用户名密码登录
export const UserPwdLogin = (parms) => http.post("/api/login_pwd",parms); 

//获取登录用户信息
export const getUserInfo = () => http.get("/api/user_info");

//修改用户信息
export const ChangeUserInfo = (parms) => http.post("/api/change_user",parms); 

//加入购物车
export const AddShopCart = (parms) => http.post("/api/add_shop_cart",parms);   

//获取购物车商品
export const  GetCardProds= (parms) => http.get("/api/cart_goods",parms);