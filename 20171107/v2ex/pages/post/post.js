import $_$ from '../../tools/api.js';

Page({
  data: {
    post: {},
    comments: []
  },
  onLoad(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    });
    $_$.getTopicById(options.postid, res => {
      res.data[0].created = new Date(res.data[0].created * 1000);
      this.setData({
        post: res.data[0]
      });
      wx.hideToast();
    });

    $_$.getRepliesByTopicId(options.postid, res => {
      console.log(res);
      this.setData({
        comments: res.data
      });
    });
  },
  navTo(e) {
    wx.navigateTo({
      url: '../userinfo/userinfo?username=' + e.currentTarget.dataset.username
    })
  }
})
