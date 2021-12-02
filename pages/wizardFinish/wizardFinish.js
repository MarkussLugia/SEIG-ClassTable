// pages/setupWizard/setupWizard.js
const {
  generalProperties,
} = require("../../utils/util")
Page({

  data: {
  },
  calibrateWeek(e) {
    let offset = e.currentTarget.dataset.select - 1
    let a = new Date()
    let b = a.getTime()
    let c = new Date(b - offset * 604800000)
    if (c.getMonth() > 6) {
      getApp().globalData.userData.startDates = [c.getMonth() + 1, c.getDate(), getApp().globalData.userData.startDates[2], getApp().globalData.userData.startDates[3]]
    } else getApp().globalData.userData.startDates = [getApp().globalData.userData.startDates[0], getApp().globalData.userData.startDates[1], c.getMonth() + 1, c.getDate()]
    let d = getApp().globalData.userData.startDates
    this.setData({
      calibrated: true,
      week: getWeek(d[0], d[1], d[2], d[3]).week
    })
  },
  finishWizard(){
    wx.navigateTo({
      url: '/pages/wizardFinish/wizardFinish',
    })
  },
  ...generalProperties,
  onLoad() {
    let weekNow = getWeek().week
    this.setData({
      weekList: [weekNow, weekNow + 1, weekNow + 2]
    })
    this.syncDark()
  },
  onShow() {
    this.syncDark()
  }
})