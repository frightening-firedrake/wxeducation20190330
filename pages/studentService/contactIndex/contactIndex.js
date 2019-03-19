// pages/studentService/contactIndex/contactIndex.js
//获取应用实例
const app = getApp()
Page({
  // 获取数据
  getContactIndex() {
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.contactIndex, //
      // method:'POST',
      data: {
        // ACCESS_TOKEN: ACCESS_TOKEN,
        // "type": "news",
      },
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var list1 = [];
        var list2 = [];
        res.data.rows.forEach((value)=>{
          var obj={};
          obj.id = value.id;
          obj.name = value.organizationName;
          if(value.type==1){
            list1.push(obj)
          } else if (value.type == 2){
            list2.push(obj)
          }
        })
        _this.setData({
          list1: list1,
          list2: list2,
        })
      },
      fail(res) {
      }
    })
  },
  // 点击校园互动详情
  tapview(event) {
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/studentService/contactIndex/contactIndexDetails/contactIndexDetails?id=' + event.currentTarget.dataset.id + '&name=' + event.currentTarget.dataset.name
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    list1:[],
    list2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContactIndex()
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
    return {
      path: '/pages/home/home'
    }
  }
})