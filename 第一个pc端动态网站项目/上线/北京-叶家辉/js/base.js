//arr:指要移除的元素数组，attr，要移除的属性，该属性的原始值
function removeAttr(arr,attr,value){
    for(var i=0;i<arr.length;i++){
        if(attr=="backgroundColor"||attr=="color"){
            arr[i].style[attr]=value;
        }
    }
}

// 获取元素的非行内样式(样式表，style标签内的样式)
//获取浏览器的计算后的样式(可以获取所有的样式)
function getStyle(obj,attr) {

  // 如果是新版本浏览器的话
  if(window.getComputedStyle) {
    attr = attr.replace(/[A-Z]/, function(match) {
      return '-' + match.toLowerCase();
  });
    return window.getComputedStyle(obj)[attr];
  } else {
    attr = attr.replace(/-(a-z)/, function(match1,$1) {
      return $1.toUpperCase();
    });
    return obj.currentStyle[attr];
  }
}

//隐藏元素
function hidden(obj){
    obj.style.display="none";
}

//显示元素
function show(obj){
    obj.style.display="block";
}


//这个函数的功能是为了，给特定的标签添加上样式类,传入的参数是，objArr:一个类数组的dom对象，index：只要添加样式的特定标签的索引号，
//cName：是要添加的类名
function changeClass(objArr,index,cName) {
    for(var i = 0; i < objArr.length; i++){
        objArr[i].classList.remove(cName);
    }
    objArr[index].classList.add(cName);
}


//这个方法的功能就是传入一个函数,和延时的时间，context表示上下文指针，让该函数延迟对少秒执行,
// 由于在每次调用前都clearTimeout(fn.timer);了所以这里不会产生多个定时器
//fn值你要截流的函数，time是截留的时间,obj是函数的参数,contact表示上下文指针，若不传值则表示，默认设置为null，(函数截流)
function throttleFun(fn,time,obj,context) {
  context = context || null;
  clearTimeout(fn.timer);
  // 将传入的参数对象转化为数组
  var arr=[];
  for (var k in obj) {
    arr.push(obj[k]);
  }
  //console.log(arr);
  fn.timer = setTimeout(function() {
    fn.apply(context,arr);
  },time)
}

//绑定事件的方法：obj表示事件源，type表示绑定的事件,fn表示事件处理程序
function addEvent(obj,type,fn) {
  if(obj.addEventListener) {
    obj.addEventListener(type,fn,false);
  }else if(obj.attachEvent) {
    obj.attachEvent('on'+type,function() {
      fn.call(obj);    //由于利用attachEvent绑定的事件中的this指向的是window,这里我们包裹了一个函数来改变fn函数里this的指向
    })
  }else {
    obj['on'+type] = fn;
  }
}

//返回这个元素在页面中的净位置
//就是这个元素所有的offsetParent的offsetTop值的和
function getAllTop(obj) {
  var allTop = obj.offsetTop;
  var currentObj = obj;
  while((currentObj = currentObj.offsetParent)){
    allTop += currentObj.offsetTop;
  }
  return allTop;
}

function getAllLeft(obj) {
  var allLeft = obj.offsetLeft;
  var currentObj = obj;
  while((currentObj = currentObj.offsetParent)){
    allLeft += currentObj.offsetLeft;
  }
  return allLeft;
}


// 得到鼠标滚轮滚动的方向值：1表示向前，-1表示向后,参数是传入的event对象
function mousewheelHandler(event) {
  if (event.wheelDelta) {
    var direction = event.wheelDelta > 0 ? 1 : -1;
  } else if (event.detail) {        // 为了兼容火狐
    var direction = event.detail > 0 ? -1 : 1;
  }
  return direction;
}
//利用正则匹配查询字符串,并返回向相应的值
function matchQueryString(str) {
  var queryString = location.search.substr(1);
  var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
  var backStr = queryString.match(reg);
  if(backStr === null) return null;
  return decodeURIComponent(backStr[2]);             // decodeURIComponent()是为了转化中文字符
}


function serializeForm(obj){
  //得到所有的元素
  var elems = obj.elements;
  //结果数组
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






