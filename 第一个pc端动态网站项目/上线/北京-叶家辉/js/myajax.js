(function(){
  //唯一向外暴露一个顶层变量
  var myajax = window.myajax = {};
  //作者、版本号信息
  myajax.author = "maxwelldu";
  myajax.version = "1.0.0";

  //这个对象有两个方法，一个get,一个post
  myajax.get = function(URL, queryJSON, callback) {
    //创建xhr对象，解决兼容性问题
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
    } else {
      var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //结果返回之后要做的事情
    xhr.onreadystatechange = function() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          callback && callback(null, xhr.responseText);
        } else {
          callback && callback(new Error("没有要请求的文件"), undefined);
        }
      }
    };
    //拼接字符串
    var queryString = myajax._queryjson2querystring(queryJSON);
    //配置
    xhr.open('GET', URL + "?" + queryString, true);
    //发送
    xhr.send(null);
  }

  myajax.post = function(URL, queryJSON, callback) {
    //创建xhr对象，解决兼容性问题
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
    } else {
      var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //结果返回之后要做的事情
    xhr.onreadystatechange = function() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          callback && callback(null, xhr.responseText);
        } else {
          callback && callback(new Error("没有要请求的文件"), undefined);
        }
      }
    };
    //拼接字符串
    var queryString = myajax._queryjson2querystring(queryJSON);
    //配置
    xhr.open('POST', URL, true);
    //发送
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    xhr.send(queryString);
  }



  //内部函数，查询json变成查询字符串
  //输入一个{"name":"max", "age":18, "sex":"男"}
  //返回一个name=max&age=18&sex=%E8%C6%B6
  myajax._queryjson2querystring = function(json) {
    var arr = [];
    for (var k in json) {
      arr.push(k + '=' + encodeURIComponent(json[k]));
    }
    return arr.join('&');

  }
})();
