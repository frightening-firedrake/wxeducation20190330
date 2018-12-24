// pages/studentService/ranking/ranking.js
const app = getApp()
Page({
  // 请求数据
  getdata(page = 1) {
    let that = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.ranking, //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        page: page,
        rows: 10
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        that.setData({
          rankingList: res.data.rows
        })
      },
      fail(res) {
        console.log(res.data)
        console.log(app.globalData.apiRoot)
      }
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    banner: {
      src: '/static/images/ranking/banner.jpg',
      mode: 'aspectFit'
    },
    scrollNav: [{
        title: "排名",
        state: 1,
        width: '25%'
      },
      {
        title: "学号",
        state: 2,
        width: '25%'
      },
      {
        // title: "微信号",
        title: "微信呢称",
        state: 3,
        width: '25%'
      },
      {
        title: "积分",
        state: 4,
        width: '25%'
      },
    ],
    rankingList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getdata();
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