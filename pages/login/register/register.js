// pages/login/register/register.js
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
  pass2blur(e){
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
    if (data.pass!==data.pass2){
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
      if (userInfo){
        console.log(userInfo)
      }
      wx.reLaunch({
        url: '/pages/login/login/login?identity=' + identity
      })
      // wx.switchTab({
      //   url: '/pages/home/home'
      // })
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
    }
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
    // errormsg:'您输入的账号或密码错误，请重新输入！',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var identity = options.identity;
    this.setData({
      identity: identity
    })
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
  onShareAppMessage: function () {

  }
})