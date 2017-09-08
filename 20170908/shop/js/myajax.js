(function(){
  //唯一向外暴露一个顶层变量
  var myajax = window.myajax = {};
  //作者、版本号信息
  myajax.author = "maxwelldu";
  myajax.version = "1.0.0";

  //这个对象有两个方法，一个get,一个post
  //如果ajax请求是get请求，就调用这个方法
  //URL就是api的地址，queryJSON是要请求的参数的对象形式，callback是响应数据的回调
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
        //status是http的响应状态码 2开头的都是没问题，304表示没有修改
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          //第一个参数是错误信息，null
          //第二个参数是返回的结果json格式的字符串
          callback && callback(null, xhr.responseText);
        } else {
          callback && callback(new Error("没有要请求的文件"), undefined);
        }
      }
    };
    //拼接字符串
    var queryString = myajax._queryjson2querystring(queryJSON);
    //配置
    //http://h6.duchengjiu.top/shop/api_cat.php?a=1&b=2
    console.log(queryString);
    xhr.open('GET', URL + "?" + queryString);
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

function getQueryString(name) {
  var search = location.search.substr(1);
  //abc=123&a=&ccc=abc
  //(^|&)   (&|$)
  //abc=([^&]*)
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var result = search.match(reg);
  // if (result === null) return null;
  // return decodeURIComponent(result[2]);
  return result === null ? null : decodeURIComponent(result[2]);
}

//表单序列化
function serializeForm(oForm) {
  //得到所有的元素
  var elems = oForm.elements;
  var arr = {};
  for (var i = 0; i < elems.length; i++) {
    //当前遍历的小元素
    var e = elems[i];
    //分类讨论
    switch(e.type) {
      //如果控件的类型是按钮，那么没有任何返回值
      case 'button':
      case 'submit':
      case 'reset':
        break;
      //如果是文本框，得到value
      case 'text':
      case 'password':
      case 'textarea':
        arr[e.name] = e.value;
        break;
      //如果是单选或复选
      case 'radio':
      case 'checkbox':
        if (e.checked) {
          arr[e.name] = e.value;
        }
        break;
      case "select-one":
        var options = e.querySelectorAll('option');
        for (var j = 0; j < options.length; j++) {
          if (options[j].selected) {
            arr[e.name] = options[j].value;
          }
        }
        break;
    }
  }
  return arr;
}
