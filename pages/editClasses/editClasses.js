// pages/editClasses/editClasses.js
const {
  generalProperties
} = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes: {},
    editing: null,
    code: '',
    name: '',
    teacher: '',
    group: '',
    protect: false,
    add: ''
  },

  refresh() {
    let classes = getApp().globalData.userData.classes
    let ready = getApp().globalData.userData.ready
    let table = getApp().globalData.userData.classTable
    for (const n in classes) {
      for (let i = 0; i < table.length; i++) {
        let day = table[i]
        for (let j = 0; j < day.length; j++) {
          if (n == day[j][0]) classes[n].protect = true
        }
      }
    }
    this.setData({
      classes: classes,
      ready: ready,
    })
  },
  addClass() {
    if (!this.data.add) {
      return
    }
    if (this.data.classes[this.data.add]) {
      wx.showModal({
        title: '输入有误',
        content: '似乎存在和你输入的课程代码一样的课程。课程代码不允许重复。',
        showCancel: false
      })
      return
    } else {
      this.setData({
        code: this.data.add,
        name: '',
        teacher: '',
        group: '',
        add: ''
      })
    }
  },
  deleteClass(e) {
    let a = this.data.classes
    delete a[e.detail.index]
    this.setData({
      classes: a
    })
  },
  change() {
    let a = this.data.classes
    a[this.data.code] = {
      name: this.data.name,
      teacher: this.data.teacher,
      group: this.data.group,
      protect: this.data.protect
    }
    this.setData({
      classes: a,
      code: '',
      name: '',
      teacher: '',
      group: '',
      protect: false,
    })
  },
  cancel() {
    this.setData({
      code: '',
      name: '',
      teacher: '',
      group: '',
    })
  },
  editClass(e) {
    this.data.classes[e.detail.index]
    this.setData({
      ...this.data.classes[e.detail.index],
      code: e.detail.index
    })
  },
  checkInput(e){
    return e.detail.value.replace(/[^\a-\z\A-\Z0-9./\u4E00-\u9FA5]/g,'')
  },
  checkInputCode(e){
    return e.detail.value.replace(/[^\a-\z\A-\Z0-9]/g,'')
  },
  saveChanges() {
    let a = this.data.classes
    for (let n in a) {
      delete a[n].protect
    }
    getApp().globalData.userData.classes = a
    getApp().saveToStore()

  },
  anyClassExists() {
    for (const k in this.data.classes) {
      return true
    }
    return false
  },
  save() {
    let that = this
    if (that.anyClassExists()) {
      that.saveChanges()
      wx.navigateBack()
    } else wx.showModal({
      title: '数据为空',
      content: '你没有添加任何课程，真的要保存吗？',
      success(res) {
        if (res.confirm) {
          that.saveChanges()
          wx.navigateBack()
        }
      }
    })
  },
  next() {
    let that = this
    if (that.anyClassExists()) {
      that.saveChanges()
      wx.navigateTo({
        url: '/pages/editTable/editTable',
      })
    } else wx.showModal({
      title: '数据为空',
      content: '你没有添加任何课程，真的要保存并继续吗？',
      success(res) {
        if (res.confirm) {
          that.saveChanges()
          wx.navigateTo({
            url: '/pages/editTable/editTable',
          })
        }
      }
    })
  },
  ...generalProperties,
  onLoad: function () {
    this.syncDark()
    this.refresh()
  },
  onShow() {
    this.syncDark()
  },
})