import httpUtil from "../../../../utils/httpUtil";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageLoading: true,
    keyword: "",
    zh: [],
    chl: [],
    ml: [],
    jg: [],
    jgdesc: false,
    mldesc: false,
    data: [],
    jgTag: 0,
    mlTag: 0
  },

  onTitleClick(e) {
    const i = e.detail.index
    let { data, mldesc, jgdesc, ml, jg, mlTag, jgTag } = this.data
    if (i === 1) {
      mlTag++
      mlTag >= 2 ? mldesc = !mldesc : 0
      mldesc ? data.sort((a, b) => b.age - a.age) : data.sort((a, b) => a.age - b.age)
      this.setData({
        mldesc,
        ml: data,
        mlTag,
        jgTag: 0,
      })
    } else if (i === 2) {
      jgTag++
      jgTag >= 2 ? jgdesc = !jgdesc : 0
      jgdesc ? data.sort((a, b) => b.price - a.price) : data.sort((a, b) => a.price - b.price)
      this.setData({
        jgdesc,
        jg: data,
        jgTag,
        mlTag: 0
      })
    } else if (i === 3) {
      data.sort((a, b) => b.aliveRate - a.aliveRate)
      this.setData({
        chl: data,
        jgTag: 0,
        mlTag: 0,
      })
    } else {
      this.setData({
        jgTag: 0,
        mlTag: 0,
      })
    }

  },

  navBack() {
    wx.navigateBack()
  },

  onInput(e) {
    const { value } = e.detail
    if (!value) {
      wx.showLoading({
        title: '加载中',
      })
      this.search()
    }
  },

  search(keyword = "", itemName = "name") {
    const reg = new RegExp(keyword, "ig")
    const query = {}
    query[itemName] = {
      $regex: keyword,
      $options: "ig"
    }
    httpUtil.getFruitPlantInfo({ query })
      .then(res => {
        const data = res.data.fruitPlantInfo
        console.log(data);
        wx.hideLoading()
        this.setData({
          pageLoading: false,
          zh: data,
          data
        })
      }, () => {
        wx.hideLoading()
      })
  },

  confirmSearch(e) {
    const { value } = e.detail
    wx.showLoading({
      title: '加载中',
    })
    this.search(value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { keyword = "", itemName = "name", content = "" } = options
    content ? 0 : content = keyword
    this.setData({
      content
    })
    this.search(keyword, itemName)
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