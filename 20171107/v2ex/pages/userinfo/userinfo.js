import $_$ from '../../tools/api.js';

Page({
  data: {
    userinfo: {},
    userpost: []
  },
  onLoad(options) {
    $_$.getUserinfoByUsername(options.username, res => {
      console.log(res);
      this.setData({
        userinfo: res.data
      })
    });
    $_$.getTopicsByUsername(options.username, res => {
      console.log(res);
      this.setData({
        userpost: res.data
      })
    });
  },
  navTo(e) {
    wx.navigateTo({
      url: '../post/post?postid=' + e.currentTarget.dataset.id
    })
  }
})
