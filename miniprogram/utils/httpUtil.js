import httpReq from './httpReq'

class HttpUtil {
  // 登录模块
  wxLogin = (params) => httpReq('Login', "wxLogin", params)
  checkLogin = (params) => httpReq('Login', "checkLogin", params, true)
  // 用户模块
  getUserInfo = (params) => httpReq('User', "getUserInfo", params, true)
  changeUserInfo = (params) => httpReq('User', "changeUserInfo", params, true)
  // 商家模块
  applyForMerchant = (params) => httpReq('Merchant', "applyForMerchant", params, true)
  getMerchantInfo = (params) => httpReq('Merchant', "getMerchantInfo", params, true)
  changeMerchantInfo = (params) => httpReq('Merchant', "changeMerchantInfo", params, true)
  deleteMerchant = (params) => httpReq('Merchant', "deleteMerchant", params, true)
  
}

const httpUtil = new HttpUtil()

export default httpUtil