// pages/fullTable/fullTable.js
const {
  generalProperties
} = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    displayWeek: 0,
    tableInRow: [],
    selectedRow: null,
    selectedClass: {
      class: [],
      col: null
    },
    selectedClassWeek: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },

  bindPickerChange: function (e) {
    this.setData({
      displayWeek: e.detail.value
    })
  },
  showInfo(e) {
    if (this.data.tableInRow[e.currentTarget.dataset.row][e.currentTarget.dataset.col] == 0 || (this.data.selectedRow == e.currentTarget.dataset.row && this.data.selectedClass.col == e.currentTarget.dataset.col)) {
      this.setData({
        selectedRow: null,
        selectedClass: {
          class: this.data.selectedClass.class,
          col: null
        }
      })
      return
    }
    this.setData({
      selectedRow: e.currentTarget.dataset.row,
      selectedClass: {
        class: this.data.tableInRow[e.currentTarget.dataset.row][e.currentTarget.dataset.col],
        col: e.currentTarget.dataset.col
      },
      selectedClassWeek: this.data.tableInRow[e.currentTarget.dataset.row][e.currentTarget.dataset.col][2].split("").slice(1)
    })
  },

  ...generalProperties,
  onLoad: function () {
    this.setData({
      displayWeek: getApp().globalData.currentState.termInfo.week - 1,
      termText: getApp().globalData.currentState.termInfo.term[0] + " 第" + getApp().globalData.currentState.termInfo.term[1] + "学期"
    })
    this.syncDark()
    let t = []
    let table = getApp().globalData.userData.classTable
    for (let i = 0; i < 8; i++) {
      let d = []
      for (let n = 0; n < 5; n++) {
        d.push(table[n][i])
      }
      t.push(d)
    }
    this.setData({
      tableInRow: t,
      timeTable: getApp().globalData.timeTable
    })
  },
  onShow() {
    this.syncDark()
  },
})