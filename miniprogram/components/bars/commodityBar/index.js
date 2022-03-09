const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    autoFocus: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ""
    },
    placeholder: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
    navigates: [
      {
        title: "商品",
        className: "show"
      },
      {
        title: "评价",
        className: "hidden"
      },
      {
        title: "详情",
        className: "hidden"
      },
      {
        title: "推荐",
        className: "hidden"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      const { value } = e.detail
      this.triggerEvent("input", { value })
    },
    confirm(e) {
      const { value } = e.detail
      this.triggerEvent("confirm", { value })
    },
    navBack() {
      this.triggerEvent("navBack", {})
    },
    toSomePosition(e) {
      const { navigates } = this.data
      const { index } = e.currentTarget.dataset
      for (let item of navigates) {
        item.className = "hidden"
      }
      navigates[index].className = "show"
      this.setData({
        navigates
      })

      switch (index) {
        case 0:
          wx.pageScrollTo({
            duration: 0,
          })
          break;

        default:
          break;
      }
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
