function $(selector) {
  return new $.fn.init(selector);
}

//fn 相当于是放一堆function的集合
$.fn = {
  //这个方法作为构造函数，$()的时候返回这个构造函数的实例对象
  //这个方法只在$()的时候会自动调用，其他时候不调用，目的是能够拿到所有的元素并放到实例后的对象上面
  init: function(selector) {
    //往实例化的对象上面放一系列的元素，并且放一个length属性, 相当于模拟的一个数组对象
    //arr[0] = 1, arr[1] = 2; arr.length
    //构造函数里面的this是新实例化出来的那个对象
    var elems = document.querySelectorAll(selector);
    this.length = elems.length;
    for (var i = 0; i < elems.length; i++) {
      //中括号里面放的任何元素，最终都会转换成字符串
      this[i] = elems[i];
    }
  },
  html: function(html) {
    //如何在这里访问到之前存储在$.fn.init实例化出的对象身上的所有元素
    console.log(this);
    //遍历当前对象，去设置内容即可
    for (var i = 0; i < this.length; i++) {
      this[i].innerHTML = html;
    }
    return this;
  },
  css: function(k, v) {
    //如果传递两个参数，第一个参数是字符串，第二个也是字符串
    //如果只传递一个参数，并且这个参数是对象
    if (typeof k === 'string' && typeof v === 'string') {
      for (var i = 0; i < this.length; i++) {
        this[i].style[k] = v;
      }
      return this;
    } else if(typeof k === 'object') {
      //遍历所有的元素，把对象当中所有的css样式都给设置上
      for (var i = 0; i < this.length; i++) {
        //如何设置多个样式, 多个样式是不是放在k这个对象里面
        for (var prop in k) {
          this[i].style[prop] = k[prop];
        }
      }
      return this;
      //设置元素的操作都是批量的；可以继续返回实例对象供下次操作
      //获取元素的操作是批量的吗？ 不是批量返回，而是返回匹配的第一个元素的内容
      //只传了一个参数，并且这个参数是字符串, 那就是获取这个css样式
    } else if(typeof k === 'string' && arguments.length === 1) {
      if (window.getComputedStyle) {
        k = k.replace(/[A-Z]/g, function(match){
          return '-' + match.toLowerCase();
        });
        return window.getComputedStyle(this[0])[k]; //中括号里面可以是变量
      } else {
        k = k.replace(/-([a-z])/g, function(match, $1){
          return $1.toUpperCase();
        });
        return this[0].currentStyle[k];
      }
    }
  }
}

//2.给$.fn.init构造出来的对象，添加方法; 方法是不是要加到构造函数的原型上面
// $.fn.init.prototype = {}
//为了让所有的方法都写在$.fn这一个对象上面，所以
$.fn.init.prototype = $.fn;
