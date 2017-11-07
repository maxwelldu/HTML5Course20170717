#小程序诞生之前
Web网站            手机端也可以访问（优点是不用下载，用户体验较差，不能充分发挥手机上的特性）
手机端的原生应用     （优点是用户体验极好，缺点是需要专业的iOS以及Android两波人开发，上线缓慢，更新慢; 对用户来说需要下载比较麻烦）
混合应用Hybrid       使用Web前端的技术写页面，使用cordova的js api调用原生应用的功能，不用写原生的代码（就不需要iOS和android的开发人员，只需要一名前端即可）；优点是更新速度快；缺点是依然是原生的应用
微信小程序           不用下载，基于混合式继续升级一上，不需要再下载

目录结构怎样的
html,css,js,config文件怎么书写
数据如何请求
弹窗的使用

注册帐号
新建项目，填写appid,不选中quick start项目
新建app.js app.json
新建pages目录
新建index node nodeinfo post topic userinfo页面
app.json当中配置一下所有的页面
每个页面的js文件中调用一下Page({})
页面中的json文件中写一对大括号
app.js 了解App() 生命周期函数 全局属性和方法；以及getApp()方法
页面中了解data属性存默认数据
onLoad在页面加载时做事情
wx.showToast()显示提示框
wx.request请求ajax数据
在后台中配置一下安全请求域名信息
清除前台的缓存
设置data的数据
wx.hideToast();
