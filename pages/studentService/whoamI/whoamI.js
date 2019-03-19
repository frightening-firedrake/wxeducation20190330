// pages/studentService/whoamI/whoamI.js
//获取应用实例
const app = getApp()
Page({
  // 请求数据
  getdata(type,reset) {
    var _this = this
    var params = {}
    if(type!=-1){
      params.type=type
    }
    if (reset) {
      _this.setData({
        xlcsList:[],
        page: 1,
        end:false,
      })
    } else {
      this.setData({
        endLoading: true
      })
    }
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.whoamI, 
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
          obj.title = value.title.substr(0, 14)
          obj.content = value.summarize.substr(0, 19)
          obj.id = value.id
          obj.src = app.globalData.apiRoot +'upload/picture/'+value.image
          _this.data.xlcsList.push(obj)
        })
        _this.setData({
          xlcsList: _this.data.xlcsList,
          page: _this.data.page - 0 + 1,
          empty: false,
          endLoading: false
        })
      },
      fail(res) {
      }
    })
  },
  tapnav(e){
    // taptag(e){
    //   var url = e.currentTarget.dataset.tag
    // console.log(e.target.dataset.num)
    var navLeft = 30 + e.target.dataset.num*20+"%"
    // console.log(navLeft)
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    animation.left(navLeft).step()
    this.setData({
      animationLine: animation.export(),
      _num: e.target.dataset.num,
    })
    var type = e.target.dataset.state;
    // console.log(type)
    this.setData({
      type: type,
    })
    this.getdata(type,true)
      // navLeft: navLeft
  },
  // 点击校园互动详情
  tapview(event) {
    // console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/studentService/whoamI/psychtest/psychtest?id=' + event.currentTarget.dataset.id+'&type='+this.data.type
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    _num: -1,
    navLeft:"10%",
    end: false,
    endLoading: false,
    page: 1,
    rows: 7,
    empty: false,
    type:-1,
    banner: {
      src: '/static/images/psychtest/banner.jpg',
      mode: 'aspectFit'
    }, 
    scrollNav:[
      { title: "性格", state: 1 },
      { title: "情感", state: 2 },
      { title: "健康", state: 3 },
      { title: "人际", state: 4 },
      // { title: "趣味", state: 5 },
      // { title: "游戏", state: 6 }
    ],
    xlcsList: [],
    animationLine:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata(-1,false);
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
    if (!this.data.end) {
      this.getdata(this.data.type, false)    
    }
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