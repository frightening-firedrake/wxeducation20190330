// pages/studentService/studentServicetab.js
//获取应用实例
const app = getApp()
Page({
  // 请求数据
  getdata(ACCESS_TOKEN) {
    this.setData({
      endLoading: true
    })
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.interact,
      data: {
        ACCESS_TOKEN: ACCESS_TOKEN,
        // "type": "news",
        "offset": this.data.offset,
        "count": this.data.count
      },
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (!res.data.length) {
          if (!_this.data.xyhdList.length) {
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

        res.data.forEach((value) => {
          var obj = {}
          obj.src = value.thumb_url
          obj.date = value.createTime
          obj.content = value.title.substr(0, 25)
          obj.id = value.url
          _this.data.xyhdList.push(obj)
        })
        var newOffset = _this.data.offset - 0 + _this.data.count
        _this.setData({
          xyhdList: _this.data.xyhdList,
          offset: newOffset,
          empty: false,
          endLoading: false
        })
      },
      fail(res) {
        // console.log(res.data)
        // console.log(app.globalData.apiRoot)
      }
    })
  },
  // 转发ACCESS_TOKEN
  getACCESS_TOKEN() {
    // console.log(this)
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.ACCESS_TOKEN, //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.getdata(res.data)
      },
      fail(res) {
        console.log(res.data)
      }
    })
  },
  // 点击校园互动详情
  tapview(event) {
    var urlStr = event.currentTarget.dataset.id
    urlStr = encodeURIComponent(urlStr)
    wx.navigateTo({
      url: '/pages/schoolInteract/interact/interact?urlStr=' + urlStr
    })
  },
  // 点击标签连接
  taptag(event) {
    var url = event.currentTarget.dataset.tag
    if (url == 'modalqd') {
      if (!app.globalData.is_qiandao) {
        app.globalData.score = app.globalData.score - 0 + 2
        this.setData({
          modalqd: true
        })
        app.globalData.is_qiandao = true;
      } else {
        wx.showToast({
          title: '今日已签到',
          duration: 2000
        })
      }
      return
    }
    if (url) {
      wx.navigateTo({
        url: url
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    empty: false,
    end: false,
    endLoading: false,
    modalqd: false,
    offset: 0,
    count: 10,
    banner: {
      src: '/static/images/studentService/studentService.jpg',
      mode: 'aspectFit'
    },
    taglist1: {
      title: 'xx有话说',
      items: [
        { src: '/static/images/studentService/icon1.png', text: '校园黄页', tag: '/pages/studentService/contactIndex/contactIndex' },
        { src: '/static/images/studentService/icon2.png', text: '认识自我', tag: '/pages/studentService/whoamI/whoamI' },
        // { src: '/static/images/studentService/icon3.png', text: '党费上缴', tag: '/pages/studentService/dangfei/dangfei' },
        // { src: '/static/images/studentService/icon4.png', text: '团费上缴', tag: '/pages/studentService/tuanfei/tuanfei' },
        { src: '/static/images/studentService/icon3.png', text: '签到领积分', tag: 'modalqd' },
        { src: '/static/images/studentService/icon4.png', text: '积分排行榜', tag: '/pages/studentService/ranking/ranking' },
      ]
    },
    xyhdList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getACCESS_TOKEN()

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
      this.getACCESS_TOKEN()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})