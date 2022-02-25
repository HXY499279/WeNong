// components/my/myOrder/orderItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
    },
    hasCheckLogistics: {
      type: Boolean,
      value: false,
    },
    btn1Text: {
      type: String,
      value: null,
    },
    btn2Text: {
      type: String,
      value: null,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindCheckLogistics() {
      this.triggerEvent("checkLogistics", {})
    },
    bindBtn1() {
      this.triggerEvent("btn1", {})
    },
    bindBtn2() {
      this.triggerEvent("btn2", {})
    },
  }
})
