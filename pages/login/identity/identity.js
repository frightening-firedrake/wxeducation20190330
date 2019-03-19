// pages/login/identity/identity.js
Page({
  selectID(e){
    var ID = e.currentTarget.dataset.id;
    this.setData({
      id: ID
    })
  },
  tologin(){
    if (!this.data.id){
      return
    } else if (this.data.id=='工号'){
      this.setData({
        'modal.show': true
      })
    }else{
      var identity = this.data.id.substr(0,2)
      wx.navigateTo({
        // url: '/pages/login/login/login?identity=' + identity
        url: '/pages/login/register/register?identity=' + identity
      })
    }
  },
  closeModal(){
    this.setData({
      'modal.show': false,
      id:'工号',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    modal:{
      show:false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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