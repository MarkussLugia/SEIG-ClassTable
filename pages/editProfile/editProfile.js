// pages/setupWizard/setupWizard.js
const {
  generalProperties,
} = require("../../utils/util")
Page({
  data: {
    dark: true,
    name: "",
    id: ""
  },
  save() {
    getApp().globalData.userData.profile = {
      name: this.data.name,
      id: this.data.id
    }
    console.log(this.data.profile)
    console.log(getApp().globalData.userData.profile)
    wx.navigateBack()
  },
  next() {
    getApp().globalData.userData.profile = {
      name: this.data.name,
      id: this.data.id
    }
    getApp().globalData.userData.ready = true
    getApp().saveToStore()
    getApp().readyLaunch()
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  ...generalProperties,
  onLoad() {
    this.setData({
      ready: getApp().globalData.userData.ready,
      name: getApp().globalData.userData.profile.name,
      id: getApp().globalData.userData.profile.id
    })
    this.syncDark()
  },
  onShow() {
    this.setData({
      ready: getApp().globalData.userData.ready,
      name: getApp().globalData.userData.profile.name,
      id: getApp().globalData.userData.profile.id
    })
    this.syncDark()
  }
})