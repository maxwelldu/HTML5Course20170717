import $_$ from '../../tools/api.js';
Page({
  data: {
    hot: [],
    new: [],
    selected: true,
    selected1: false
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  onLoad(options) {
    $_$.getHotTopics(res => {
      this.setData({
        hot: res.data,
      })
    });
    $_$.getLatestTopics(res => {
      this.setData({
        new: res.data,
      })
    })
  },
  navTo(e) {
    wx.navigateTo({
      url: '../post/post?postid=' + e.currentTarget.dataset.id
    })
  }
})
