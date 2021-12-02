// pages/about/about.js
import {
  generalProperties
} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dark: true,
  },
  ...generalProperties,
  onLoad() {
    this.syncDark()
  },
  onShow() {
    this.syncDark()
  }
})