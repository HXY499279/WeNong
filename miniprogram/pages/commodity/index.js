import httpUtil from "../../utils/httpUtil"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    pics: [],
    commodity: {},
    // 收藏
    stared: false,
    isShowDetail: false,
    showContent: '',
    isShowAddCommodityNumber: false,
    commodityNumber: 1,
    evaluates: [],
    evaluateShowItem: {},
    evaluateLoading: true
  },

  navBack() {
    wx.navigateBack()
  },

  addToLikeCommodity(e) {
    const { commodityid: commodityId } = e.currentTarget.dataset
    httpUtil.addUserLikeCommodity({ commodities: [commodityId] })
      .then(res => {
        this.setData({
          stared: true
        })
        wx.showToast({
          title: '收藏成功',
          icon: "success"
        })
      }, (err) => {
        wx.showToast({
          title: '收藏失败',
          icon: "error"
        })
      })
  },

  removeFromLikeCommodity(e) {
    const { commodityid: commodityId } = e.currentTarget.dataset
    httpUtil.removeUserLikeCommodity({ commodityId: commodityId })
      .then(res => {
        this.setData({
          stared: false
        })
        wx.showToast({
          title: '取消收藏成功',
          icon: "success"
        })
      }, () => {
        wx.showToast({
          title: '取消收藏失败',
          icon: "error"
        })
      })
  },

  showService(e) {
    const { content } = e.currentTarget.dataset
    this.setData({
      showContent: content,
      isShowDetail: true
    })
  },
  showLogistics(e) {
    const { content } = e.currentTarget.dataset
    this.setData({
      showContent: content,
      isShowDetail: true
    })
  },
  showAfterSales(e) {
    const { content } = e.currentTarget.dataset
    this.setData({
      showContent: content,
      isShowDetail: true
    })
  },

  closeDetail(e) {
    this.setData({
      isShowDetail: false
    })
  },

  addToCart(e) {
    const { commodityid: commodityId } = e.currentTarget.dataset
    wx.showLoading({
      title: '加载中',
    })
    httpUtil.addCart({ newInfo: { commodityId } })
      .then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '添加成功',
          icon: "success"
        })
      })
  },

  showAddCommodityNumber() {
    this.setData({
      isShowAddCommodityNumber: true
    })
  },

  closeAddCommodityNumber() {
    this.setData({
      isShowAddCommodityNumber: false
    })
  },

  onCommodityNumberChange(e) {
    const commodityNumber = e.detail
    this.setData({
      commodityNumber
    })
  },

  nowToPay() {
    const { commodity, commodityNumber: number } = this.data
    const totalPrice = commodity.price * number
    wx.showLoading({
      title: '加载中',
    })
    commodity.number = number
    const confirmOrderData = {
      commoditiesData: [{
        merchantInfo: commodity.merchantInfo,
        commodities: [commodity],
        merchantTotalNumber: number,
        merchantTotalPrice: totalPrice,
      }],
      totalNumber: number,
      totalPrice: totalPrice,
    }
    const dataName = `confirmOrderData-${commodity._id}`
    wx.setStorageSync(dataName, confirmOrderData)
    wx.hideLoading({
      success: (res) => {
        this.setData({
          isShowAddCommodityNumber: false
        })
        wx.navigateTo({
          url: `/pages/cart/pages/makeOrder/index?dataName=${dataName}&fromOrderWillPay=false`,
        })
      },
    })
  },

  toShare() {
    this.setData({
      isShowShare: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { commodityId } = options
    this.setData({
      commodityId
    })
    // 分享
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
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
    // 获取商品信息
    const { commodityId } = this.data
    httpUtil.getCommodityInfo({ query: { _id: commodityId } })
      .then(res => {
        const { commodityInfo } = res.data
        const commodity = commodityInfo[0]
        console.log(commodity);
        // 添加总成交额，以万为单位
        commodity.totalPrice = Math.floor(commodity.price * commodity.sales * 0.0001)
        const { picture: pics } = commodity
        this.setData({
          commodity,
          pics
        })
      })
    // 判断是否被收藏了
    httpUtil.getUserLikeCommodity()
      .then(res => {
        const { likeCommodity } = res.data
        likeCommodity.forEach(item => {
          if (item._id === commodityId) {
            return this.setData({
              stared: true,
              loading: false
            })
          }
        })
        this.setData({
          loading: false
        })
      }, (err) => {
        this.setData({
          loading: false
        })
      })
    // 加载评论，只显示一条
    httpUtil.getEvaluateInfo({ query: { commodityId } })
      .then(res => {
        const evaluates = res.data.evaluateInfo || []
        const evaluateShowItem = evaluates[0] || {}
        console.log(evaluateShowItem);
        this.setData({
          evaluates,
          evaluateShowItem,
          evaluateLoading: false
        })
      })

  },

  toEvaluate() {
    const { commodity } = this.data
    wx.navigateTo({
      url: `/pages/commodity/pages/evaluateList/index?commodityId=${commodity._id}`,
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
    const { commodity } = this.data
    return {
      title: commodity.name + commodity.introduce,
      imageUrl: commodity.picture[0]
    }
  }
})