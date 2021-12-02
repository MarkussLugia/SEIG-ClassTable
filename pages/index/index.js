// index.js
// 获取应用实例
const {
  timeTable,
} = getApp().globalData
import {
  generalProperties,
  getClassToday
} from "../../utils/util"

Page({
  data: {
    classes: [],
    classTodaySorted: [],
    week: 1,
    day: 0,
    weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    colors: ["rgba(120,120,120,0.37)", "#30C090", "#587AE8", "rgba(88,122,231,0.7)"],
    states: {
      prep: 1,
      on: 2,
      inactive: 3
    },
    dark: true
  },
  ...generalProperties,
  refreshCLass() {
    let state = getApp().globalData.currentState
    this.setData({
      week: state.termInfo.week,
    })
    let now = new Date();
    this.setData({
      day: now.getDay()
    })
    if (now.getDay() == 6 || now.getDay() == 0) {
      this.setData({
        classTodaySorted: []
      });
      return;
    }
    let classToday = getClassToday()
    let sorted = []
    for (let i = 0; i < 8; i++) {
      let c = classToday[i]
      if (c) {
        let obj = {
          class: c,
          state: 3,
          time: ""
        };
        if (state.class > i) obj.state = 0;
        else if (state.class == i) obj.state = this.data.states[state.state];
        obj.time = timeTable[i].start + "-" + timeTable[i].end;
        sorted.push(obj);
      }
    }
    this.setData({
      classTodaySorted: sorted
    })
  },
  onLoad() {
    if (!getApp().globalData.userData.ready) {
      return
    }
    this.syncDark()
    this.getTabBar().setData({
      dark: getApp().globalData.userData.setDark
    })
    setInterval(() => {
      this.refreshCLass()
    }, 5000)

  },
  onShow() {
    if (!getApp().globalData.userData.ready) {
      return
    }
    this.syncDark()
    this.getTabBar().setData({
      dark: getApp().globalData.userData.setDark,
      selected: 0,
      checkpoint: false,
    })
    this.setData({
      classes: getApp().globalData.userData.classes
    })
    this.refreshCLass()
  }
})