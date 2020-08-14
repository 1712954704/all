//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '轮播图',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    host: "https://fast.xioabuding.top",
    list: '12312'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  nav: function(){
    wx.navigateTo({
      url: '../nav/nav'
    })
  },
  slide: function(){
    wx.navigateTo({
      url: '../slideshow/slideshow'
    })
  },
  vote: function(event){
    // console.log('vote')
    if(event.currentTarget.dataset.id){
      // this.onLoad()
      var that = this; //注意this指向性问题
      var urlStr = that.data.host + "/applet/index/like"; //请求连接注意替换（我用本地服务器模拟）
      wx.request({
        method: 'GET',
        url: urlStr,
        data: {//这里放请求参数，如果传入参数值不是String，会被转换成String
          id: event.currentTarget.dataset.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if(res.data.code == 200){
            that.onLoad()
          }
        }
      })
    }

  },
  onLoad: function () {
    // 获取list信息
    console.log('request')
    var that = this; //注意this指向性问题
    var urlStr = that.data.host + "/applet/index/list"; //请求连接注意替换（我用本地服务器模拟）
    wx.request({
      method: 'GET',
      url: urlStr,
      data: {//这里放请求参数，如果传入参数值不是String，会被转换成String
        // x: '',
        // y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data);
        // console.log(data.code);
        that.setData({
          list: res.data.data
        })
        console.log(that.data)
      }
    })

    if (app.globalData.userInfo) {
      // console.log(app.globalData.userInfo)  // 用户信息
      // console.log(wx.login())               // 登录接口 返回 code
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
