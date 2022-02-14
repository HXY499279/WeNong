Component({
  data: {
    active: 0,
    selectedColor: "#00EE00",
    color: "#000",
    list: [
      {
        "url": "/pages/index/index",
        "text": "首页",
        "icon": "../resources/tabbar-icon/home.png",
        "icon-active": "../resources/tabbar-icon/home-active.png",
      },
      {
        "url": "/pages/category/category",
        "text": "分类",
        "icon": "../resources/tabbar-icon/category.png",
        "icon-active": "../resources/tabbar-icon/category-active.png",
      },
      {
        "url": "/pages/cart/cart",
        "text": "购物车",
        "icon": "../resources/tabbar-icon/cart.png",
        "icon-active": "../resources/tabbar-icon/cart-active.png",
      },
      {
        "url": "/pages/person/person",
        "text": "我的",
        "icon": "../resources/tabbar-icon/my.png",
        "icon-active": "../resources/tabbar-icon/my-active.png",
      }
    ]
  },
  methods: {
    onChange(e) {
      wx.switchTab({
        url: this.data.list[e.detail].url
      });
    }
  }
})