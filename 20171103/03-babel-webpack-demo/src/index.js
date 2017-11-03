import "babel-polyfill";
// import * as m from './modulea';
// console.log(m);
import {A, Hello, test} from './modulea';
console.log(A);
test();
let hello = new Hello();
hello.test();

import m from './moduleb';
console.log(m);
console.log(m.A);
m.test();
let h = new m.Hello();
h.test();

/*
function b(){
  console.log(v)  // ?会报错吗？
  if (true) {
    var v = 1;
  }
}
// b();

function c (){
  console.log(v)
  if (true) {
    let v = 1;
  }
}
// c();
{
  //块级作用域
}
{
  let a = 10;
}
{
  // console.log(a);
}

{
  const b = {a:1}
  b.a = 2;
  //对象可修改
}

{
  let j = 10;
  for (let i = 0;i<j;i++){
    console.log(i);
  }
}

{
  //返回的是bool值
  console.log("hello world".includes('hello'));
  console.log("hello world".startsWith('hello'));
  console.log("hello world".endsWith('world'));
}

{
  //函数默认值
  function logName(name='icepy') {
    console.log(name)
  }
  logName() // icepy
  logName('wower') // wower
}

{
  //接受参数
  function log(name,...profile){
      // profile []
      // arguments
      // name
      console.log(name, profile);
  }
  log('max');
  log('max', 1,2,3);

}

{
  //箭头函数
  var sum = (a,b) => a + b;
  sum(1,2);
}

{
  const obj = {
     name: 'icepy',
     work: 'alibaba'
   }

   //解构赋值
   const { name, work } = obj
   console.log(name, work);
}

{
  //对象扩展
  let name = 'icepy'
  let age = 18
  let obj = {
    name,
    age,
    say() {
      console.log(this.name)
    }
  }
}

{
  //Symbol
  let name = Symbol('name');
  let max = Symbol();
  let obj = {
    [name]:'icepy',
    [max]: 29
  }
}

{
  //不重复的集合
  console.log(new Set([1,2,2,3,3, {"name":"max"}]));
}

{
  console.log(new Set([{"name":"max"},{"name":"max"}]));
}

{
  let sets = [1,2,3,4];
  //根据数组生成迭代器
  let iterator = sets[Symbol.iterator]();
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());

  // let res = iterator.next();
  // while(!res.done){
  //   res = iterator.next()
  //   console.log(res)
  // }
  for (let res of iterator) {
    console.log(res);
  }

}

{
  // 声明一个generator函数（生成器函数）；这个函数返回的是一个迭代器对象
  function * createIterator() {
    console.log(11);
    yield 1; // 执行到yield会停止，下一次调用迭代器.next()方法继续往下执行
    console.log(22);
    yield 2;
  }

  let iterator = createIterator();
  console.log(iterator.next());
  console.log(iterator.next());
}

// 迭代器
{
  let arr=['hello','world'];
  //生成数组的迭代器
  let map=arr[Symbol.iterator]();
  console.log(map.next());
  console.log(map.next());
  console.log(map.next());
}

{
  //针对对象，自己写一个迭代器
  let obj={
    start:[1,3,2],
    end:[7,9,8],
    [Symbol.iterator](){
      let self=this;
      let index=0;
      let arr=self.start.concat(self.end);
      let len=arr.length;
      return {
        next(){
          if(index<len){
            return {
              value:arr[index++],
              done:false
            }
          }else{
            return {
              value:arr[index++],
              done:true
            }
          }
        }
      }
    }
  }
  // 遍历迭代器
  for(let key of obj){
    console.log(key);
  }
}

{
  let arr=['hello','world'];
  for(let value of arr){
    console.log('value',value);
  }
}

// 生成器
{
  // genertaor基本定义
  let tell=function* (){
    yield 'a';
    yield 'b';
    return 'c'
  };

  let k=tell();

  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
}

{
  //对象的迭代器
  let obj={};
  obj[Symbol.iterator]=function* (){
    yield 1;
    yield 2;
    yield 3;
  }

  for(let value of obj){
    console.log('value',value);
  }
}

{
  let state=function* (){
    while(true){
      yield 'A';
      yield 'B';
      yield 'C';
    }
  }
  let status=state();
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
}


// 异步之基础，回调函数
{
  let ajax=function(callback){
    console.log('执行');
    setTimeout(function () {
      callback&&callback.call()
    }, 1000);
  };
  ajax(function(){
    console.log('timeout1');
  })
}

// promise
{
  let ajax=function(){
    console.log('执行2');
    return new Promise(function(resolve,reject){
      //异步
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };
  console.log(ajax());
  ajax().then(function(){
    console.log('promise','timeout2');
  })
}

{
  let ajax=function(){
    console.log('执行3');
    return new Promise(function(resolve,reject){
      setTimeout(function () { resolve() }, 1000);
    })
  };
  // 多个回调
  ajax()
    .then(function(){
      return new Promise(function(resolve,reject){
        setTimeout(function () { resolve() }, 2000);
      });
    })
    .then(function(){
      console.log('timeout3');
    })
}
{
  let ajax=function(){
    console.log('执行2');
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        if (Math.random()>0.5) {
          resolve()
        } else {
          reject();
        }
      }, 1000);
    })
  };
  console.log(ajax());
  ajax().then(function(){
    console.log('promise','timeout2');
  }, function(){
    console.log('promise reject');
  })
}

{
  let ajax=function(num){
    console.log('执行4');
    return new Promise(function(resolve,reject){
      if(num>5){ resolve() }else{ throw new Error('出错了') }
    })
  }

  //接受错误情况
  ajax(6).then(function(){
    console.log('log',6);
  }).catch(function(err){
    console.log('catch',err);
  });
  ajax(3).then(function(){
    console.log('log',3);
  }).catch(function(err){
    console.log('catch',err);
  });
}

{
  // 所有图片加载完再添加到页面
  function loadImg(src){
    return new Promise((resolve,reject)=>{
      let img=document.createElement('img');
      img.src=src;
      img.onload=function(){
        resolve(img);
      }
      img.onerror=function(err){
        reject(err);
      }
    })
  }

  function showImgs(imgs){
    imgs.forEach(function(img){
      document.body.appendChild(img);
    })
  }

  //当所有的promise都执行成功之后
  Promise.all([
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png')
    // loadImg('http://i4.buimg.com/567751/2b07ee25b08930ba.png'),
    // loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
  ]).then(showImgs)
}

{
  // 有一个图片加载完就添加到页面
  function loadImg(src){
    return new Promise((resolve,reject)=>{
      let img=document.createElement('img');
      img.src=src;
      img.onload=function(){
        resolve(img);
      }
      img.onerror=function(err){
        reject(err);
      }
    })
  }

  function showImgs(img){
    let p=document.createElement('p');
    p.appendChild(img);
    document.body.appendChild(p)
  }

  //当哪个promise第一次执行完成则不再执行其他promise
  Promise.race([
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png')
    // loadImg('http://i4.buimg.com/567751/2b07ee25b08930ba.png'),
    // loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
  ]).then(showImgs)
}

{
  function getWeather() {
    return new Promise(function(resolve, reject) {
      var m = Math.random();
      console.log(m);
      if (m > 0.6) {
        resolve('晴天');
      } else if(m > 0.3) {
        resolve('雨天');
      } else {
        reject('雾天');
      }
    });
  }
  getWeather().then(function(str){
    if (str === '晴天') {
      console.log('老子去钓鱼');
    } else if (str === '雨天') {
      console.log('老子要睡觉');
    }
  }, function(str){
    console.log('真没用' + str);
  });
}


// 生成器
{
  let draw=function(count){
    //具体抽奖逻辑
    console.info(`剩余${count}次`)
  }

  let residue=function* (count){
    while (count>0) {
      count--;
      yield draw(count);
    }
  }

  let star=residue(5);
  let btn=document.createElement('button');
  btn.textContent='抽奖';
  document.body.appendChild(btn);
  btn.addEventListener('click',function(){
    star.next();
  },false)
}

{
  // 长轮询
  let ajax=function* (){
    yield new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve({code:0})
      }, 200);
    })
  }

  let pull=function(){
    let genertaor=ajax();
    let step=genertaor.next();
    step.value.then(function(d){
      if(d.code!=0){
        setTimeout(function () {
          console.info('wait');
          pull()
        }, 1000);
      }else{
        console.info(d);
      }
    })
  }

  pull();
}

//class
{
  //ES5
  // function Parent(name) {
  //   name = name || "max";
  //   this.name = name;
  // }

  // 基本定义和生成实例
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
  }
  let v_parent=new Parent('v');
  console.log('构造函数和实例',v_parent);
}

{
  // 继承
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
  }
  class Child extends Parent{}
  console.log('继承',new Child());
}

{
  // 继承传递参数
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
  }

  class Child extends Parent{
    constructor(name='child'){
      super(name); // super用来调用父类的构建函数，只能在第一行
      this.type='child';
    }
  }

  console.log('继承传递参数',new Child('hello'));
}

{
  // getter,setter
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }

    get longName(){
      return 'mk'+this.name
    }

    set longName(value){
      this.name=value;
    }
  }

  let v=new Parent();
  console.log('getter',v.longName);
  v.longName='hello';
  console.log('setter',v.longName);
}

{
  // 静态方法和普通方法
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }

    static tell(){
      console.log('tell');
    }
    say() {
      console.log('say');
    }
  }

  console.log(Parent);
  console.dir(Parent);
  Parent.tell();
  let p = new Parent();
  console.log(p);
  p.say();

}

{
  // 静态属性
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }

    static tell(){
      console.log('tell');
    }
  }

  Parent.type='test';

  console.log('静态属性',Parent.type);
}

//proxy
{
  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  };

  let monitor=new Proxy(obj,{
    // 拦截对象属性的读取
    get(target,key){
      return target[key].replace('2017','2018')
    },
    // 拦截对象设置属性
    set(target,key,value){
      if(key==='name'){
        return target[key]=value;
      }else{
        return target[key];
      }
    },
    // 拦截key in object操作
    has(target,key){
      if(key==='name'){
        return target[key]
      }else{
        return false;
      }
    },
    // 拦截delete
    deleteProperty(target,key){
      if(key.indexOf('_')>-1){
        delete target[key];
        return true;
      }else{
        return target[key]
      }
    },
    // 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys(target){
      return Object.keys(target).filter(item=>item!='time')
    }
  });

  console.log('get',monitor.time);

  monitor.time='2018';
  monitor.name='mukewang';
  console.log('set',monitor.time,monitor);

  console.log('has','name' in monitor,'time' in monitor);

  // delete monitor.time;
  // console.log('delete',monitor);
  //
  // delete monitor._r;
  // console.log('delete',monitor);
  console.log('ownKeys',Object.keys(monitor));

}

{
  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  };

  console.log('Reflect get',Reflect.get(obj,'time'));
  Reflect.set(obj,'name','mukewang');
  console.log(obj);
  console.log('has',Reflect.has(obj,'name'));
}


{
  function validator(target,validator){
    return new Proxy(target,{
      _validator:validator,
      set(target,key,value,proxy){
        if(target.hasOwnProperty(key)){
          let va=this._validator[key];
          if(!!va(value)){
            return Reflect.set(target,key,value,proxy)
          }else{
            throw Error(`不能设置${key}到${value}`)
          }
        }else{
          throw Error(`${key} 不存在`)
        }
      }
    })
  }

  const personValidators={
    name(val){
      return typeof val==='string'
    },
    age(val){
      return typeof val === 'number' && val>18
    },
    mobile(val){

    }
  }

  class Person{
    constructor(name,age){
      this.name=name;
      this.age=age;
      this.mobile='1111';
      return validator(this,personValidators)
    }
  }

  const person=new Person('lilei',30);

  console.info(person);

  person.name='Han mei mei';

  console.info(person);
}
*/

//decoration
{
  let readonly=function(target,name,descriptor){
    descriptor.writable=false;
    return descriptor
  };

  class Test{
    @readonly
    time(){
      return '2017-03-11'
    }
  }

  let test=new Test();

  // test.time=function(){
  //   console.log('reset time');
  // };

  console.log(test.time());
}


{
  let typename=function(target,name,descriptor){
    target.myname='hello';
  }

  @typename
  class Test{

  }

  console.log('类修饰符',Test.myname);
  // 第三方库修饰器的js库：core-decorators; npm install core-decorators
}
{
  let log=(type)=>{
    return function(target,name,descriptor){
      let src_method=descriptor.value;
      descriptor.value=(...arg)=>{
        src_method.apply(target,arg);
        console.info(`log ${type}`);
      }
    }
  }

  class AD{
    @log('show')
    show(){
      console.info('ad is show')
    }
    @log('click')
    click(){
      console.info('ad is click');
    }
  }

  let ad=new AD();
  ad.show();
  ad.click();
}
