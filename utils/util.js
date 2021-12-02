let timestamps = [32400000, 38400000, 45000000, 50400000, 55800000, 61200000, 68400000, 73800000, ]
module.exports = {
  getCurrentState() {
    let now = new Date();
    let ms = now.getHours() * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + now.getMilliseconds()
    for (let i = 0; i < 8; i++) {
      if (ms < timestamps[i] && ms > (timestamps[i] - 600000)) return {
        class: i,
        state: "prep"
      }

      else if (ms >= timestamps[i] && ms < (timestamps[i] + 4800000)) return {
        class: i,
        state: "on"
      }
      else if (ms >= (timestamps[i] + 4800000) && ms < (timestamps[i + 1] - 600000)) {
        return {
          class: i + 1,
          state: "inactive"
        }
      }
    }
    if (ms > (timestamps[7] + 4800000)) return {
      class: 8,
      state: "ended"
    }
    else return {
      class: -1,
      state: "inactive"
    }
  },
  isDayEnded(state, classes) {
    let isEnded = true
    for (let i = state; i < 8; i++) {
      if (classes[i]) {
        isEnded = false
      }
    }
    return isEnded
  },
  compress(str) {
    return str
      .replaceAll('":{"name":"', '%')
      .replaceAll('","group":"', '@')
      .replaceAll('","teacher":"', '^')
      .replaceAll('","', '&')
      .replaceAll('":"', '*')
      .replaceAll('["', '<')
      .replaceAll('"],', '>')
      .replaceAll('0,', '!')
      .replaceAll('":{"', '#')
      .replaceAll('"},"', '$')
      .replace('"}},"t":[[', '~')
      .replace('{"classes', 'VALSTRAX://')
  },
  //"}},"classTable":[[
  decompress(str) {
    return str
      .replace('VALSTRAX://', '{"classes')
      .replace('~', '"}},"t":[[')
      .replaceAll('$', '"},"')
      .replaceAll('#', '":{"')
      .replaceAll('!', '0,')
      .replaceAll('>', '"],')
      .replaceAll('<', '["')
      .replaceAll('*', '":"')
      .replaceAll('&', '","')
      .replaceAll('^', '","teacher":"')
      .replaceAll('@', '","group":"')
      .replaceAll('%', '":{"name":"')
  },
  getClassToday() {
    let now = new Date()
    if (now.getDay() == 0 || now.getDay() == 6) return []
    let classTodayAll = getApp().globalData.userData.classTable[now.getDay() - 1]
    let week = getApp().globalData.currentState.termInfo.week
    let a = []
    for (let i = 0; i < 8; i++) {
      if (classTodayAll[i] && classTodayAll[i][2][week] == 1) {
        a.push(classTodayAll[i])
      } else a.push(0)
    }
    return a
  },

  getWeek(firstMonth = 9, firstDay = 10, secondMonth = 3, secondDay = 10) {
    const year = new Date().getFullYear()
    let formatTime = function (date) {
      let simpledate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      return simpledate
    }
    let today = new Date(formatTime(new Date()));
    let term;
    let schoolstart;
    let lstr = "/" + secondMonth + "/" + secondDay
    let nstr = "/" + firstMonth + "/" + firstDay
    let tdate = Date.parse(today) + 1
    let ldate = Date.parse(new Date(year + lstr))
    let ndate = Date.parse(new Date(year + nstr))
    if (tdate > ldate && tdate < ndate) {
      schoolstart = new Date(year + lstr);
      term = [year - 1 + '-' + year + '学年', 2]
    } else if (today < ldate) {
      schoolstart = new Date(year - 1 + nstr);
      term = [year - 1 + '-' + year + '学年', 1];
    } else {
      schoolstart = new Date(year + nstr);
      term = [year + '-' + (year + 1) + '学年', 1]
    }
    let startweekday = schoolstart.getDay();
    let startweek = 6 - startweekday; //开学当周天数
    let week = (((today - schoolstart) / 86400000) - startweek) / 7;
    week = Math.ceil(week) + 1;
    return {
      week,
      term,
      schoolstart,
    }
  },
  generalProperties: {
    darkAnimation(v) {
      setTimeout(() => {
        wx.setNavigationBarColor({
          frontColor: v ? '#ffffff' : "#000000",
          backgroundColor: v ? '#202020' : "#FFFFFF"
        })
      }, 80);
      setTimeout(() => {
        this.setData({
          animate: false,
        })
      }, 250);
    },
    switchDark() {
      if (this.data.animate) return
      let v = !getApp().globalData.userData.setDark
      getApp().globalData.userData.setDark = v
      getApp().saveToStore()
      this.setData({
        animate: true,
        dark: v
      })
      this.darkAnimation(v)
    },
    switchAdaptive() {
      if (this.data.animate) return
      getApp().globalData.userData.adaptiveDark = !getApp().globalData.userData.adaptiveDark
      if (getApp().globalData.userData.adaptiveDark) {
        let d
        if (wx.getSystemInfoSync().theme == "light") d = false
        else d = true
        getApp().globalData.userData.setDark = d
        this.setData({
          animate: true,
          adaptive: true,
          dark: d
        })
        this.darkAnimation(d)
      } else this.setData({
        adaptive: false,
      })
      getApp().saveToStore()
    },
    toLink(e) {
      if (e.currentTarget.dataset.to) {
        wx.navigateTo({
          url: e.currentTarget.dataset.to,
        })
      }
    },
    syncDark() {
      let v = getApp().globalData.userData.setDark
      this.setData({
        dark: v
      })
      wx.setNavigationBarColor({
        frontColor: v ? '#ffffff' : "#000000",
        backgroundColor: v ? '#202020' : "#FFFFFF"
      })
    }
  }
}