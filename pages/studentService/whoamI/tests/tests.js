// pages/studentService/whoamI/tests/tests.js
//获取应用实例
const app = getApp()
Page({
  // radio事件
  radioChange: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.index)//可追溯到第几题
    // console.log('radio发生change事件，携带value值为：', e.detail.value)//该题选值
    var index = e.currentTarget.dataset.index;
    var result = JSON.parse(e.detail.value).result;
    var rank = JSON.parse(e.detail.value).rank;
    this.data.result[index] = result
    this.data.rank[index] = rank
    this.setData({
      result: this.data.result
    })
    var current = e.currentTarget.dataset.index - 0;
    var next = e.currentTarget.dataset.index-0 + 1;
    var animationCurrent = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationNext = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animationNext.translate3d(0, 0, 0).step()
    animationCurrent.translate3d(350, 0, -150).step()
    var animationData = this.data.animationData
    if (next !== this.data.tests.length){
      animationData[next] = animationNext.export()
      animationData[current] = animationCurrent.export()
    }
      this.setData({
        animationData: animationData
      })
  },
  pretest(e){
    console.log(e.currentTarget.dataset.index)
    var current = e.currentTarget.dataset.index - 0;
    var pre = e.currentTarget.dataset.index - 1;
    var animationCurrent = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var animationPre = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animationPre.translate3d(0, 0, 0).step()
    animationCurrent.translate3d(350, 0, -150).step()
    var animationData = this.data.animationData
    if (pre >=0) {
      animationData[current] = animationCurrent.export()
      animationData[pre] = animationPre.export()
    }
    this.setData({
      animationData: animationData
    })
  },
  submit(){
    // console.log(this.data.result)//结果集
    // console.log(this.data.rank)//结果登记
    var data={};
    data.openId = app.globalData.openId;
    data.testId = this.data.testId;
    data.rank = this.data.rank;
    data.type=1;
    this.submitResult(data)
    // 少个if判断题型暂时只做了单题
    wx.redirectTo ({
      url: '/pages/studentService/whoamI/psychtestResult/psychtestResult?result=' + this.data.result[this.data.result.length - 1] + '&id=' + this.data.testId
    })
  },
  // 提交结果
  submitResult(data){
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.submitResult1,
      method: 'POST',
      data: data,
      header: {
        // Authorization: app.globalData.Token,//验证登录信息用
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {

      },
      fail(res) {

      },
    })
  },
  // 请求数据测试题的
  getdata(id) {
    // this.setData({
    //   endLoading: true
    // })
    var _this = this
    wx.request({
      url: app.globalData.apiRoot + app.globalData.api.whoamItest,
      method: 'POST',
      data: {
        testId: id,
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
        
        var test={};
        test.content = res.data.topic;
        test.options = [];
        res.data.singleOption.forEach((value)=>{
          var option={};
          option.label = value.options;
          // option.value = value.result;
          // option.rank = value.rank;
          option.value = {};
          option.value.result = value.result;
          option.value.rank = value.rank;
          option.value = JSON.stringify(option.value);
          test.options.push(option);
        })
        _this.data.tests.push(test)
        _this.setData({
          tests: _this.data.tests,
        })
      },
      fail(res) {
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // tests:[
    //   {
    //     content: '1.这是一本古朴而怀旧的相册，当你轻轻翻开它时，映入眼帘的第一张照片是你躺在母亲的怀抱里，正美美地睡着。翻开下一张照片是你在爬来爬去的场景。那么，接下来的第三张你认为会是一幅什么样的照片呢？',
    //       options:[
    //         { value: 'A', label: 'A、你坐在床上，被很多绒毛小可爱的玩具包围着' },
    //         { value: 'B', label: 'B、你在浴缸里快乐洗澡、玩耍' },
    //         { value: 'C', label: 'C、坐着儿童学步椅，正在吃饭的你' },
    //         { value: 'D', label: 'D、母亲拉着你的手，你正在蹒跚地学走路' },
    //       ]
    //   },
    //   {
    //     content: '2.这是一本古朴而怀旧的相册，当你轻轻翻开它时，映入眼帘的第一张照片是你躺在母亲的怀抱里，正美美地睡着。翻开下一张照片是你在爬来爬去的场景。那么，接下来的第三张你认为会是一幅什么样的照片呢？',
    //     options: [
    //       { value: 'A', label: 'A、你坐在床上，被很多绒毛小可爱的玩具包围着' },
    //       { value: 'B', label: 'B、你在浴缸里快乐洗澡、玩耍' },
    //       { value: 'C', label: 'C、坐着儿童学步椅，正在吃饭的你' },
    //     ]
    //   },
    //   {
    //     content: '3.这是一本古朴而怀旧的相册，当你轻轻翻开它时，映入眼帘的第一张照片是你躺在母亲的怀抱里，正美美地睡着。翻开下一张照片是你在爬来爬去的场景。那么，接下来的第三张你认为会是一幅什么样的照片呢？',
    //     options: [
    //       { value: 'A', label: 'A、你坐在床上，被很多绒毛小可爱的玩具包围着' },
    //       { value: 'B', label: 'B、你在浴缸里快乐洗澡、玩耍' },
    //     ]
    //   },
    //   {
    //     content: '4.这是一本古朴而怀旧的相册，当你轻轻翻开它时，映入眼帘的第一张照片是你躺在母亲的怀抱里，正美美地睡着。翻开下一张照片是你在爬来爬去的场景。那么，接下来的第三张你认为会是一幅什么样的照片呢？',
    //     options: [
    //       { value: 'A', label: 'A、你坐在床上，被很多绒毛小可爱的玩具包围着' },
    //       { value: 'B', label: 'B、你在浴缸里快乐洗澡、玩耍' },
    //       { value: 'C', label: 'C、坐着儿童学步椅，正在吃饭的你' },
    //       { value: 'D', label: 'D、母亲拉着你的手，你正在蹒跚地学走路' },
    //     ]
    //   },
    // ],
    // animationData:[{},{},{},{},],
    // result:"你属于:你的衰老速度属于'大众型'"
    tests:[],
    animationData: [],
    result:[],
    rank:[],
    testId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.setData({
      testId:options.id
    })
    this.getdata(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    animation.translate3d(0, 0, 0).step()
    var animationData = this.data.animationData
    animationData[0] = animation.export()
    this.setData({
      animationData: animationData
    })
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