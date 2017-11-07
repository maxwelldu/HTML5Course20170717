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

    wx.request({
      url: 'https://www.v2ex.com/api/topics/hot.json',
      method: 'GET',
      success: (res) => {
        this.setData({
          hot: res.data
        })
      }
    });
    wx.request({
      url: 'https://www.v2ex.com/api/topics/latest.json',
      method: 'GET',
      success: (res) => {
        this.setData({
          new: res.data
        });
        wx.hideToast();
      }
    })
  }
})
