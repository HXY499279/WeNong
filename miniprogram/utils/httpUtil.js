import httpReq from './httpReq'

class HttpUtil {
  // 登录模块
  wxLogin = (params) => httpReq('Login', "wxLogin", params)
  checkLogin = (params) => httpReq('Login', "checkLogin", params, true)

  // 用户模块
  getUserInfo = (params) => httpReq('User', "getUserInfo", params, true)
  changeUserInfo = (params) => httpReq('User', "changeUserInfo", params, true)
  getUserLikeShop = (params) => httpReq('User', "getUserLikeShop", params, true)
  getUserLikeCommodity = (params) => httpReq('User', "getUserLikeCommodity", params, true)

  // 商家模块
  applyForMerchant = (params) => httpReq('Merchant', "applyForMerchant", params, true)
  getMerchantInfo = (params) => httpReq('Merchant', "getMerchantInfo", params, true)
  changeMerchantInfo = (params) => httpReq('Merchant', "changeMerchantInfo", params, true)
  deleteMerchant = (params) => httpReq('Merchant', "deleteMerchant", params, true)

  // 分类模块
  getCategoryInfo = (params) => httpReq('Category', "getCategoryInfo", params)
  // 商品模块
  getCommodityInfo = (params) => httpReq('Commodity', "getCommodityInfo", params)

  // 地址模块 
  getAddressInfo = (params) => httpReq('Address', "getAddressInfo", params, true)
  changeAddressInfo = (params) => httpReq('Address', "changeAddressInfo", params, true)
  deleteAddress = (params) => httpReq('Address', "deleteAddress", params, true)
  addAddress = (params) => httpReq('Address', "addAddress", params, true)

  // 购物车模块 
  getCartInfo = (params) => httpReq('Cart', "getCartInfo", params, true)
  changeCartInfo = (params) => httpReq('Cart', "changeCartInfo", params, true)
  deleteCart = (params) => httpReq('Cart', "deleteCart", params, true)
  addCart = (params) => httpReq('Cart', "addCart", params, true)

  // 搜索历史模块
  getSearchHistoryInfo = (params) => httpReq('SearchHistory', "getSearchHistoryInfo", params, true)
  addSearchHistory = (params) => httpReq('SearchHistory', "addSearchHistory", params, true)
  deleteSearchHistory = (params) => httpReq('SearchHistory', "deleteSearchHistory", params, true)

  // 资讯模块
  getInfo = (params) => httpReq('Info', "getInfo", params)

  // 果苗模块 
  getFruitPlantInfo = (params) => httpReq('FruitPlant', "getFruitPlantInfo", params)
  changeFruitPlantInfo = (params) => httpReq('FruitPlant', "changeFruitPlantInfo", params, true)
  deleteFruitPlant = (params) => httpReq('FruitPlant', "deleteFruitPlant", params, true)
  addFruitPlant = (params) => httpReq('FruitPlant', "addFruitPlant", params, true)

  // 订单模块 
  getOrderInfo = (params) => httpReq('Order', "getOrderInfo", params, true)
  changeOrderInfo = (params) => httpReq('Order', "changeOrderInfo", params, true)
  deleteOrder = (params) => httpReq('Order', "deleteOrder", params, true)
  addOrder = (params) => httpReq('Order', "addOrder", params, true)

}

const httpUtil = new HttpUtil()

export default httpUtil