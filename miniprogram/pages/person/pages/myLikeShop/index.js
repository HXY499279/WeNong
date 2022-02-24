import httpUtil from "../../../../utils/httpUtil"

// pages/person/pages/myLoveShop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: [],
    dataNum: 0,
    searchList: null,
    loading: true
  },

  onSearch(e) {
    let { shops } = this.data
    const value = e.detail.value;
    let searchList = null
    if (value) {
      searchList = this.data.shops.filter(item => {
        if (item.shopName.search(new RegExp(value, "i")) !== -1) {
          return item
        }
      })
    }
    this.setData({
      searchList,
      dataNum: searchList ? searchList.length : shops.length
    })
  },

  deleteLikeShop(event) {
    const { openid } = event.currentTarget.dataset
    const { position, instance } = event.detail;
    switch (position) {
      case 'right':
        let { shops, searchList } = this.data
        if (searchList) {
          searchList = searchList.filter(item => {
            if (item.openid !== openid) {
              return item
            }
          })
        }
        shops = shops.filter(item => {
          if (item.openid !== openid) {
            return item
          }
        })
        const likeShop = [...shops]
        likeShop.forEach((item, i) => {
          likeShop[i] = item.openid
        })
        instance.close()
        httpUtil.changeUserInfo({ newInfo: { likeShop } })
          .then(res => {
            this.setData({
              shops,
              searchList
            })
          }, () => {
            wx.showToast({
              title: '删除失败',
              icon: "error"
            })
          })
    }
  },

  search(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    httpUtil.getUserLikeShop()
      .then(res => {
        console.log(res.data.likeShop);
        this.setData({
          shops: res.data.likeShop,
          dataNum: res.data.likeShop.length,
          loading: false
        })
      }, (err) => {
        wx.showToast({
          title: err.message,
          icon: "error"
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