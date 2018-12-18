// pages/xxsaid/policy/policy.js
//获取应用实例
const app = getApp()
Page({
  // 请求数据
  getdata() {
    this.setData({
      endLoading: true
    })
    var _this = this
    var params = {}
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.policy, //
      method: 'POST',
      data: {
        page: _this.data.page,
        rows: _this.data.rows,
        params: JSON.stringify(params),
      },
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (!res.data.rows.length) {
          if (res.data.total == 0) {
            _this.setData({
              empty: true,
              end: false,
              endLoading: false
            })
          } else {
            _this.setData({
              empty: false,
              end: true,
              endLoading: false
            })
          }
          return
        }
        res.data.rows.forEach((value, index) => {
          var obj = {}
          obj.date = value.createTime
          obj.content = value.title.substr(0, 37)
          obj.id = value.id
          _this.data.xwlbList.push(obj)
        })
        _this.setData({
          xwlbList: _this.data.xwlbList,
          page: _this.data.page - 0 + 1,
          empty: false,
          endLoading: false
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
      url: '/pages/newsDetails/newsDetails?api=' + app.globalData.api.policyDetails + '&id=' + event.currentTarget.dataset.id
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    end: false,
    endLoading: false,
    page: 1,
    rows: 7,
    empty: false,
    banner: {
      src: '/static/images/thoughtPolitical/zcfg.jpg',
      mode: 'aspectFit'
    },
    xwlbList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
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
    // console.log("onReachBottom")
    if (!this.data.end) {
      this.getdata()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
