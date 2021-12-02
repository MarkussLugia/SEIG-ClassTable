// pages/settings/settings.js
import {
  generalProperties
} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dark: 1,
    adaptive: true,
    animate: false,
  },
  ...generalProperties,
  onLoad() {
    this.syncDark()
    this.setData({
      adaptive: getApp().globalData.userData.adaptiveDark,
    })
  },
  onShow() {
    this.syncDark()
    this.setData({
      adaptive: getApp().globalData.userData.adaptiveDark,
    })
  }
})