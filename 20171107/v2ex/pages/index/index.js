// 导入api.js这个模块，赋值给$$
import $_$ from '../../tools/api.js';

Page({
  //用来存储数据
  data: {
    hot: [],
    new: []
  },
  //页面加载时执行
  onLoad(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    });

    $_$.getHotTopics(res => {
      this.setData({
        hot: res.data
      })
    });
    $_$.getLatestTopics(res => {
      this.setData({
        new: res.data
      });
      wx.hideToast();
    });
  },
  // 页面跳转事件绑定的函数
  navTo(e) {
    wx.navigateTo({
      //跳转到相对的页面地址，以及传参
      url: '../post/post?postid=' + e.currentTarget.dataset.id
    })
  }
})
