// components/classGrid/classGrid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Array,
      optionalTypes: [Number],
      value: ['', '', ''],
    },
    active: {
      type: Boolean,
      value: false
    },
    weeks: {
      type: Array,
      value: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    },
    dark: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: '请稍候...',
  },
  lifetimes: {
    attached() {
      this.setData({
        classes: getApp().globalData.userData.classes
      })
    }
  },

})