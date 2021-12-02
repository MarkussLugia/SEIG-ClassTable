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
    tableInRow: [],
    classArray: [],
    selectedRow: null,
    selectedClass: {
      class: [],
      col: null
    },
    selectedClassWeek: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },

  edit(e) {
    if (this.data.selectedRow == e.currentTarget.dataset.row && this.data.selectedClass.col == e.currentTarget.dataset.col) {
      return
    }
    let editor = this.selectComponent('#edit' + e.currentTarget.dataset.row);
    if (this.data.tableInRow[e.currentTarget.dataset.row][e.currentTarget.dataset.col] == 0) {
      this.selectComponent('#edit' + e.currentTarget.dataset.row).setData({
        selectedClass: -1,
        room: "",
        weeks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        new: true
      })
    } else {
      let select = this.data.tableInRow[e.currentTarget.dataset.row][e.currentTarget.dataset.col]
      let code = select[0]
      let i
      for (i = 0; i < this.data.classArray.length; i++) {
        if (this.data.classArray[i].code == code) {
          break
        }
      }
      this.selectComponent('#edit' + e.currentTarget.dataset.row).setData({
        selectedClass: i,
        room: select[1],
        weeks: select[2].slice(1).split(""),
        new: false
      })
    }
    this.setData({
      selectedRow: e.currentTarget.dataset.row,
      selectedClass: {
        class: this.data.tableInRow[e.currentTarget.dataset.row][e.currentTarget.dataset.col],
        col: e.currentTarget.dataset.col
      },
    })
  },
  confirmEdit(e) {
    if (e.detail.edit) {
      let a = this.data.tableInRow
      let row = this.data.selectedRow
      let col = this.data.selectedClass.col
      a[row][col] = e.detail.data
      this.setData({
        tableInRow: a
      })
      this.selectComponent('#grid' + row + col).update()
    }
    this.setData({
      selectedRow: null,
      selectedClass: {
        class: [],
        col: null
      },
    })
  },
  saveChanges() {
    let table = this.data.tableInRow
    let t = []
    for (let i = 0; i < 5; i++) {
      let d = []
      for (let n = 0; n < 8; n++) {
        d.push(table[n][i])
      }
      t.push(d)
      getApp().globalData.userData.classTable = t
    }
  },
  anyClassExists() {
    let table = this.data.tableInRow
    for (let i = 0; i < 5; i++) {
      for (let n = 0; n < 8; n++) {
        if (table[n][i]) {
          return true
        }
      }
    }
    return false
  },
  save() {
    let that = this
    if (this.anyClassExists()) {
      that.saveChanges()
      wx.navigateBack()
    } else wx.showModal({
      title: '数据为空',
      content: '你没有添加任何课表时间安排，真的要保存吗？',
      success(res) {
        if (res.confirm) {
          that.saveChanges()
          wx.navigateBack()
        }
      }
    })
  },
  next() {
    let that = this
    if (this.anyClassExists()) {
      that.saveChanges()
      wx.navigateTo({
        url: '/pages/calibrateWeek/calibrateWeek',
      })
    } else wx.showModal({
      title: '数据为空',
      content: '你没有添加任何课表时间安排，真的要保存并继续吗？',
      success(res) {
        if (res.confirm) {
          that.saveChanges()
          wx.navigateTo({
            url: '/pages/calibrateWeek/calibrateWeek',
          })
        }
      }
    })
  },
  ...generalProperties,
  onLoad: function () {
    this.syncDark()
    let ready = getApp().globalData.userData.ready
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
      timeTable: getApp().globalData.timeTable,
      ready: ready
    })
    let codes = []
    let classes = getApp().globalData.userData.classes
    for (let c in classes) {
      let o = classes[c]
      o['code'] = c
      codes.push(o)
    }
    this.setData({
      classArray: codes
    })
  },
  onShow() {
    this.syncDark()
  },
})