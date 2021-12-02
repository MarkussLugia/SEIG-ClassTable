// pages/setupWizard/setupWizard.js
const {
  generalProperties
} = require("../../utils/util")
Page({

  data: {
    dark: 1,
    adaptive: true,
    animate: false,
  },
  ...generalProperties,
  onLoad() {
    wx.hideHomeButton()
    this.syncDark()
    this.setData({
      adaptive: getApp().globalData.userData.adaptiveDark,
    })
  },
  onShow() {
    wx.hideHomeButton()
    this.syncDark()
  }
})