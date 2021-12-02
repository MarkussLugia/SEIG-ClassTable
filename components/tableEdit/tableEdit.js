// components/classGrid/classGrid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classes: Object,
    active: {
      type: Boolean,
      value: false
    },
    dark: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    selectedClass: -1,
    room: "",
    weeks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    new: true
  },
  methods: {
    checkInput(e){
      return e.detail.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')
    },
    bindPickerChange(e) {
      this.setData({
        selectedClass: e.detail.value
      })
    },
    switchWeek(e) {
      let index = e.currentTarget.dataset.index
      let weeks = this.data.weeks
      if (weeks[index] == 0) weeks[index] = 1
      else weeks[index] = 0
      this.setData({
        weeks: weeks
      })
    },
    generateData() {
      let s = "1"
      for (let i = 0; i < 17; i++) {
        s += this.data.weeks[i]
      }
      return [this.data.classes[this.data.selectedClass].code, this.data.room, s]
    },
    submit() {
      this.triggerEvent('edit', {
        edit: true,
        data: this.generateData()
      })
    },
    cancel() {
      this.triggerEvent('edit', {
        edit: false,
      })
    },
    clear() {
      this.triggerEvent('edit', {
        edit: true,
        data: 0
      })
    }
  },
  lifetimes: {
    attached() {
      if (this.data.info == 0) {
        this.setData({
          info: this.data.template
        })
      }
      this.setData({
        classes: getApp().globalData.userData.classes
      })
    },
  },
  pageLifetimes: {
    show() {},
  }
})