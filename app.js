 //app.js
App({
  onLaunch: function () {
    console.log('开发文档 https://developers.weixin.qq.com/miniprogram/dev/index.html')//打开控制台连接进入开发文档
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: this.globalData.apiRoot + this.globalData.api.getOpenId, //仅为示例，并非真实的接口地址
          // method:'POST',
          data: {
            code: res.code
          },
          header: {
            // Authorization: app.globalData.Token,//验证登录信息用
            'content-type': 'application/json' // 默认值
          },
          success:res=> {
            this.openId = res.openId
          },
          fail(res) {

          }
        })
        // console.log('启动去取openId',res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息我不懂这方法的存在意义不是有opendata吗？
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    // apiRoot: 'https://www.baidu.com/',//鬼抽疯了想把api全独立出来管理真是作死
    // apiRoot: 'http://192.168.1.252:8083/educationSystem/',//zhoumingkun
      apiRoot: 'http://192.168.1.253:8080/educationSystem/',//lijianbo
    api:{
      getOpenId:'wechat/getOpenId',
      ACCESS_TOKEN: "weixinContent/getToken", //获取ACCESS_TOKEN
      interact: 'weixinContent/getContent',//首页tab校园互动	校园互动获取微信公众号发布的学生文章
      hot: 'activity/findNew',//首页tab活动动态热门	活动动态最新发布的活动动态显示在首页

      thoughtPoliticalList: 'sizhengjianshe/data',//思政建设列表
      // 思政建设列表	思政建设管理发布的文章列表
      thoughtPoliticalDetails: 'sizhengjianshe/getById',//偏向于通用的文章详情页
      // 思政建设详情	思政建设管理发布的文章详情（来源阅读次数日期）
      activity: 'activity/data',//活动动态
      // 活动动态列表	活动动态管理发布的文章列表
      activityDetails: 'activity/getById',//活动动态详情
      // 活动动态详情	活动动态管理发布的文章详情（来源阅读次数日期）
      policy: 'zhengcefagui/data',//政策法规
      // 政策法规列表	政策法规管理发布的文章列表
      policyDetails: 'zhengcefagui/getById',//偏向于通用的文章详情页
      // 政策法规详情	政策法规管理发布的文章详情（来源阅读次数日期）
      rules: 'guizhangzhidu/data',//规章制度
      // 规章制度列表	规章制度管理发布的文章列表
      rulesDetails: 'guizhangzhidu/getById',//偏向于通用的文章详情页
      // 规章制度详情	规章制度管理发布的文章详情（来源阅读次数日期）
      contactIndex: 'xiaoyuanhuangye/data',//校园黄页
      // 校园黄页第一个页面	显示所有的联系机构
      contactIndexDetails: 'xiaoyuanhuangye/findAllDepartment',//校园黄页详情
      // 校园黄页第二个页面	显示该机构办公室的所有联系方式
      whoamI: 'test/data',//认识自我
      // 认识自我列表页	所有测试题列表页（有筛选）
      whoamIabstract: 'test/get',//认识自我摘要大标题
      // 认识自我某道题页	标题，图片，摘要阅读次数发布时间
      whoamIMore: 'test/data',//认识自我摘要大标题
      // 认识自我的列表页	认识自我题简介页面下的其他题
      whoamItest: 'topic/findTopicAndSingleOption',//认识自我测试题
      // 认识自我题与选项页面	认识自我题目与选项页面
      minetab: 'account/getIntegral',//我的tab
      // 当前积分获取	当前积分获取
      sing:'account/signIn',
      // 签到领积分	签到一天只能签到一次
      ranking:'account/data',
      // 积分排行榜	积分排行榜列表学号，微信号，积分
      studentServicetab: 'studentServicetab',//学生服务tab 没用到
      thoughtPolitical: 'thoughtPoliticaltab',//思政建设tab 没用到
      dangfei: 'dangfei',//党费上缴 没用到
      tuanfei: 'tuanfei'//团费上缴 没用到
    },
    Token:'Token',
    userInfo: null,
    is_qiandao:false,
    openId:'',
    score:806,
    number: 18100320,
  }
})