// pages/mine/minetab.js
//获取应用实例
const app = getApp()

Page({
  // 请求数据
  getIntegral() {
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.getIntegral, //
      method: 'POST',
      data: {
        openId: app.globalData.openId
      },
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        // 'content-type': 'application/json' // 默认值
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (!res.data.integral) {
          return
        }
        app.globalData.score = res.data.integral
        app.globalData.number=res.data.account
        _this.setData({
          'user.score': res.data.integral,
          // 'user.number': res.data.account,
        })
      },
      fail(res) {
      }
    })
  },
  taptag(event) {
    let _this = this
    var link_type = event.currentTarget.dataset.link_type
    // var score = this.data.user.score - 0 + 2
    // app.globalData.score = score
    if (link_type == 'modalqd') {
      if (!app.globalData.is_qiandao) {
        wx.request({
          url: app.globalData.apiRoot + app.globalData.api.sing,
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            openId: app.globalData.openId
          },
          success: function(res) {
            if (res.data.integral) {
              _this.setData({
                modalqd: true,
                'user.score': res.data.integral
              })
              app.globalData.score = res.data.integral;
              app.globalData.is_qiandao = true;
            } else {
              wx.showToast({
                title: '今日已签到',
                duration: 1000
              })
              app.globalData.is_qiandao = true;
            }
          }
        })
      } else {
        wx.showToast({
          title: '今日已签到',
          duration: 1000
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
    navlist: [
      // {
      //   title: '关于我们',
      //   link_type: "path",
      //   path: '/pages/mine/minetab',
      //   icon: '/static/images/personal/icon1.png'
      // },
      // {
      //   title: '常见问题',
      //   link_type: "path",
      //   path: '/pages/mine/minetab',
      //   icon: '/static/images/personal/icon2.png'
      // },
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
    version: 'V1.00',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    this.setData({
      'user.number': app.globalData.number,
    })

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getdata();


  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    
    // if (app.globalData.score) {
    //   this.setData({
    //     'user.score': app.globalData.score,
    //   })
    // } else {
      this.getIntegral()
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("onReachBottom")
    if (!this.data.end) {
      this.getACCESS_TOKEN()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/home/home'
    }
  }
})