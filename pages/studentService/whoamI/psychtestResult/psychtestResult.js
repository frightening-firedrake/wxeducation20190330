// pages/studentService/whoamI/psychtestResult/psychtestResult.js
//获取应用实例
const app = getApp()
Page({
  // 请求数据main
  getdata(id) {
    // this.setData({
    //   endLoading: true
    // })
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.whoamIabstract,
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
        // if (!res.data.rows.length) {
        //     _this.setData({
        //       endLoading: false
        //     })
        //   return
        // }
        _this.setData({
          'psychtest.id': id,
          'psychtest.title': res.data.title,
          'psychtest.img': app.globalData.apiRoot + 'upload/picture/' + res.data.image,
          'psychtest.info': res.data.summarize,
          'psychtest.readingTimes': res.data.hits,
          'psychtest.data': res.data.createTime,
        })
      },
      fail(res) {
      }
    })
  },
  // 请求数据列表的
  getdataList(type, reset, id) {
    var _this = this
    var params = {}
    // if (type != -1) {
    //   params.type = type
    // }
    params.excludeId = id
    if (reset) {
      _this.setData({
        endLoading: false,
        xlcsList: [],
        page: 1,
      })
    } else {
      _this.setData({
        endLoading: true
      })
    }
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.whoamIMore,
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
          obj.src = app.globalData.apiRoot + 'upload/picture/' + value.image
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
  tapnav(e) {
    // taptag(e){
    //   var url = e.currentTarget.dataset.tag
    // console.log(e.target.dataset.num)
    var navLeft = 30 + e.target.dataset.num * 20 + "%"
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
    // navLeft: navLeft
  },
  // 点击校园互动详情
  tapview(event) {
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/studentService/whoamI/psychtest/psychtest?id=' + event.currentTarget.dataset.id
    })
  },
  //开始测试
  begintest() {
    wx.navigateTo({
      url: '/pages/studentService/whoamI/tests/tests?id=' + this.data.psychtest.id + '&title=' + this.data.psychtest.title
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    _num: -1,
    navLeft: "10%",
    end: false,
    endLoading: false,
    page: 1,
    rows: 7,
    empty: false,
    type: -1,
    // banner: {
    //   src: '/static/images/psychtest/banner.jpg',
    //   mode: 'aspectFit'
    // },
    // scrollNav: [
    //   { title: "性格", state: 1 },
    //   { title: "情感", state: 2 },
    //   { title: "健康", state: 3 },
    //   { title: "人际", state: 4 },
    //   { title: "趣味", state: 5 },
    //   { title: "游戏", state: 6 }
    // ],
    xlcsList: [],
    // animationLine: {},
    // psychtest: {
    //   id: 168,
    //   title: '童年缺爱指数评估',
    //   img: '/static/images/home/xlcs.png',
    //   info: '童年的情感缺失，造成了今天怎么样的你？',
    //   readingTimes: '108',
    //   data: '2018/10/01'
    // },
    // res:{
    //   title:"你属于:你的衰老速度属于“大众型”",
    //   content:"尽管还算不错，但是可进一步采取措施缓解衰老，同时减少疾病危险。目前要采取的抗衰老措施很多，应增强自信，能够改善健康，降低衰老速度。",
    // },
    psychtest: {
      id: '',
      title: '',
      img: '',
      info: '',
      readingTimes: '',
      data: ''
    },
    id: '',
    res:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata(options.id);
    this.setData({
      type: options.type,
      id: options.id,
      res: options.result
    })
    this.getdataList(this.data.type, false, this.data.id)
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
      this.getdataList(this.data.type, false, this.data.id)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})