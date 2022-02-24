import httpUtil from "../../../../utils/httpUtil"

// pages/person/pages/myLoveShop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodities: [],
    dataNum: 0,
    searchList: null,
    loading: true
  },

  onSearch(e) {
    let { commodities } = this.data
    const value = e.detail.value;
    let searchList = null
    if (value) {
      searchList = this.data.commodities.filter(item => {
        if (item.name.search(new RegExp(value, "i")) !== -1) {
          return item
        }
      })
    }
    this.setData({
      searchList,
      dataNum: searchList ? searchList.length : commodities.length
    })
  },

  deleteLikeShop(event) {
    const { _id } = event.currentTarget.dataset
    const { position, instance } = event.detail;
    switch (position) {
      case 'right':
        let { commodities, searchList } = this.data
        if (searchList) {
          searchList = searchList.filter(item => {
            if (item._id !== _id) {
              return item
            }
          })
        }
        commodities = commodities.filter(item => {
          if (item._id !== _id) {
            return item
          }
        })
        const likeCommodity = [...commodities]
        likeCommodity.forEach((item, i) => {
          likeCommodity[i] = item._id
        })
        instance.close()
        httpUtil.changeUserInfo({ newInfo: { likeCommodity } })
          .then(res => {
            this.setData({
              commodities,
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
    httpUtil.getUserLikeCommodity()
      .then(res => {
        console.log(res.data.likeCommodity);
        this.setData({
          commodities: res.data.likeCommodity,
          dataNum: res.data.likeCommodity.length,
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