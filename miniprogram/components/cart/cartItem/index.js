import httpUtil from "../../../utils/httpUtil"

// components/cart/cartItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    merchantIndex: {
      type: Number,
      value: 0
    },
    commodityIndex: {
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    timer: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onNumberChange(e) {
      const number = e.detail
      const { merchantIndex, commodityIndex } = this.data
      const { commodityid: commodityId } = e.currentTarget.dataset
      this.triggerEvent("numberChange", { commodityId, number, merchantIndex, commodityIndex })
    }
  }
})
