import checkLogin from "../../utils/checkLogin"
import httpUtil from "../../utils/httpUtil"

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageLoading: true,
    commodityLoading: true,
    // 分类
    categories: [],
    // 分类——商品
    categoryToCommodities: {},
    // 值为展示的分类的id
    showCategory: ""
  },

  toSearch(e) {
    checkLogin()
      .then(() => {
        wx.navigateTo({
          url: `/pages/category/pages/search/index`,
        })
      })
  },

  onCategoryChange(e) {
    const { categoryid: categoryId } = e.target.dataset
    const { categoryToCommodities } = this.data
    if (!(categoryId in categoryToCommodities)) {
      this.setData({
        commodityLoading: true
      }, () => {
        httpUtil.getCommodityInfo({ query: { categoryId } })
          .then(res => {
            const { commodityInfo: commodities } = res.data
            categoryToCommodities[categoryId] = commodities
            const showCategory = categoryId
            console.log(res, commodities);
            this.setData({
              categoryToCommodities,
              showCategory,
              commodityLoading: false
            })
          })
      })
    }
    this.setData({
      showCategory: categoryId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    httpUtil.getCategoryInfo()
      .then(res => {
        const { categoryInfo: categories } = res.data
        const categoryId = categories[0]?._id
        httpUtil.getCommodityInfo({ query: { categoryId } })
          .then(res => {
            const { commodityInfo: commodities } = res.data
            const { categoryToCommodities } = this.data
            categoryToCommodities[categoryId] = commodities
            const showCategory = categoryId
            this.setData({
              pageLoading: false,
              commodityLoading: false,
              categories,
              categoryToCommodities,
              showCategory
            })
          })
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
  onShow() {
    this.getTabBar().setData({
      active: 1
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