import {
  WILLPAY,
  WILLDELIVERY,
  WILLRECEIVE,
  ARRIVED,
  FINISHED,
  RETURNREQUEST,
  WILLREFUND,
  REFUNDED,
  WILLEVALUATE,
  EVALUATED,
} from './constant'

const orderStatusSwitch = (status) => {
  switch (status) {
    case WILLPAY:
      return "待付款"
    case WILLDELIVERY:
      return "待发货"
    case WILLRECEIVE:
      return "待收货"
    case FINISHED:
      return "已完成"
    case REFUNDED:
      return "退款"
    case ARRIVED:
      return "已到达"
    case RETURNREQUEST:
      return "退款申请中"
    case WILLREFUND:
      return "待退款"
    case WILLEVALUATE:
      return "待评价"
    case EVALUATED:
      return "已评价"
    default:
      return ""
  }
}

export default orderStatusSwitch