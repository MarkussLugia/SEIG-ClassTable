// components/classPrompt/classPrompt.js
const {
  timeTable
} = getApp().globalData
import {
  isDayEnded,
  getClassToday
} from "../../utils/util"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    state: 0,
    promptText: "请稍候......",
    left: " ",
    right: " ",
    colors: ["rgba(120,120,120,0.37)", "linear-gradient(45deg, #30C090, #58A8E0)", "linear-gradient(45deg, rgba(88,122,231,1), rgba(138,102,248,0.9))"]
  },

  methods: {
    refreshPrompt() {
      let now = new Date();
      switch (now.getDay()) {
        case 6:
          this.setData({
            promptText: "周六了，好好休息一下吧",
            state: 0
          });
          return;
        case 0:
          this.setData({
            promptText: "周日了，作业写完了吗？",
            state: 0
          });
          return;
      }
      let classToday = getClassToday()
      let classes = getApp().globalData.userData.classes
      let state = getApp().globalData.currentState
      if (state.class == 8 || isDayEnded(state.class, classToday)) {
        this.setData({
          promptText: "一天的课程结束了，休息一下吧",
          state: 0
        })
        return
      }
      if (state.state == "inactive" || !classToday[state.class]) {
        this.setData({
          promptText: "当前没有活动的课程",
          state: 0
        })
        return
      } else {
        this.setData({
          left: classes[classToday[state.class][0]].name,
        })
        if (state.state == "on") {
          this.setData({
            state: 2,
            promptText: "上课中",
            right: timeTable[state.class].end + " 下课"
          })
        } else {
          this.setData({
            state: 1,
            promptText: "请前往" + classToday[state.class][1] + "上课",
            right: timeTable[state.class].start + " 开始"
          })
        }
        return
      }
    },

  },
  lifetimes: {
    created() {
      if (!getApp().globalData.userData.ready) {
        return
      }
      setInterval(() => this.refreshPrompt(), 5000)
    }
  },
  pageLifetimes: {
    show() {
      if (!getApp().globalData.userData.ready) {
        return
      }
      this.refreshPrompt()
    },
  }
})