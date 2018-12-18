// pages/mine/minetab.js
//获取应用实例
const app = getApp()

Page({
  taptag(event) {
    let that = this
    var link_type = event.currentTarget.dataset.link_type
    var score = this.data.user.score - 0 + 2
    app.globalData.score = score
    if (link_type == 'modalqd') {
      if (!app.globalData.is_qiandao) {
        wx.request({
          url: app.globalData.apiRoot + app.globalData.api.sing,
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            id: 1
          },
          success: function(res) {
            if (res.data.integral) {
              this.setData({
                modalqd: true,
                'user.score': score
              })
              app.globalData.is_qiandao = true;
            } else {
              wx.showToast({
                title: '今日已签到',
                duration: 2000
              })
              app.globalData.is_qiandao = true;
            }
          }
        })
      } else {
        wx.showToast({
          title: '今日已签到',
          duration: 2000
        })
        app.globalData.is_qiandao = true;
      }

      return
    } else {

    }
  },
  data: {
    modalqd: false,
    user: {
      score: 0,
      number: "",
      info: "我是一名优秀的学生！"
    },
    navlist: [{
        title: '关于我们',
        link_type: "path",
        path: '/pages/mine/minetab',
        icon: '/static/images/personal/icon1.png'
      },
      {
        title: '常见问题',
        link_type: "path",
        path: '/pages/mine/minetab',
        icon: '/static/images/personal/icon2.png'
      },
      // { title: '党费上缴', path: '/pages/studentService/dangfei/dangfei', icon: '/static/images/personal/icon3.png' },
      // { title: '团费上缴', path: '/pages/studentService/tuanfei/tuanfei', icon: '/static/images/personal/icon4.png' },
      {
        title: '签到领积分',
        link_type: "modalqd",
        path: '/pages/mine/minetab',
        icon: '/static/images/personal/icon3.png'
      },
      {
        title: '积分排行榜',
        link_type: "path",
        path: '/pages/studentService/ranking/ranking',
        icon: '/static/images/personal/icon4.png'
      },
      {
        title: '认识自我',
        link_type: "path",
        path: '/pages/studentService/whoamI/whoamI',
        icon: '/static/images/personal/icon5.png'
      },
    ],
    version: 'V1.20.1',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    this.setData({
      'user.score': app.globalData.score,
      'user.number': app.globalData.number,
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})