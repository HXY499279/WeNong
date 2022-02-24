import checkLogin from "../../utils/checkLogin"
import httpUtil from "../../utils/httpUtil"

Page({
  data: {
    items: [],
    commodityData: [],
    info: "",
    infos: [],
    infoNum: 0
  },

  toAgricultureInfo(){
    wx.navigateTo({
      url: '/pages/index/pages/agricultureInfo/index',
    })
  },

  toNearbyFarm(){
    wx.navigateTo({
      url: '/pages/index/pages/nearbyFarm/index',
    })
  },

  toAdopt() {
    wx.navigateTo({
      url: `/pages/index/pages/toAdopt/index`,
    })
  },

  toSearch(e) {
    wx.navigateTo({
      url: `/pages/category/pages/search/index`,
    })
  },

  toSearchResult(e) {
    const { keyword, content } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/category/pages/searchResult/index?content=${content}&keyword=${keyword}&itemName=categoryId`,
    })
  },

  onLoad() {
    httpUtil.getCategoryInfo()
      .then(res => {
        const { categoryInfo } = res.data
        this.setData({
          items: categoryInfo
        })
      })
    httpUtil.getCommodityInfo({ skip: 0, limit: 10 })
      .then(res => {
        const { commodityInfo: commodityData } = res.data
        this.setData({
          commodityData
        })
      })
  },

  onShow() {
    let { infoNum } = this.data
    httpUtil.getInfo()
      .then(res => {
        const { infos } = res.data
        infoNum = ++infoNum % infos.length
        const info = infos[infoNum].title
        this.setData({
          info,
          infoNum
        })
      })
  }

})