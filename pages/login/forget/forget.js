// pages/login/forget/forget.js
//获取应用实例
const app = getApp()
Page({
  toRegister() {
    wx.navigateTo({
      url: '/pages/login/identity/identity'
    })
  },
  toLogin() {
    var identity = this.data.identity
    wx.reLaunch({
      url: '/pages/login/login/login?identity=' + identity
    })
  },
  passinput(e) {
    // console.log( e.detail.value)
    // this.setData({
    //   pass2: "",
    // })
  },
  pass2input(e) {
    // console.log( e.detail.value)
  },
  userinput(e) {
    // console.log(e.detail.value)
  },
  passblur(e) {
    // this.setData({
    //   pass: e.detail.value,
    // })
  },
  pass2blur(e) {
    // if (e.detail.value!==this.data.pass){
    //   this.setData({
    //     error: true,
    //     errormsg: '您输入的两次密码不一致，请重新输入！',
    //   })
    // }
  },
  formSubmit: function (e) {
    var data = e.detail.value;
    for (var i in data) {
      if (!data[i]) {
        if (i == "user") {
          this.setData({
            error: true,
            errormsg: '请您输入账号，然后再点击提交！',
          })
        } else if (i == "pass") {
          this.setData({
            error: true,
            errormsg: '请您输入密码，然后再点击提交！',
          })
        } else if (i == "pass2") {
          this.setData({
            error: true,
            errormsg: '请您再次输入密码，然后再点击提交！',
          })
        }
        return
      }
    }
    if (data.pass !== data.pass2) {
      this.setData({
        error: true,
        errormsg: '您输入的两次密码不一致，请重新输入！',
      })
      return
    }

    this.setData({
      error: false,
      errormsg: '',
    })
    if (!this.data.error) {
      var identity = this.data.identity
      var userInfo = app.globalData.userInfo;
      // if (userInfo){
      //   console.log(userInfo)
      // }
      // wx.reLaunch({
      //   url: '/pages/login/login/login?identity=' + identity
      // })
      // wx.switchTab({
      //   url: '/pages/home/home'
      // })
      // console.log('form发生了submit事件，携带数据为：', e.detail.value)
      var data = {};
      data.account = e.detail.value.user;
      data.password = e.detail.value.pass;
      data.weixinNum = userInfo.nickName;
      data.sex = userInfo.gender == 0 ? '保密' : userInfo.gender == 1 ? '男' : '女';
      data.type = this.data.type;
      data.openId = app.globalData.openId;
      // data.phoneNum = 12315678945;//假的
      // data.integral = 999999;//假的
      // data.singData='';//假的
      // data.riskAssessment = 0;
      // console.log(data)
      this.resetPass(data)
    }
  },
  resetPass(data) {
    // this.setData({
    //   endLoading: true
    // })
    if (!this.data.addLoading) {
      return
    }
    this.setData({
      addLoading: false,
    })
    var data2={};
    data2.openId = app.globalData.openId;
    data2.account = data.account;
    data2.password = data.password;
    // var params={}
    // params.account = data.account;
    // params.password = data.password;
    // data2.newAccount = JSON.stringify(params);
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.resetPass,
      method: 'POST',
      data: data2,
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {

        if (res.data.success) {
          wx.showToast({
            // title: res.data.msg,
            title: "重置成功，请重新登录",
            // icon: 'success',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            _this.setData({
              addLoading: true,
            })
            // wx.reLaunch({
            //   url: '/pages/login/login/login?identity=' + _this.data.identity
            // })
          }, 2000)
        } else {
          _this.setData({
            addLoading: true,
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
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
    pass2: '',
    error: false,
    errormsg: '',
    type: '',
    addLoading: true,
    // errormsg:'您输入的账号或密码错误，请重新输入！',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // var identity = options.identity;
    // var type = options.identity == '工号' ? 2 : 1;
    // this.setData({
    //   identity: identity,
    //   type: type
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})