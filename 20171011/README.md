所有的 ajax封装起来放到一个对象里面
var api = {
  prefix: 'http://h6.duchengjiu.top/shop/',
  login: function(data, success){
    $.ajax({
      url: this.prefix + 'api_user.php',
      type: 'GET',
      data: data,
      success: success
    })
  }
};

登录页面调用：
api.login({'username':'abc', 'password':'abc'}, function(data) {
  //登录后的事情
});
