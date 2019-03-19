// pages/schoolInteract/interact/interact.js
//获取应用实例
const app = getApp()
Page({
  // 请求数据
  getdata(api,id) {
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + api, //
      method: 'POST',
      data: {
        id: id,
      },
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        var news=res.data;
        news.content=news.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
        _this.setData({
          news: news,
        })
      },
      fail(res) {
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    news:{
      title: '',
      content: '',
      author: '',
      hits: '',
      createTime:'',
      articleSource:'',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata(options.api,options.id)
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
    console.log('onPullDownRefresh')
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
    return {
      path: '/pages/home/home'
    }
  }
})