import {
  WILLPAY,
  WILLDELIVERY,
  WILLRECEIVE,
  FINISHED,
  REFUNDED,
  ALLORDERS
} from '../../../../utils/constant'
import httpUtil from '../../../../utils/httpUtil'
import orderStatusSwitch from "../../../../utils/orderStatusSwitch"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: ALLORDERS,
    loading: true,
    // 订单状态
    ALLORDERS,
    WILLPAY,
    WILLDELIVERY,
    WILLRECEIVE,
    FINISHED,
    REFUNDED,
    // 订单数据
    data: {
      allOrders: [],
      willPay: [],
      willDelivery: [],
      willReceive: [],
      finished: [],
      refunded: []
    }
  },

  onChange(event) {
    const active = event.detail.name
    const { data } = this.data
    if (data[active].length) {
      return
    }
    this.setData({ loading: true }, () => {
      httpUtil.getOrderInfo({ query: { status: active } })
        .then(res => {
          const { orders } = res.data
          for (let order of orders) {
            order.status = orderStatusSwitch(order.status)
          }
          data[active] = orders
          this.setData({
            data,
            loading: false
          })
        })
    })

  },

  bindCheckLogistics() {

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { active } = options
    this.setData({
      active
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const { active } = this.data
    console.log(active);
    httpUtil.getOrderInfo({ query: { status: active } })
      .then(res => {
        console.log(res);
        const { orders } = res.data
        const { data } = this.data
        data[active] = orders
        this.setData({
          data
        })
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})