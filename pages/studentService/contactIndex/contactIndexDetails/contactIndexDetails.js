// pages/studentService/contactIndex/contactIndexDetails/contactIndexDetails.js
//获取应用实例
const app = getApp()
Page({
  // 获取数据
  getContactIndexDetails(id) {
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.contactIndexDetails, //
      method:'POST',
      data: {
        // ACCESS_TOKEN: ACCESS_TOKEN,
        "id": id,
      },
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        var list = [];
        res.data.forEach((value) => {
          var obj = {};
          obj.id = value.id;
          obj.name = value.positionName;
          obj.phone = value.phone;
          obj.place = value.adress;
          list.push(obj);
        })
        _this.setData({
          list: list,
          createTime: res.data[0].createTime,
          author: res.data[0].articleSource,
        })
      },
      fail(res) {
      }
    })
  },
  // 打电话
  call(event){
    var phone = event.currentTarget.dataset.phone;
    if(phone){
      phone = phone.toString()
    }else{
      return
    }
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    title:"党委办公室",
    list:[
      // { id: 1, name: '党办(宣传部)主任(部长)室', phone: 85960886, place: '逸夫楼430室' },
      // { id: 2, name: '副主任(副部长)室', phone: 85960884, place: '逸夫楼433室' },
      // { id: 3, name: '党办(宣传部)办公室①', phone: 85960883, place: '逸夫楼432室' },
      // { id: 4, name: '党办(宣传部)办公室②', phone: 85960882, place:'逸夫楼430室'},
    ],
    author:'',
    createTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContactIndexDetails(options.id)
    this.setData({
      title: options.name
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
    return {
      path: '/pages/home/home'
    }
  }
})