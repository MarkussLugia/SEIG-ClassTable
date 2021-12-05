// pages/backupRestore/backupRestore.js
let that
const {
  compress,
  decompress,
  generalProperties
} = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outputText: "",
    inputData: "",
    dark: true,
    hasData: false
  },

  archiveData() {
    let out = {
      classes: getApp().globalData.userData.classes,
      w: getApp().globalData.userData.startDates,
      t: [],
      d: getApp().globalData.userData.setDark ? 1 : 0,
      a: getApp().globalData.userData.adaptiveDark ? 1 : 0
    }
    let table = JSON.parse(JSON.stringify(getApp().globalData.userData.classTable))
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 8; j++) {
        let o = table[i][j];
        if (o[2]) {
          o[2] = parseInt(o[2], 2).toString(36)
        }
      }
    }
    out.t = table
    return out
  },
  extractData() {
    that = this;
    wx.showModal({
      title: '导出到剪贴板',
      content: '将覆盖当前剪贴板的内容',
      success(res) {
        if (res.confirm) {
          let a = JSON.stringify(that.archiveData())
          let b = compress(a)
          console.log(a)
          console.log(a.length)
          console.log(b)
          console.log(b.length)
          wx.setClipboardData({
            data: b
          })
        }
      }
    })
  },

  importData(str) {
    let a = str
    console.log(str.indexOf("VALSTRAX://"))
    if (str.indexOf("VALSTRAX://") != -1) a = decompress(str)
    console.log(a)
    let b = JSON.parse(a)
    console.log(b)
    getApp().globalData.userData.classes = b.classes
    getApp().globalData.userData.profile = b.profile
    getApp().globalData.userData.startDates = b.w
    getApp().globalData.userData.setDark = b.d ? true : false
    getApp().globalData.userData.adaptiveDark = b.a ? true : false
    let table = b['t']
    console.log(b.t)
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 8; j++) {
        let o = table[i][j];
        if (o[2]) {
          o[2] = parseInt(o[2], 36).toString(2)
        }
      }
    }
    getApp().globalData.userData.classTable = table
    getApp().globalData.userData.ready = true
    getApp().saveToStore()
    getApp().readyLaunch()
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  importFromClip() {
    that = this;
    wx.getClipboardData({
      success(res) {
        that.importData(res.data)
      }
    })
  },
  importFromInput() {
    that = this;
    that.importData(that.data.inputData)
  },
  ...generalProperties,
  onLoad() {
    this.syncDark()
    this.setData({
      hasData: getApp().globalData.userData.ready
    })
  },
  onShow() {
    this.syncDark()
  }
})