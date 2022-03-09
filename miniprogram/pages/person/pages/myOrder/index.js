import {
  WILLPAY,
  WILLDELIVERY,
  WILLRECEIVE,
  REFUNDED,
  ALLORDERS,
  FINISHED,
  RETURN,
  ARRIVED,
  RETURNMONEYREQUEST,
  RETURNCOMMODITYREQUEST,
  WILLREFUND,
  WILLEVALUATE,
  EVALUATED,
} from '../../../../utils/constant'
import httpUtil from '../../../../utils/httpUtil'
import { orderStatusSwitch, orderSwitch } from "../../../../utils/orderUtils"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstShow: true,
    active: ALLORDERS,
    loading: true,
    // 订单状态
    ALLORDERS,
    WILLPAY,
    WILLDELIVERY,
    WILLRECEIVE,
    REFUNDED,
    ARRIVED,
    FINISHED,
    RETURN,
    RETURNMONEYREQUEST,
    RETURNCOMMODITYREQUEST,
    WILLREFUND,
    WILLEVALUATE,
    EVALUATED,
    // 订单数据
    pageData: [
      // 全部订单
      {
        name: ALLORDERS,
        title: "全部订单",
      },
      {
        name: WILLPAY,
        title: "待支付",
      },
      {
        name: WILLDELIVERY,
        title: "待发货",
      },
      {
        name: WILLRECEIVE,
        title: "待收货",
      },
      {
        name: FINISHED,
        title: "已完成",
      },
      {
        name: RETURN,
        title: "退货退款",
      }
    ],
    data: {
      allOrders: null,
      willPay: null,
      willDelivery: null,
      willReceive: null,
      finished: null,
      return: null
    }
  },

  onChange(event) {
    const { firstShow } = this.data
    if (firstShow) return
    const active = event.detail.name
    const { data } = this.data
    if (data[active]) {
      this.setData({
        loading: false
      })
      return
    }
    this.setData({ loading: true }, () => {
      httpUtil.getOrderInfo({ query: { status: active, skip: 0, limit: 5 } })
        .then(res => {
          const { orders } = res.data
          for (let order of orders) {
            orderSwitch(order)
            orderStatusSwitch(order)
          }
          data[active] = orders
          this.setData({
            data,
            loading: false
          })
        })
    })

  },

  // 订单操作事件

  // 查看物流
  bindCheckLogistics() {

  },
  // 取消订单
  cancelOrder(e) {
    const that = this
    const { data } = this.data
    const { _id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确认要取消该订单吗',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '取消中',
          })
          httpUtil.deleteOrder({ _id })
            .then(res => {
              // 清除本地缓存
              data.willPay = data.willPay.filter(item => {
                if (item._id !== _id) {
                  return item
                }
              })
              that.setData({
                data
              })
              // 关闭倒计时器
              clearInterval(wx.getStorageSync(`countDownTimer-${_id}`))
              // 清除定时器和时间的缓存
              wx.setStorageSync(`countDownTime-${_id}`, null)
              wx.setStorageSync(`countDownTimer-${_id}`, null)
              wx.hideLoading()
              wx.showToast({
                title: '取消订单成功',
                icon: "success"
              })
            }, () => {
              wx.hideLoading()
              wx.showToast({
                title: '取消订单失败',
                icon: "error"
              })
            })
        }
      }
    })
  },
  // 付款
  payForOrder(e) {
    const that = this
    const { data } = this.data
    const { _id, item } = e.currentTarget.dataset
    const endTime = wx.getStorageSync(`countDownTime-${_id}`)
    const nowTime = Math.floor(new Date().getTime() / 1000)
    if (endTime - nowTime < 0) {
      wx.showToast({
        title: '订单过期',
        icon: "error"
      })
      // 清除本地缓存
      data.willPay = data.willPay.filter(item => {
        if (item._id !== _id) {
          return item
        }
      })
      that.setData({
        data
      })
      wx.setStorageSync(`countDownTime-${item._id}`, null)
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    // 处理数据成确认订单需要的格式
    item.commodity.number = item.number
    const confirmOrderData = {
      commoditiesData: [{
        merchantInfo: item.commodity.merchantInfo,
        commodities: [item.commodity],
        merchantTotalNumber: item.number,
        merchantTotalPrice: item.totalPrice,
      }],
      totalNumber: item.number,
      totalPrice: item.totalPrice,
    }
    const dataName = `confirmOrderData-${item._id}`
    const addressName = `addressId-${item.addressId}`
    wx.setStorageSync(dataName, confirmOrderData)
    wx.setStorageSync(addressName, item.addressId)
    wx.redirectTo({
      url: `/pages/cart/pages/makeOrder/index?dataName=${dataName}&addressName=${addressName}&orderId=${_id}&fromOrderWillPay=true`,
    })
    wx.hideLoading()
    setTimeout(() => {
      // 清除本地缓存
      data.willPay = data.willPay.filter(item => {
        if (item._id !== _id) {
          return item
        }
      })
      that.setData({
        data
      })
    }, 1000)
  },
  // 退款申请
  returnMoneyRequest() {

  },
  // 再来一单
  toCommodity() {

  },
  // 退货申请
  returnCommodityRequest() {

  },
  // 完成订单
  finishOrder() {

  },
  // 取消退货申请
  cancelReturnCommodityRequest() {

  },
  // 取消退款申请
  cancelReturnCommodityRequest() {

  },
  // 去评价
  toEvaluate() {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { active, fromCart } = options
    this.setData({
      firstShow: true,
      active,
      fromCart: fromCart === "true" ? true : false
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
    const { active, fromCart } = this.data
    httpUtil.getOrderInfo({ query: { status: active, skip: 0, limit: 5 } })
      .then(res => {
        const { orders } = res.data
        for (let order of orders) {
          orderSwitch(order)
          orderStatusSwitch(order)
        }
        const { data } = this.data
        data[active] = orders
        this.setData({
          data,
          loading: false,
          firstShow: false
        }, () => {
          fromCart && wx.showToast({
            title: '我在这里等你哦~',
            icon: "none",
            duration: 2000,
            success() {
              wx.setStorageSync("hasFinishedOrder", null)
            }
          })
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