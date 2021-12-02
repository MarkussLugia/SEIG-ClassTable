// pages/setupWizard/setupWizard.js
const {
  generalProperties,
  getWeek
} = require("../../utils/util")
Page({

  data: {
    dark: true,
    weekList: [],
    calibrated: false,
    week: 0
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
    getApp().saveToStore()
    getApp().updateStates()
    this.setData({
      calibrated: true,
      week: getWeek(d[0], d[1], d[2], d[3]).week
    })
  },
  next() {
    getApp().globalData.userData.ready = true
    getApp().saveToStore()
    getApp().readyLaunch()
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  ...generalProperties,
  onLoad() {
    let ready = getApp().globalData.userData.ready
    let weekNow = getWeek().week
    this.setData({
      ready: ready,
      weekList: [weekNow, weekNow + 1, weekNow + 2]
    })
    this.syncDark()
  },
  onShow() {
    this.syncDark()
  }
})