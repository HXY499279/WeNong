import checkLogin from '../../../../utils/checkLogin'
import {
  WILLPAY,
  WILLDELIVERY,
  WILLRECEIVE,
  FINISHED,
  REFUNDED,
  ALLORDERS
} from '../../../../utils/constant'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    orderItems: [
      {
        icon: "../../../../resources/order-icon/待支付.png",
        title: "待支付",
        bindtap: "toWillPay"
      },
      {
        icon: "../../../../resources/order-icon/待发货.png",
        title: "待发货",
        bindtap: "toWillDelivery"
      },
      {
        icon: "../../../../resources/order-icon/待收货.png",
        title: "待收货",
        bindtap: "toWillRecieve"
      },
      {
        icon: "../../../../resources/order-icon/已完成.png",
        title: "已完成",
        bindtap: "toFinish"
      },
      {
        icon: "../../../../resources/order-icon/退.png",
        title: "退货/退款",
        bindtap: "toRefund"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 全部订单
    toAllOrders() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: `/pages/person/pages/myOrder/index?active=${ALLORDERS}`,
          })
        })
    },
    // 待支付
    toWillPay() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: `/pages/person/pages/myOrder/index?active=${WILLPAY}`,
          })
        })
    },
    // 待发货
    toWillDelivery() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: `/pages/person/pages/myOrder/index?active=${WILLDELIVERY}`,
          })
        })
    },
    // 待收货
    toWillRecieve() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: `/pages/person/pages/myOrder/index?active=${WILLRECEIVE}`,
          })
        })
    },
    // 已完成
    toFinish() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: `/pages/person/pages/myOrder/index?active=${FINISHED}`,
          })
        })
    },
    // 退货退款
    toRefund() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: `/pages/person/pages/myOrder/index?active=${REFUNDED}`,
          })
        })
    },
  }
})
