const app = getApp()
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
    statusBarHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toSearch() {
      this.triggerEvent("toSearch", {})
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      const res = wx.getSystemInfoSync()
      const reg = new RegExp("ios", "ig")
      // ios状态栏高度再＋4，使其与胶囊顶部齐平
      if (res.system.search(reg) !== -1) {
        this.setData({
          statusBarHeight: app.globalData.statusBarHeight + 4,
          jiaoNangHeight: app.globalData.jiaoNangHeight
        })
      } else {
        this.setData({
          statusBarHeight: app.globalData.statusBarHeight + 8,
          jiaoNangHeight: app.globalData.jiaoNangHeight
        })
      }

    },
    moved: function () { },
    detached: function () { },
  },
})
