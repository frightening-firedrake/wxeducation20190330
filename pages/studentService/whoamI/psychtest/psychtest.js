// pages/studentService/whoamI/whoamI.js
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
  begintest(){
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
    psychtest:{
      id:168,
      title:'童年缺爱指数评估',
      img:'/static/images/home/xlcs.png',
      info:'童年的情感缺失，造成了今天怎么样的你？',
      readingTimes:'108',
      data:'2018/10/01'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getdata();
    var xlcsList = [
      {
        id: 1, src: '/static/images/psychtest/img1.png', title: '心理压力测试', content: '测测你的心里压力超标了吗？', date: '2018-10-01'
      },
      {
        id: 2, src: '/static/images/psychtest/img2.png', title: '童年缺爱指数评估', content: '童年的情感缺失，造成了今天怎么样的你？', date: '2018-10-01'
      },
      { id: 3, src: '/static/images/psychtest/img3.png', title: '心里敏感度评估', content: '你对待人于事的反应隐藏了什么秘密？', date: '2018-10-01' },
      { id: 4, src: '/static/images/psychtest/img4.png', title: '心理压力测试', content: '测测你的心里压力超标了吗？', date: '2018-10-01' },
      { id: 5, src: '/static/images/psychtest/img5.png', title: '童年缺爱指数评估', content: '童年的情感缺失，造成了今天怎么样的你？', date: '2018-10-01' },
      { id: 6, src: '/static/images/psychtest/img6.png', title: '心里敏感度评估', content: '你对待人于事的反应隐藏了什么秘密？', date: '2018-10-01' },
      {
        id: 1, src: '/static/images/psychtest/img1.png', title: '心理压力测试', content: '测测你的心里压力超标了吗？', date: '2018-10-01'
      },
    ];
    xlcsList.map((value) => {
      value.content = value.content.substr(0, 19)
      value.title = value.title.substr(0, 14)
      return value
    })
    this.setData({
      xlcsList: xlcsList
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
    this.setData({
      endLoading: true
    })
    setTimeout(() => {

      var xlcsList = [
        {
          id: 1, src: '/static/images/psychtest/img1.png', title: '心理压力测试', content: '测测你的心里压力超标了吗？', date: '2018-10-01'
        },
        {
          id: 2, src: '/static/images/psychtest/img2.png', title: '童年缺爱指数评估', content: '童年的情感缺失，造成了今天怎么样的你？', date: '2018-10-01'
        },
        { id: 3, src: '/static/images/psychtest/img3.png', title: '心里敏感度评估', content: '你对待人于事的反应隐藏了什么秘密？', date: '2018-10-01' },
      ];
      if (this.data.num < 4) {
        xlcsList.forEach((value) => {
          value.content = value.content.substr(0, 19)
          value.title = value.title.substr(0, 14)
          this.data.xlcsList.push(value)
        })
        this.setData({
          xlcsList: this.data.xlcsList,
          num: this.data.num + 1,
          endLoading: false
        })
      } else {
        this.setData({
          end: true,
          endLoading: false
        })
      }

    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})