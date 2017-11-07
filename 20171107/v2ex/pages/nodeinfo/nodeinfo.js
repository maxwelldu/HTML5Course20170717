import $_$ from '../../tools/api.js';
Page({
  data: {
    nodeinfo: {},
    nodepost: []
  },
  onLoad(options) {
    $_$.getNodeInfoById(options.nodeid, res => {
      this.setData({
        nodeinfo: res.data
      })
    });
    $_$.getTopicsByNodeId(options.nodeid, res => {
      this.setData({
        nodepost: res.data
      })
    });
  },
  navTo(e) {
    wx.navigateTo({
      url: '../post/post?postid=' + e.currentTarget.dataset.id
    })
  }
})
