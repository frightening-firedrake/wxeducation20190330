// pages/login/login/login.js
//获取应用实例
const app = getApp()

Page({
  toForget() {
    return
    var identity = this.data.identity
    wx.navigateTo({
      url: '/pages/login/login/login?identity=' + identity
    })
  },
  toRegister() {
    var identity = this.data.identity
    wx.navigateTo({
      // url: '/pages/login/register/register?identity=' + identity
      url: '/pages/login/identity/identity'
    })
  },
  pass1input(e) {
    // console.log( e.detail.value)
  },
  userinput(e) {
    // console.log(e.detail.value)
  },
  formSubmit: function(e) {
    // console.log(this.data.hasUserInfo)
    // if (!this.data.hasUserInfo){
    //   this.setData({
    //     error: true,
    //     errormsg: '请您先予以授权，然后再次点击登录！',
    //   })
    //   return
    // }
    var data = e.detail.value;
    for (var i in data) {
      if (!data[i]) {
        if (i == "user") {
          this.setData({
            error: true,
            errormsg: '请您输入账号，然后再点击登录！',
          })
        } else if (i == "pass") {
          this.setData({
            error: true,
            errormsg: '请您输入密码，然后再点击登录！',
          })
        }
        return
      }
    }
    this.setData({
      error: false,
      errormsg: '',
    })
    if (!this.data.error) {
      // wx.switchTab({
      //   url: '/pages/home/home'
      // })
      // console.log('form发生了submit事件，携带数据为：', e.detail.value)
      var data = {};
      data.account = e.detail.value.user;
      data.password = e.detail.value.pass;
      data.openId = app.globalData.openId;
      // console.log(data)
      this.login(data)
    }
  },
  login(data) {
   
    // this.setData({
    //   endLoading: true
    // })
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.login,
      method: 'POST',
      data: data,
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.success) {
          // wx.showToast({
          //   title: res.data.code,
          //   icon: 'success',
          //   duration: 2000
          // })
          app.globalData.number = data.account
          wx.switchTab({
            url: '/pages/home/home'
          })
        } else {
          _this.setData({
            error: true,
            errormsg: res.data.code,
          })
        }
      },
      fail(res) {

      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    identity: '',
    user: '',
    pass: '',
    error: false,
    errormsg: '',
    // errormsg:'您输入的账号或密码错误，请重新输入！',
    userInfo: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 获取权限方法
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      this.toRegister()
    } else {

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    var identity = options.identity ? options.identity : '账号';
    this.setData({
      identity: identity
    })
    // 检查权限暂时没用到
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})