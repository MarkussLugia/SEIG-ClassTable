// app.js
import {
  getCurrentState,
  getWeek
} from "./utils/util"
App({
  globalData: {
    currentState: {
      class: -1,
      state: "inactive"
    },
    //classTable格式：[课程代码,教室,教学周（由二进制转为36进制）]
    userData: {
      ready: false,
      classes: {},
      classTable: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      startDates: [8, 30, 3, 1],
      adaptiveDark: true,
      setDark: true
    },
    timeTable: [{
        start: "9:00",
        end: "10:20"
      },
      {
        start: "10:40",
        end: "12:00"
      },
      {
        start: "12:30",
        end: "13:50"
      },
      {
        start: "14:00",
        end: "15:20"
      },
      {
        start: "15:30",
        end: "16:50"
      },
      {
        start: "17:00",
        end: "18:20"
      },
      {
        start: "19:00",
        end: "20:20"
      },
      {
        start: "20:30",
        end: "21:50"
      },
    ],
  },
  onLaunch() {
    let store = wx.getStorageSync('userData')
    if (store) {
      this.globalData.userData = store
    }
    if (this.globalData.userData.adaptiveDark) {
      this.globalData.userData.setDark = wx.getSystemInfoSync().theme == "light" ? false : true
    }
    if (!this.globalData.userData.ready) wx.reLaunch({
      url: '/pages/setupWizard/setupWizard',
    })
    else this.readyLaunch()
  },
  readyLaunch() {
    this.updateStates()
    setInterval(() => {
      this.updateStates()
    }, 15000)

  },
  updateStates() {
    let d = this.globalData.userData.startDates
    this.globalData.currentState = getCurrentState()
    this.globalData.currentState.termInfo = getWeek(d[0], d[1], d[2], d[3])
  },
  saveToStore() {
    wx.setStorageSync('userData', this.globalData.userData)
  }
})