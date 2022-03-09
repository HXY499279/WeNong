// 订单模块
export const ALLORDERS = "allOrders"
// tabs页面的综合状态
export const FINISHED = "finished" // 已完成
export const RETURN = "return" // 退货退款
// 订单10个状态
export const WILLPAY = "willPay"
export const WILLDELIVERY = "willDelivery"
export const WILLRECEIVE = "willReceive"
export const ARRIVED = "arrived"
export const RETURNMONEYREQUEST = "returnMoneyRequest"
export const RETURNCOMMODITYREQUEST = "returnCommodityRequest"
export const WILLREFUND = "willRefund"
export const REFUNDED = "refunded"
export const WILLEVALUATE = "willEvaluate"
export const EVALUATED = "evaluated"

// 待支付订单过期时间 单位s
export const WILLPAY_ORDER_MAX_TIME = 20