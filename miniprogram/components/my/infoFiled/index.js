// components/my/infoFiled/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemName: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: '',
    },
    isPic: {
      type: Boolean,
      value: false,
    },
    canChanged: {
      type: Boolean,
      value: false,
    },
    last: {
      type: String,
      value: ''
    },
    clickFunction: {
      type: Object,
      value: '',
      observer(newVal) {
        this.clickFunction = newVal.fun
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    clickFunction: null
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
