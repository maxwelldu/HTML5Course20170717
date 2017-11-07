import $$ from '../../tools/api.js';

Page({
  data: {
    hot: [],
    new: []
  },
  onLoad(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    });

    $$.getHotTopics(res => {
      this.setData({
        hot: res.data
      })
    });
    $$.getLatestTopics(res => {
      this.setData({
        new: res.data
      });
      wx.hideToast();
    });
  },
  navTo(e) {
    wx.navigateTo({
      url: '../post/post?postid=' + e.currentTarget.dataset.id
    })
  }
})
