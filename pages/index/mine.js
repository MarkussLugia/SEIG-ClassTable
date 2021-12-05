// index.js
// 获取应用实例
import {
  generalProperties
} from "../../utils/util"

Page({
  data: {
    dark: true,
  },
  ...generalProperties,
  onLoad() {
    this.syncDark()
    this.getTabBar().setData({
      dark: getApp().globalData.userData.setDark
    })
    this.setData({
      profile: getApp().globalData.userData.profile
    })
    console.log(getApp().globalData.userData)
  },
  onShow() {
    this.syncDark()
    this.getTabBar().setData({
      dark: getApp().globalData.userData.setDark,
      selected: 1,
      checkpoint: false,
    })
    this.setData({
      profile: getApp().globalData.userData.profile
    })
  },
})