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
    selected: {
      type: Boolean,
      value: false
    },
    current: {
      type: Number,
      value: 1
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
    color: 'rgba(127, 127, 127, 0)',
  },
  methods: {
    update() {
      if (this.data.info != 0) {
        let colorHash = (parseInt(this.data.info[0] + "ZZZZZ", 36) % 251) * 7 + 10000
        this.setData({
          color: "#" + ((colorHash % 181) + 35).toString(16) + ((colorHash % 137) + 60).toString(16) + ((colorHash % 167) + 50).toString(16),
        })
        console.log(this.data.color)
      } else {
        this.setData({
          color: 'transparent'
        })
      }
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        classes: getApp().globalData.userData.classes,
      })
      this.update()
    }
  },

})