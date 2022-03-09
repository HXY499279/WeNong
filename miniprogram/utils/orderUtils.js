import {
  WILLPAY,
  WILLDELIVERY,
  WILLRECEIVE,
  ARRIVED,
  RETURNMONEYREQUEST,
  RETURNCOMMODITYREQUEST,
  WILLREFUND,
  REFUNDED,
  WILLEVALUATE,
  EVALUATED,
} from './constant'

export const orderStatusSwitch = (order) => {
  switch (order.status) {
    case WILLPAY:
      order.status = "待付款"
      break;
    case WILLDELIVERY:
      order.status = "待发货"
      break;
    case WILLRECEIVE:
      order.status = "待收货"
      break;
    case REFUNDED:
      order.status = "退款"
      break;
    case ARRIVED:
      order.status = "已到达"
      break;
    case RETURNMONEYREQUEST:
      order.status = "退款申请中"
      break;
    case RETURNCOMMODITYREQUEST:
      order.status = "退货申请中"
      break;
    case WILLREFUND:
      order.status = "待退款"
      break;
    case WILLEVALUATE:
      order.status = "待评价"
      break;
    case EVALUATED:
      order.status = "已评价"
      break;
    default:
      order.status = ""
      break;
  }
}

export const orderSwitch = (order) => {
  switch (order.status) {
    case WILLPAY:
      order.hasCheckLogistics = false
      order.btn1Text = "取消"
      order.bindbtn1 = "cancelOrder"
      order.btn2Text = "付款"
      order.bindbtn2 = "payForOrder"
      order.hasCountDownTime = true
      break;
    case WILLDELIVERY:
      order.hasCheckLogistics = true
      order.btn2Text = "退款申请"
      order.bindbtn2 = "returnMoneyRequest"
      break;
    case WILLRECEIVE:
      order.hasCheckLogistics = true
      order.btn1Text = "退款申请"
      order.bindbtn1 = "returnMoneyRequest"
      break;
    case REFUNDED:
      order.hasCheckLogistics = false
      order.btn1Text = "再来一单"
      order.bindbtn1 = "toCommodity"
      break;
    case ARRIVED:
      order.hasCheckLogistics = true
      order.btn1Text = "退货申请"
      order.bindbtn1 = "returnCommodityRequest"
      order.btn2Text = "完成订单"
      order.bindbtn2 = "finishOrder"
      break;
    case RETURNMONEYREQUEST:
      order.hasCheckLogistics = false
      order.btn1Text = "取消申请"
      order.bindbtn1 = "cancelReturnCommodityRequest"
      break;
    case RETURNCOMMODITYREQUEST:
      order.hasCheckLogistics = false
      order.btn1Text = "取消申请"
      order.bindbtn1 = "cancelReturnCommodityRequest"
      break;
    case WILLREFUND:
      order.hasCheckLogistics = false
      break;
    case WILLEVALUATE:
      order.hasCheckLogistics = false
      order.btn1Text = "再来一单"
      order.bindbtn1 = "toCommodity"
      order.btn2Text = "去评价"
      order.bindbtn2 = "toEvaluate"
      break;
    case EVALUATED:
      order.hasCheckLogistics = false
      order.btn1Text = "再来一单"
      order.bindbtn1 = "toCommodity"
      break;
    default:
      order.hasCheckLogistics = false
      break;
  }
}

