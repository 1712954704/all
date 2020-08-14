//vote.js
const util = require('../../utils/util.js')

Component({

  behaviors: [],

  properties: {
    myProperty: { // 属性名
      type: String,
      value: ''
    },
    myProperty2: String // 简化的定义方式
  },

  data: {
    text: '测试',
    host: "http://www.fastadmin.test",
    carouselList:[],
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log('slide');
    },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    console.log('vote');
    //this.requestCarouselListData();//请求轮播图
  }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    //请求轮播图
    requestCarouselListData: function(){
      var that = this; //注意this指向性问题
      var urlStr = that.data.host + "/applet/index/slide"; //请求连接注意替换（我用本地服务器模拟）
      console.log("请求轮播图：" + urlStr);
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
          console.log("轮播图返回值：");
          // console.log(res);
          console.log(res.data.data);
          // var data = JSON.parse(res.data)
          // console.log(data.code);
          that.setData({
            carouselList: res.data.data
          })
        }
      })
    },
    onMyButtonTap: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function(){
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function(newVal, oldVal) {

    }
  }
})