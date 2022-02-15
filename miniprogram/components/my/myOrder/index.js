// components/my/myOrder/index.js
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
        icon: "../../../resources/order-icon/待支付.png",
        title: "待支付"
      },
      {
        icon: "../../../resources/order-icon/待发货.png",
        title: "待发货"
      },
      {
        icon: "../../../resources/order-icon/待收货.png",
        title: "待收货"
      },
      {
        icon: "../../../resources/order-icon/已完成.png",
        title: "已完成"
      },
      {
        icon: "../../../resources/order-icon/退.png",
        title: "退货/退款"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
