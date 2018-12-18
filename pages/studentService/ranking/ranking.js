// pages/studentService/ranking/ranking.js
Page({
  // 请求数据
  getdata() {
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.psychtest, //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        Authorization: app.globalData.Token,//验证登录信息用
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
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
    scrollNav: [
      { title: "排名", state: 1 , width:'25%' },
      { title: "学号", state: 2, width: '25%'},
      { title: "微信号", state: 3, width: '25%'},
      { title: "积分", state: 4, width: '25%'},
    ],
    rankingList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getdata();
    var rankingList = [
      { number: '1234567891', wxnumber: 'wx1234567891', score: 1003 },
      { number: '1234567892', wxnumber: 'wx1234567892', score: 900 },
      { number: '1234567893', wxnumber: 'wx1234567893', score: 879 },
      { number: '1234567894', wxnumber: 'wx1234567894', score: 663 },
      { number: '1234567895', wxnumber: 'wx1234567895', score: 555 },
      { number: '1234567896', wxnumber: 'wx1234567896', score: 520 },
      { number: '1234567897', wxnumber: 'wx1234567897', score: 519 },
      { number: '1234567898', wxnumber: 'wx1234567898', score: 320 },
      { number: '1234567899', wxnumber: 'wx1234567899', score: 77 },
      { number: '1234567890', wxnumber: 'wx1234567890', score: 56 },
    ];
    
    this.setData({
      rankingList: rankingList
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