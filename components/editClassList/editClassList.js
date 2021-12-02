// components/editClassesItem/classEdit.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: Object,
    index: String,
    protect: Boolean,
    dark: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    color: "#808080",
    tempCode: '',
    temp: {
      name: '',
      group: '',
      teacher: ''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateColor() {
      let colorHash = (parseInt(this.data.index + "ZZZZZ", 36) % 251) * 7 + 10000
      this.setData({
        color: "#" + ((colorHash % 181) + 35).toString(16) + ((colorHash % 137) + 60).toString(16) + ((colorHash % 167) + 50).toString(16),
      })
    },
    delete() {
      if (this.data.protect) {
        wx.showModal({
          title: '暂时无法删除',
          content: '课程表中存在此课程的时间安排，因此无法删除。请先清除此课程的所有时间安排，再删除此课程。',
          showCancel: false
        })
      } else
        wx.showModal({
          title: '确认',
          content: '要删除此课程吗？',
          success:res => {
            if (res.confirm) {
              this.triggerEvent('delete', {
                index: this.data.index
              })
            }
          }
        })

    },
    edit(){
      this.triggerEvent('edit', {
        index: this.data.index
      })
    }
  },
  lifetimes: {
    attached() {
      this.updateColor()
    }
  },
})