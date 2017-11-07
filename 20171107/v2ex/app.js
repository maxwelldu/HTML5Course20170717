App({
  onLaunch() {
    console.log("启动了");
  },
  onShow() {
    console.log("显示了");
  },
  onHide() {
    console.log('隐藏了');
  },
  onError(msg) {
    console.log("发生错误了" + msg);
  }
})