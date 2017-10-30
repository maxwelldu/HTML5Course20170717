第一章：Node.js+NPM的环境
要查看package.json文件所有的属性文档，可以使用如下命令：
npm help json
//如果不想发布你的模块，那么在package.json中加入 "private":"true"  这样避免误发布

安装二进制工具包：
npm i -g express
要想分发此类脚本，发布时，在package.json文件中添加"bin":"./path/to/script"项，并将其值指向可执行的脚本或二进制文件

npm search realtime
npm view socket.io
npm help
npm help publish

#任务：

- 写一个属于自己的nodejs的package.json发布出去供其他人使用

#第二章 JS概览
基本类型：number, boolean, string, null以及undefined
复杂类型：array, function以及object
函数
this， .call .bind  call接受参数列表，apply接受参数数组
函数的参数数量，函数名.length
闭包
自执行
类
继承
try {} catch{}
V8的新特性：
  Object.keys
  Array.isArray()
  [].forEach();//类似jquery的$.each
  [].filter();//类似jquery的$.grep
  [].map();//类似jquery的$.map
  还有一些不常用的：reduce, reduceRight, lastIndexOf
  '  hello '.trim();
  JSON.parse();
  JSON.sringify();
  function(){}.bind(); //类似于jquery.proxy;允许改变对this的引用
  //V8支持非标准的函数属性名
  var a = function woot(){};
  a.name == 'woot';//true
  //__proto__继承
  function Animal(){}
  function Ferret() {}
  Ferret.prototype.__proto__ = Animal.prototype;
  //存取器
  __defineGetter__, __defineSetter__

#第三章 阻塞与非阻塞IO
NodeJS是共享状态的并发，需要对回调函数如何个性当前内存中的变量（状态）特别小心。除些之外，还特别注意对错误的处理是否会潜在地修改这些状态，从而导致整个进程不可用。
始终牢记这点对写书健壮的Node.js程序，避免运行时错误是非常重要的。
假设这个函数是每次用户请求时都会执行的:
var books = [ 'A','B' ];
function serveBooks() {
  var html = '<b>' + books.join('</b><br><b>') + '</b>';
  //恶魔出现了，把状态修改了
  books = [];
  return html;
}
等价的PHP代码：
$books = ['A', 'B'];
function serveBooks() {
  $html = '<b>' . join($books, '</b><br><b>') . '</b>';
  $books = array();
  return;
}
这两个示例，nodejs的第一次正常，第二次就会返回空；而php的每次都会正常返回

##阻塞
// PHP
print('hello');
sleep(5);
print('world');
// Node
console.log('hello');
setTimeout(function(){
  console.log('world');
}, 5000);
以上代码，nodejs是回调，php的sleep阻塞了线程的运行。而node.js使用了事件轮询，因此setTimeout是非阻塞的
node.js的事件轮询本质上，node会先注册事件，随后不停地询问内核这些事件是否已经分发。当事件分发时，对应的回调函数就会被触发
node的并发实现也采用了事件轮询。与timeout所采用的技术一样，所有像http、net这样的原生模块中的io部分也都采用了事件轮询技术。和timeout机制中node内容会不停的等待，并当超时完成时，触发一个消息通知一样，node使用事件轮询，触发一个和文件描述符相关的通知。
文件描述符是抽象的句柄，存有对打开的文件、socket、管道等的引用。本质上来说，当node接收到从浏览器发来的http请求时，底层的tcp连接会分配一个文件描述符。随后，如果客户端向服务器发送数据，node就会收到该文件描述符上的通知，然后触发js的回调函数。

##单线程的世界
同一时间只执行一个函数，Node的最大并发就是1，因为速度足够快，所以像是并发；
一个真实世界的运用非阻塞IO的例子是云。例如AWS
##错误处理
var http = require('http');
http.createServer(function(){
  throw new Error('错误不会被捕获');
}).listen(3000);
整个进程都会崩溃,可以看到调用堆栈从事件轮询(IOWatcher)一路到回调函数
添加uncaughtException处理器就不会退出，自己手动控制
process.on('uncaughtException', function(err) {
  console.error(err);
  process.exit(1);//手动退出
})
像http, net原生模块都会分发error事件，如果该事件未处理，就会抛出未捕获的异常
var net = require('net');
net.createServer(function(connection) {
  connection.on('error', function(err) {
    //err是一个错误对象
    })
}).listen(400);
除uncaughtException和error事件外，绝大部分Node异步api接收的回调函数，第一个参数都是错误对象或者是null
var fs = require('fs');
fs.readFile('/etc/passwd', function(err, data) {
  if (err) return console.error(err);
  console.log(data);
})
错误处理中，每一步都很重要，因为它能让你书写更安全的程序，并且不丢失触发错误的上下文信息。
##堆栈追踪
function c(){
  b();
};
function b(){
  a();
}
function a(){
  throw new Error('here');
}
c();
node error.js
可以清晰地看到导致错误的函数调用路径。下面看一下引入事件轮询后
function c(){
  b();
};
function b(){
  a();
}
function a(){
  setTimeout(function(){
    throw new Error('here');
  }, 10);
c();
执行上述代码，堆栈信息中有价值的信息就丢失了。
堆栈信息显示的是从事件轮询开始的。
同理，要捕获一个未来才会执行到的函数所抛出的错误是不可能的。这会直接抛出未捕获的异常，并且catch代码块永远都不会被执行：
try {
  setTimeout(function(){
    throw new Error('here')
  },10)
} catch(e) {}
这就是为什么在Node.js中，每步都要正确进行错误处理的原因了。一旦遗漏，就会发现发生了错误后很难追踪，因为上下文信息都丢失了。
###注意这一点很重要，将来node会让异步处理抛出的异常更容易被追踪到。
这节要明白事件轮询，非阻塞IO，单线程的执行环境

#第四章，Node中的JavaScript
global对象，浏览器中全局对象是window
除了global之外还有一个process: 所有全局执行上下文中的内容都在process对象中。在浏览器中，只有一个window对象，在Node中，也只有一个process对象。举例来说，在浏览器中的名字是window.name, 类似的，在Node中进程的名字是process.title

##实用的全局对象
setImmediate就是一个例子，它的作用和process.nextTick相当
process.nextTick函数可以将一个函数的执行时间规划到下一个事件循环中：
console.log(1);
process.nextTick(function(){
  console.log(3);
});
console.log(2);
把它想象成是setTimeout(fn, 1)或者"通过异步的方法在最近的将来调用该函数"，就很容易能理解为什么上述例子的输出结果是1，2，3了

还有一个类似的例子是console, console最早是由Firefox中辅助开发的插件--Firebug实现。最后，Node也引入了一个全局的console对象，该对象有一些如console.log和console.error这样的很有用的方法。

##模块系统
JS标准中并未为模块依赖以及模块独立定义专门的API。因此，就导致了通过引用多个模块会出现对全局命名空间的污染及命名冲突的问题。
Node内置了很多衫的模块作为基础的工具集来帮助构建现代应用，包括http, net, fs等。也可以通过npm来安装更多的模块
node摒弃了采用定义一堆全局变量（或者跑很多可能根本就不会用到的代码）的方式，转而引入了一个简单却强大无比的模块系统，该模块系统有三个核心的全局对象：require、module和exports
##绝对和相对模块
绝对模块是指Node通过在其内部node_modules查找到的模块，或者Node内置的如fs这样的模块。
当安装好colors模块，其路径就变成了./node_modules/colors
这时，可以直接通过名字来require这个模块，无须添加路径名：
require('colors';)
colors模块修改了String.prototype, 因此它无须暴露API。而fs模块，则暴露了一系列函数：
var fs = require('fs');
fs.readFile()

模块还可以使用模块系统的功能来提供更加简洁独立的API以及抽象。然而， 不一定非要将模块或者应用每一个部分都作为一个单独的模块和各自独立的package.json, 你可以使用我所说的相对模块。

相对模块是将require指向一个相对工作目录中的javascript文件。为了证明这一点，我们在同一目录中创建名为module_a.js，module_b.js以及main.js的三个文件。
module_a.js
console.log('this is a');
module_b.js
console.log('this is b');
main.js
require('module_a');
require('module_b');
node main
会提示未找到module_a和module_b。原因是它们并没有通过npm来安装，也不在node_modules目录中，而且Node自带的模块中没有以此为名的模块。
要修复上述例子，需要在require参数前加上./
main.js
require('./module_a')
require('./module_b')
再次运行
node main

后面要介绍如何让这些模块暴露API，从而当调用require时，可以将其赋值给一个变量。

##暴露API
默认情况下，每个模块都会暴露出一个空对象。如果你想要在该对象上添加属性，那么简单地使用exports即可：
module_a.js
exports.name = 'john';
exports.data = 'this is some data';
var privateVariable = 5;
exports.getPrivate = function() {
  return privateVariable;
}
index.js
var a = require('./module_a');
console.log(a.name);
console.log(a.data);
console.log(a.getPrivate());

var a = {};
var b = a;//b就是a的引用
exports其实就是对module.exports的引用，其在默认情况下是一个对象。要是在该对象上逐个添加属性无法满足你的需求，你还可以彻底重写module.exports。

person.js
module.exports = Person;
function Person(name) {
  this.name = name;
}
Person.prototype.talk = function() {
  console.log('我的名字是', this.name);
}
index.js
var Person = require('./person')
var john = new Person('john');
john.talk();
node index.js
index.js文件中，不再是接受一个对象作为返回值，而是函数，这得归功于对module.exports的重写。

##事件
Node.js中的基础API之一就是EventEmitter。无论是在Node中还是在浏览器中， 大量代码依赖于监听或者分发的事件：
window.addEventListener('load', function(){
  alert('窗口已加载');
})
浏览器中负责处理事件相关的DOM API,主要包括addEventListener, removeEventListener以及dispatchEvent.它们还用在一系列从window到XMLHttpRequest等的其他对象上。
var ajax = new XMLHttpRequest();
ajax.addEventListener('stateChange', function(){
  if (ajax.readyState === 4 && ajax.responseText) {
    alert('we got some data: ' + ajax.responseText);
  }
});
ajax.open('GET', '/my-page');
ajax.send(null);
在Node中，你也希望可以随处进行事件的监听和分发。为此，Node暴露了Event EmitterAPI,该API上定义了on,emit以及removeListener方法。它以process.EventEmitter形式暴露出来：
eventemitter/index.js
var EventEmitter = require('events').EventEmitter, a = new EventEmitter;
a.on('event', function() {
  console.log('event called');
});
a.emit('event');
这个 API相比DOM中的更简洁，Node内部在使用，你也可以很容易地将其添加到自己的类中：
var EventEmitter = process.EventEmitter, MyClass = function(){};
  MyClass.prototype.__proto__ = EventEmitter.prototype;
这样，所有MyClass的实例都具备了事件功能：
var a = new MyClass;
a.on('某一事件', function(){
  //做些什么
});
事件是Node非阻塞设计的重要体现。Node通常不会直接返回数据（因为这样可能会在等待某个资源的时候发生线程阻塞），而是采用分发事件来传递数据的方式。
以HTTP为例，当请求到达时，Node会调用一个回调函数，这个时候数据可能不会一下子都到达。POST请求（用户提交一个表单）就是这样的例子。
当用户提交表单时，你通常会监听请求的data和end事件：
http.Server(function(req, res) {
  var buf = '';
  req.on('data', function(data) {
    buf += data;
  });
  req.on('end', function(){
    console.log('数据接收完毕！');
  })
})
这是Node.js中很常见的例子：将请求数据内容进行缓冲(data事件)，等到所有数据都装收完毕后(end事件)再对数据进行处理。
不管是否"所有的数据"都已到达，Node为了让你能够尽快知道请求已经到达服务器，都需要分发事件出来。在Node中，事件机制就是一个很好的机制，能够通知你尚未发生但将要发生的事情。
事件是否触发取决于实现它的API。比如，你知道了ServerRequest继承自EventEmitter，现在你也知道了它会分发data和end事件。
有些API会分发error事件，该事件也许根本不会发生。有些事件只会触发一次（如end事件），而有些事件则会触发多次(如data事件)。有些API只会在特定情况下触发某种事件。又比如，在特定的事件发生后，某些事件就不再触发。在上述HTTP的例子中，肯定不希望在end事件触发后还触发data事件，否则，你的应用就会发生故障了。
同样的，有些时候，会有这样的需求：不管某个事件在将来会被触发多少次，我都希望只调用一次回调函数。Node为这类需求提供了一个名字简洁的方法：
a.once('某个事件', function(){
  //尽管事件会触发多次，但此方法只会执行一次
});
通常，要弄明白哪些事件是可用的，以及它们的"联系方式"（即触发它们的条件），需要查看模块的API文档。

##buffer
除了模块之外，Node还弥补了语言另外一个不足之处，那就是对二进制数据的处理。
buffer是一个表示固定内存分配的全局对象（也就是说，要放到缓冲区中的字节数需要提前定下），它就好比是一个由八位字节元素组成的数组，可以有效地在JavaScript中表示二进制数据。
该功能一部分作用就是可以对数据进行编码转换。比如，你可以创建一幅用base64表示的图片，然后将其作为二进制PNG图片的形式写入到文件中：
buffers/index.js
var mybuffer = new Buffer('==ii1j2i3h1i23h', 'base64');
console.log(mybuffer);
require('fs').writeFile('logo.png', mybuffer);

base64主要是一种仅用ASCII字符书写二进制数据的方式。换句话说，它可以让你用简单的英文字符来表示像图片这样的复杂事务（所以会占用更多的硬盘空间）。
在Node.js中，绝大部分进行数据IO操作的API都用buffer来接收和返回数据。上面的例子中，filesystem模块中的writeFile API就接收buffer作为参数，并将其写到logo.png文件中。
运行该代码，并打开png图片
node index
open logo.png

本章了解浏览器端和Nodejs中书写js的主要区别。
还了解了Node添加的但在语言标准中没有的js中的常用api，如定时器，事件，二进制数据以及模块。
也知道了node中有类似window的对象，也可以使用console这样的开发者工具。

#Node重要的API
#第5章，命令行工具（CLI）以及FS API：首个Node应用
版本控制标准：http://semver.org/
验证package.json文件是否有效，可以运行 npm i
要是没有问题，不会有任何输出内容，否则会抛出JSON异常的错误。
fs模块是唯一一个同时提供同步和异步的API的模块。

##理解什么是流（stream）
我们已经知道，console.log会输出到控制台。事实上，console.log内部做了这样的事情：它在指定的字符串后加上\n(换行)字符，并将其写到stdout流中。
example-1.js
console.log('hello world');
example-2.js
process.stdout.write('hello world');
node example1
node example2
第一个示例会带有换行

process全局对象中包含了三个流对象，分别对应三个UNIX标准流：
- **stdin** 标准输入
- **stdout** 标准输出
- **stderr** 标准错误
第一个stdin是一个可读流，而stdout和stderr都是可写流。
stdin流默认的状态是暂停的(paused)。通常，执行一个程序，程序会做一些处理，然后退出。不过，有些时候，程序需要一直处在运行状态来接收用户输入的数据。
当恢复那个流时，Node会观察对应的文件描述符（在UNIX下为0），随后保持事件循环的运行，同时保持程序不退出，等待事件的触发。除非有IO等待，否则Node.js总是会自动退出。
流的另外一个属性是它默认的编码。如果在流上设置了编码，那么会得到编码后的字符串(utf-8, ascii等)而不是原始的Buffer作为事件参数。
Steam对象和EventEmitter很像（事实上，前者继承自后者）。在Node中，你会接触到各种类型流，如TCP套接字、HTTP请求等。简而言之，当涉及持续不断地对数据进行读写时，流就出现了。

第一个命令行程序
```
var fs = require('fs'),
stdin = process.stdin,
stdout = process.stdout;
fs.readdir(__dirname, function (err, files) {
  // 为了避免再次执行fs.stat, 把stat对象保存起来
  var stats = [];
  // console.log(files);
  console.log(''); // 显示空行
  if (!files.length) { // 如果files数组为空，提示没有文件。显示红色
    return console.log('    \033[31m No files to show!\033[39m\n');
  }
  console.log('    Select which file or directory you want to see\n');

  // 第一种异步流控制模式：串行执行
  function file(i) {
    var filename = files[i];
    fs.stat(__dirname + '/' + filename, function (err, stat) {
      stats[i] = stat;
      if (stat.isDirectory()) {
        console.log('    ' + i + '    \033[36m' + filename + '/\033[39m');
      } else {
        console.log('    ' + i + '    \033[90m' + filename + '/\033[39m');
      }
      i++; // 计数器累加,检查是否还有未处理的文件
      if (i === files.length) { // 所有文件都处理完毕，此时提示用户进行选择
        read();
      } else {
        file(i);
      }
    });
  }
  file(0);

  function read () {
    console.log('');
    stdout.write('    \033[33mEnter your choice: \033[39m');
    // 等待用户输入
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', option);
  }

  function option (data) {
    var filename = files[Number(data)];
    if (!filename) {
      stdout.write('    \033[31mEnter your choice: \033[39m');
    } else {
      stdin.pause();
      if (stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + '/' + filename, function (err, files) {
          console.log('');
          console.log('    (' + files.length + ' files)');
          files.forEach(function (file) {
            console.log('      -  ' + file);
          })
        });
        console.log('');
      } else {
        fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
          console.log('');
          // 添加一些辅助缩进后将文本进行输出
          console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
        });
      }
    }
  }
});

// 供学习
// 同步
// console.log(fs.readdirSync(__dirname));

// 异步
// function async(err, files) { console.log(files); }
// fs.readdir('.', async);
```

##对CLI一探究竟
完成了命令行程序之后，有必要学习一些API，它们对于书写在终端运行的类似程序很有帮助；

###argv
process.argv包含了所有Node程序运行时的参数值：
example.js
console.log(process.argv);
node example
第一个元素始终是node, 第二个元素始终是执行的文件路径。紧接着是命令行后紧跟着的参数。

要获取这些真正的元素，需要首先将数组的前两个元素去除掉：
example-2.js
console.log(process.argv.slice(2));
node example-2 --testing="something" --yeah

接下来需要学会如何获取两个不同的目录：一个是程序本身所在的目录，另外一个程序运行时的目录。

###工作目录
__dirname来获取执行文件时该文件在文件系统中所在的目录。
要获取当前工作目录，可以调用process.cwd方法：
process.cwd()
Node还提供了process.chdir方法，允许灵活地更改工作目录：
process.cwd()
process.chdir('/')
process.cwd()

另外一个和程序运行上下文有关的方面就是环境变量。

###环境变量
Node允许通过process.env变量来轻松访问shell环境下的变量。
一个最常见的环境变量就是NODE_ENV, 该变量用来控制程序是运行在开发模式下还是产品模式下。
在命令行下直接输入这些：
NODE_ENV="production" node
process.env.NODE_ENV
process.env.SHELL

当根据package.json安装的时候
npm i --dev 就是开发模式
npm i --production 就是产品模式，会安装不同依赖下的包


###退出
要让一个应用退出，可以调用process.exit并提供一个退出代码。比如，当发生错误时，要退出程序，这个时候最好是使用退出代码：
console.log('An error occurred');
process.exit(1);
这样可以让Node命令行程序和操作系统中其他工具进行更好的协同。

###信号
进程和操作系统进行通信的其中一种方式就是通过信号。比如，要让进程终止，可以发送SIGKILL信号。
Node程序是通过在process对象上以事件分发的形式来发送信号的：
process.on('SIGKILL', function() {
  //信号已收到
});

###ANSI转义码
要在文本终端下控制格式、颜色以及其他输出选项，可以使用ANSI转义码。
在文本周围添加的明显不用于输出的字符，称为非打印字符。
比如：
console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
\033表示转义序列的开始
[表示开始颜色设置
90表示前景色为亮灰色
m表示颜色设置结束。

最后用的是39，没错， 这是用来将颜色再设置回去的，我们这里只想对部分文本着色。
http://en.wikipedia.org/wiki/ansi_escape_code 列出了一张完整的ANSI转义码表。

###对FS一探究竟
fs模块允许 你通过Stream API来对数据进行读写操作。与readFile及writeFile方法不同，它对内存的分配不是一次完成的。
比如，考虑这样一个例子，有一个大文件，文件内容由上百万行逗号分割文本组成。要完整地读取该文件来进行解析，意味着要一次性分配很大的内存。更好的方式就当是一次只读取一块内容，以行尾结束符("\n")来切分，然后再逐块进行解析。
下面要介绍的是Node Stream就是对上述解决方案完美的实现。

###Stream
fs.createReadStream方法允许为一个文件创建一个可读的Stream对象。
为了更好地理解stream的威力，我们来看如下两个例子：
fs.readFile('my-file.txt', function (err, contents) {
  //对文件进行处理
});
这个例子中，回调函数必须要等到整个文件读取完毕、载入到RAM、可用的情况下才会触发。
而下面的这个例子，每次读取可变大小的内容块，并且每次读取后会触发回调函数：
var stream = fs.createReadStream('my-file.txt');
stream.on('data', function(chunk) {
  // 处理文件部分内容
});
stream.on('end', function(chunk) {
  // 文件读取完毕
});

为什么这种能力很重要呢？假设有个很大的视频文件需要上传到某个Web服务。这里，你无须在读取完整的视频内容后再开始上传，使用Stream就可以大大提速上传过程。
这对日志记录的例子也很有效，特别是使用可写stream。假设有个应用需要记录网站上的访问情况，这时，为了将记录写到文件中，让操作系统进行打开/关闭文件的操作可能就很低效（每次都得要在磁盘上进行查找文件操作）。
所以，这就是一个很好的fs.WriteStream的例子。打开文件操作只做一次，然后写入每个日志项时都调用.write方法。
另外一个很好的符合Node非阻塞设计的例子就是监视（Watch）

###监视
Node允许监视文件或目录是否发生变化。监视意味着当文件系统中的文件（或目录）发生变化时，会分发一个事件，然后触发指定的回调函数。
该功能在Node生态中被广泛使用。举例来说，有人喜欢用一种可以编译为CSS的语言来书写样式。这个时候，就可以使用监视功能，当源文件发生改变时，就将其编译为CSS文件。
我们来看下面的例子。首先，查找工作目录下所有的CSS文件，然后最重视其是否发生改变。一旦文件发生更改，就将该文件名输出到控制台：
var stream = fs.createReadStream('my-file.txt');

03-watchfile.js
var fs = require('fs');
//获取工作目录下所有的文件
var files = fs.readdirSync(process.cwd());
files.forEach(function (file) {
  //监听".css"后缀的文件
  if (/\.css/.test(file)) {
    fs.watchFile(process.cwd() + '/' + file, function () {
      console.log(' - ' + file + ' changed!');
    });
  }
})

除了fs.watchFile之外 ，还可以使用fs.watch来监视整个目录。


#第六章 TCP
传输控制协议（TCP）是一个面向连接的协议，它保证了两台计算机之间的数据传输的可靠性和顺序。
换句话说，TCP是一种传输层协议，它可以让你将数据从一台计算机完整有序地传输到另一台计算机。
正是由于这些特点，很多我们现在使用的如HTTP这样的协议都是基于TCP协议的。当传输一个页面的HTML文件时，肯定是希望它传输到目的地能够与传输前一致，要是出什么问题，就应该抛出错误。哪怕有一个字符（字节）传输错位了，浏览器都有可能无法渲染整个页面。
Node.js这个框架的出发点就是为了网络应用开发而设计的。如今，网络应用都是用TCP/IP协议进行通信的。所以，了解TCP/IP协议是如何工作的，以及Node.js是如何通过简单的API对其进行封装的，都是非常有帮助的。
首先要介绍的是该协议的特点。举例来说，使用TCP在两台电脑之间进行数据传输是如何做到的。当传输两条消息时，传输到上的地时还能保持发送前的顺序吗？理解协议本身对于理解使用该协议的软件也是很重要的。比如，大部分时候，连接如MySQL乖的数据库以及与数据库进行通信使用的都是TCP套接字。
Node HTTP服务器是构建于Node TCP服务器之上的。从编程角度来说，也就是Node中的http.Server继承自net.Server(net是TCP模块)。
除了Web浏览器和服务器（HTTP）之外，很多我们日常使用的如邮件客户端（SMTP/IMAP/POP）、聊天程序（IRC/XMPP）以及远程shell(SSH)等都是基于TCP协议。
尽可能多地了解TCP以及如何使用相关的Node.js API对书写和理解网络程序会大有裨益。

##TCP有哪些特性
若只是使用TCP的话，那无须理解它内部的工作原理，以及其实现机制。
不过，理解这些东西对分析更高层的协议和服务器，如Web服务器、数据库等的问题有很大的帮助。
TCP的首要特性就是它是面向连接的。
###面向连接揉脸放保证顺序的传递
说到TCP，可以将客户端和服务器端的通信看作是一个连接或者数据流。这对开发面向服务的应用和流应用是很好的抽象，因为TCP协议做基于的IP协议是面向无连接的。
IP是基于数据包的传输。这些数据报是独立进行传输的，送达的顺序也是无序的。
那么TCP又是如何保证这些独立的数据包送达的时候是有序的呢？
使用IP协议意味着数据包送达时是无序的,这些数据包不属于任何的数据流或者连接，那么当使用TCP/IP和服务器建立连接后，是怎样做到让数据包送达时是有序的呢？
要回答上述问题其实就等于在解释为什么会有TCP。当在TCP连接内进行数据传递时，发送的IP数据包包含了标识该连接以及数据流顺序的信息。
假设一条消息分割为四个部分。当服务器从连接A收到第一部分和第四部分后，它就知道还要等待其他数据包中的第二部分和第三部分。
要是用Node来写一个TCP服务器，就完全没必要去考虑这些复杂的内部实现了。只要考虑连接以及往套接字中写数据即可。接收方会按序接收到传输的信息，要是发生网络错误，连接会失效或者终止。

###面向字节
TCP对字节以及字符编码是完全无知的。正如前一章介绍的，不同的编码会导致舆的字节数不同。
所以，TCP允许数据以ASCII字符（每个字符一个字节）或者Unicode(即每个字符四个字节)进行传输。
正是因为对消息格式没有严格的约束，使得TCP有很好的灵活性。
###可靠性
由于TCP是基于底层不可靠的服务，因此，它必须要基于确认和超时实现一系列的机制来达到可靠性的要求。
当数据发送出去后，发送方就会等待一个确认消息（表示数据包已经收到的简短的确认消息）。如果过了指定的窗口时间，还未收到确认消息，发送方就会对数据进行重发。
这种机制有效地解决了如网络错误或网络阻塞这样的不可预测的情况。

###流控制
要是两台互相通信的计算机中，有一台速度远快于另一台的话，会怎么样呢？
TCP会通过一种叫流控制的方式来确保两点之间传输数据的平衡。
###拥堵控制
TCP有一种内置的机制能够控制数据包的延迟率及丢包率不会太高，以此来确保服务的质量（QoS）。
举例来说，和流控制机制能够避免发送方压垮接收方一样，TCP会通过控制数据包的传输速率来避免拥堵的情况。
介绍完TCP的基本工作原理，到实践的时候了。为了测试TCP服务器，我们可以使用Telnet工具。
###Telnet
Telnet是一个早期的网络协议，旨在提供双向的虚拟终端。在SSH出现前，它作为一种控制远程计算机的方式被广泛应用，如远程服务器管理。它是TCP协议上层的协议（不要惊讶）。
尽管从21世纪初就基本不用Telnet了，但如今绝大部分主流的操作系统都内置了telnet客户端
telnet
绝大部分telnet使用的是23号端口。要是通过该端口连接到服务器（telnet host.com 23 或者就简单的写成telnet host.com),就说明在通过TCP使用Telnet协议。
不过，在本例中，telnet客户端还有更加有意思的功能。发送数据时，客户端要是发现服务器使用的并不是Telnet, 这里，它不会关闭连接或者显示错误信息，相反，它会自动降级到低层的纯TCP模式。
所以，要是telnet到web服务器会怎么样呢？要一探究竟，我们来看下面这个例子。
首先，我们用node.js写一个简单的hello world web服务器，并监听3000端口：
web-server.js
require('http').createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello world</h1>');
}).listen(3000);
node server.js
http://localhost:3000

telnet localhost 3000
GET / HTTP/1.1 然后按两下回车

连接好看上去已经工作正常了，但是服务器的'hello world'消息并未到客户端这里。原因在于，要往TCP连接中写数据，必须首先创建一个HTTP请求，这就是套接字(socket)。在终端输入GET / HTTP/1.1 然后按两下回车键。这个时候，服务器的响应就出现了！

总结一下：
成功建立了一个TCP连接。
创建了一个HTTP请求。
接收到了一个HTTP响应。
测试了一些TCP的特性。到达的数据和在Node.js中写的一样：先写了Content-Type响应头，然后是响应体,最后所有的信息都按序到达。


##基于TCP的聊天程序
正如此前所介绍的，TCP的主要上的就是为两台计算机通过提供可靠的网络进行通信。
本章选择一个聊天应用作为TCP的"Hello World"程序，因为，它是展示TCP最简单的方式之一。
下面，我们来创建一个基本的TCP服务器，任何人都可以连接到该服务器，无须实现任何协议或指令：
- 成功连接到服务器后，服务器会显示欢迎信息，并要求输入用户名。同时还会告诉你当前还有多少其他客户端也连接到了该服务器。
- 输入用户名，按下回车键后，就认为成功连接上了。
- 连接后，就可以通过输入信息再按下回车键，来向其他客户端进行消息的收发。
为什么要按下回车键呢？事实上，Telnet中输入的任何信息都会立刻发送到服务器。按下回车键是为了输入\n字符。在Node服务器端，通过\n来判断消息是否已完全到达。所以，这其实是作为一个分隔符在使用。
换句话说，这里按下回车键和键入字符a没有什么区别。
###创建模块
npm init
npm i

#第七章 HTTP
超文本传输协议，又称为HTTP， 是一种Web协议，它为Web注入了很多强大的功能，正如在第6章中介绍的，它是属于TCP上层的协议。
本章会介绍如何使用Node.js服务器端 和客户端 的API。尽管两者都很容易上手，但是在构建真正的Web网站时，它们还是存在着一些不足的。正因如此，下面的章节还会介绍如何实现HTTP服务器上层的抽象，完成可复用的模块。
注意，由于我们要编写的示例代码一部分属于服务端，所以每次对文件进行修改，都需要重启Node进程来使其生效。最后，会介绍使用工具来简化这种频繁重启的操作。
下面，从分析HTTP协议开始。

##HTTP结构
HTTP协议构建在请求和响应的概念上，对应在Node.js中就是由http.ServerRequest和http.ServerResponse这两个构造器构造出来的对象。
当用户浏览一个网站时，用户代理（浏览器）会创建一个请求，该请求通过TCP发送给Web服务器，随后服务器会给出响应。
那么，请求和响应是什么样的呢？我们先用Node创建一个Hello World的HTTP服务器，并监听 http://localhost:3000
vim 07-http.js
require('http').createServer(function (req, res) {
  res.writeHead(200);
  res.end('Hello World');
}).listen(3000);
node 07-http

telnet 127.0.0.1 3000
GET / HTTP/1.1

##头信息
HTTP协议和IRC一样流行，其目的是进行文档交换。它在请求和响应消息前使用头信息（header）来描述不同的消息内容。
举个例子，Web页面会分发许多不同类型的内容：文本（text）,html, xml, json, png以及jpeg图片，等等。
发送内容的类型(type)就是在著名的Content-Type头信息中标注的。
来看一个实践中的例子。还是回到hello world, 不过这次我们在里面加点html:
require('http').createServer(function (req, res) {
  res.writeHead(200);
  res.end('Hello <b>World</b>');
}).listen(3000);

#第八章 Connect第三方模块
Node.js为常规的网络应用提供了基本的API。到此，已经了解了其为TCP服务器和基于此的HTTP服务器所提供的基本API了。
然而，实际情况下，绝大部分网络应用都需要完成一系列类似的操作，这些类似的操作你一定不想每次都重复地基于原始的API去实现。
Connect是一个基于HTTP服务器的工具集，它提供了一种新的组织代码的方式来与请求、咱就对象进行交互，称为中间件（middleware）。
为了证明通过中间件进行代码复用的好处，假设我们有一个站点，其目录结构如下所示：
ls website
index.html images/
在images目录下，有四个图片文件：
ls website/images/
1.jpg 2.jpg 3.jpg 4.jpg
在index.html简单地展示了这四张图片，并且可以通过http://localhost来访问：
<h1>My website</h1>
<img src="/images/1.jpg" />
<img src="/images/2.jpg" />
<img src="/images/3.jpg" />
<img src="/images/4.jpg" />
一个简单的静态网站，展示了Connect的能力；为了展示Connect为HTTP应用提供的便利，本章会介绍如何使用原生的http API书写一个简单的网站，之后再介绍如何使用connect API完成同样的事情。
##使用HTTP构建一个简单的网站
var http = require('http'), fs = require('fs');
var server = http.createServer(function (req, res) {
  function serve(path, type) {
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(path).pipe(res);
  }

  if ('GET' === req.method && '/images' === req.url.substr(0, 7) && '.jpg' === req.url.substr(-4)) {
    fs.stat(__dirname + req.url, function (err, stat) {
      if (err || !stat.isFile()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      serve(__dirname + req.url, 'application/jpg');
    });
  } else if ('GET' === req.method && '/' === req.url) {
    serve(__dirname + '/index.html', 'text/html');
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});
server.listen(3000);

##通过Connect实现一个简单的网站
接焉这个例子是要实现一个网站，该例子展示了创建网站时一些常见的任务：
- 托管静态文件
- 处理错误以及损坏或者不存在的URL。
- 处理不同类型的请求。
基于http模块API之上的Connect, 提供了一些工具方法能够让这些重复性的处理便于实现，以至于让开发者能够更加专注在应用本身。它很好地体现了DRY模式：不要重复自己（Don't Repeat Yourself）。
归功于Connect, 本例实现起来会非常简单。首先在新目录下创建一个package.json文件；
npm init -y
npm i -S connect

使用use()方法来添加static中间件。下一部分会介绍中间件的概念，并在下一章会对其做深入讲解。现在，最为重要的是要理解，中间件其实就是一个简单的JavaScript函数。本例中，我们这样配置static中间件---通过传递一些参数给connect.static方法，该方法本身会返回一个方法

设计一个更大型的应用，它能够根据每个请求的不同情况处理以下几种不同的任务：
- 记录请求处理时间
- 托管静态文件
- 处理授权
当然，这些任务的处理代码都可以放在一个简单的事件处理器中(createServer的回调函数中)，这将会是一个非常复杂的处理过程。
简单来说，中间件由函数组成，它除了处理req和res对象之外，还接收一个next函数来做流控制。
若用中间件模式来书写满足上述要求的应用，会是这样的：
server.use(function (req, res, next) {
  //记录日志
  console.error(' %s %s ', req.method, req.url);
  next();
});

server.use(function (req, res, next) {
  if ('GET' === req.method && '/images' === req.url.substr(0, 7)) {
    //托管图片
  } else {
    //交给其他的中间件去处理
    next();
  }
});

server.use(function (req, res, next) {
  if ('GET' === req.method && '/' === req.url) {
    //咱就index文件
  } else {
    //交给其他中间件去处理
    next();
  }
});

server.use(function (req, res, next) {
  //最后一个中间件，如果到了这里，就意味着无能为力，只能返回404了
  res.writeHead(404);
  res.end('Not found');
});

使用中间件，不仅能够让代码有更强大的表达能力（将应用拆分成更小的单元的能力），还能够实现很好的重用性。我们马上就会看到，Connect已经为处理常见的任务提供了对应的中间件。例如，要对请求进行日志记录，就可以简单地通过如下一行代码完成：
app.use(connect.logger('dev'));
帮你完成日志记录！
下一部分介绍如何书写一个当请求处理时间过长而进行警告的中间件。
##书写可重用的中间件
一个用于当请求时间过长而进行提醒的中间件在很多场景下都非常有用。比如，假设有个页面会向数据库发起一系列的请求。在测试过程中，所有的响应都在100毫秒（ms）内完成，但是你要确保能够将响应时间大于100ms的请求记录下来。
为此，我们在一个名为request-time.js的独立模块中创建一个中间件。
这个模块暴露一个函数，此函数本身又返回一个函数。这对于可配置的中间件来说是很常见的写法。在前面的例子中，我们调用connect.logger时传递了一个参数，然后它自身会返回一个函数，最终用来处理请求。
目前模块就接收一个超时时间阈值选项，该选项用来界定什么时候该将其记录下来。
module.exports = function(opts) {
  var time = opts.time || 100;
  return function (req, res, next) {
    var timer = setTimeout(function () {
      console.log('\033[90m%s %s\033[39m 033[91mis talking too long!\033[39m', req.method, req.url);
    }, time)

    var end = res.end;
    res.end = function (chunk, encoding) {
      res.end = end;
      res.end(chunk, encoding);









#第9章 Express
鉴于Connect基于HTTP模块提供了开发Web应用常用的基础功能，Express基于Connect为构建整个网站以及Web应用提供了更为方便的API。
看上一章的例子，你可能已经发现了，绝大部分Web服务器和浏览器之间交互的任务都是通过URL和method来完成的。这两者的组合有时又称为路由，通完Express创建的应用中的一个基础概念。
Express基于Connect构建而成，因此，它也保持了重用中间件来完成基础任务的想法。这就意味着，通过Express的API方便地构建Web应用的同时，又不失构建于HTTP模块之上高可用的中间件生态系统。


#第10章 Websocket
目前，绝大部分网站和Web应用开发者都习惯了通过发送HTTP请求来和服务器进行通信，随后接收服务器的HTTP响应。
正如上一章看到的，通过指定URL，Content-Type以及设置其他属性来获取资源的模型是最常见的，也是万维网中最常见的方式。Web生来就是用以传递相互关联的文档的。URI之所以含有路径信息是因为文档通常在文件系统中是有层次结构的，并且，每一层的结构都包含了对超链接的索引。
如下述例子：
GET /animals/index.html
GET /animals/mannals/index.html
GET /animals/mammals/ferrets.html
然而，随着时间的推移，Web变得越来越注重用户体验。如今，特别是随着HTML5以及相关工具的诞生，传统的那种每次需要用户点击之后才能获取文档的方式正在逐步退出历史舞台。现在已经可以创建出如游戏、文本编辑器等这种非常酷的Web应用了，完全可以取代了传统的桌面应用。
##Ajax
Web2.0标志着Web应用的崛起。其中一个关键因素就是Ajax，其具体表现在于提高了用户体验，这背后重要的原因就是：用户再也不用每次都通过交互操作才能从服务器端获取新的HTML文档。
比如要想在社交网站应用中更新个人信息，发送一个异步的POST请求，随后会收到一个更新成功的返回消息。接着，使用一个简单易用的JavaScript框架，更新视图以展现用户行为结果即可。
再比如，当用户点击一张表中的移除按钮时，就可以发送DELETE请求，并移除该行(<tr>)元素即可，无须刷新浏览器，也无须再去获取许多不必要的数据、图片、脚本以及样式文件以及重新渲染整个页面。
Ajax之所以很重要，从本质上来说，它避免了许多原本需要在Web应用中处理的数据传输和渲染的开销。
现在我们有了这样的解决方案：WebSocket。WebSocket是Web下的TCP，一个底层的双向socket, 允许用户对消息传递进行控制。
##HTML5 WebSocket
每次提到WebSocket的时候，其实是在讲两部分内容： 一部分是浏览器实现的WebSocket API, 另一部分是服务器实现的WebSocket协议。这两部分是随着HTML5的推动一起被设计和开发的，但是两者都没有成为HTML5标准的一部分。前者被W3C标准化了，而后者被IETF标准化为RFC 6455。
浏览器端实现的API如下：
var ws = new WebSocket('ws://host/path');
ws.onopen = function() {
  ws.send('data');
}
ws.onclose = function() {

}
ws.ondata = function (ev) {
  alert(ev.data);
}

上述简单的API不禁让我们想起第6章写过的TCP客户端。和XMLHttpRequest（Ajax）不同，它并非面向请求和响应，而是可以直接通过send方法进行消息传递。通过data事件，发送和接收UTF-8或者二进制编码的消息都非常简单，另外，通过open和close事件能够获知连接打开和关闭的状态。
首先，连接必须通过握手来建立。握手方面和普通的HTTP请求类似，但在服务器端响应后，客户端和服务器端收发数据时，数据本身之外的信息非常少：
Request
GET /ws HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Version: 6
Sec-WebSocket-Origin: http://pmx
Sec-WebSocket-Extensions: deflate-stream
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==

Response:
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm50PpG2HaGWk=

WebSocket还是建立在HTTP之上的，也就是说，对于现有的服务器来说，实现WebSocket协议非常容易。它和HTTP之间主要的区别就是，握手完成后，客户端和服务器端就建立了类似TCP socket这样的通道。
为了更好地理解这部分内容，我们来写个示例应用。
##一个ECHO示例：

##面临一个挑战
###关闭并不意味着断开连接
当服务器端或者客户端触发close事件时，意味着：TCP连接很可能已经关闭了。而事实上，并非总是如此。电脑 有可能会意外关机，网络错误也有可能发生，甚至不小心把一杯水倒在了键盘上都有可能。在类似这样的情况下，close事件可能永远都不会触发！
解决这个问题的方法就是利用超时和心跳检查。要处理这样的情况，我们需要每隔几秒钟向客户端发送一段消息来确保客户端还"活"着，要是发送失败则认为客户端 已经强制断开连接了。
###JSON
随着程序复杂度的提升，服务器端 和客户端往返的数据量也会变大。
严重依赖JSON进行手动编码和解码工作。因为这部分工作是一个应用中非常常见的任务，所以需求要将其抽象出来。
###重连
要是客户端临时断开怎么办？大部分应用程序会尝试让用户自动重连。而咱们写的，一旦发生断开情况，就只能通过刷新浏览器来重新连接了。
###广播
广播对于实时应用来说是非常常规的模式，用于和其他客户端进行交互。对于这部分功能，我们不需要手动去定义自己的广播机制。
###WebSocket属于HTML5：早期浏览器不支持
WebSocket是一项新技术。大部分浏览器、代理、防火墙以及杀毒软件都还不完全支持这种新的协议。因此，我们需要一种支持早期浏览器的方案。
###解决方案
幸运的是，所有这些问题都有解决方案。就是Socket.io这个模块，它的作用就是在保持简单、加速基于websocket通信的前提下，解决所有上述这些问题。

#第11章 Socket.io
##传输
Socket.io最诱人的特性之一就是消息的传递是基于传输的，而非全部依靠WebSocket，也就说是，Socket.io可以在绝大部分的浏览器和设备上运行，从IE6到iOS都支持。
例如，在使用一项称为long polling技术的时候，就可以通过ajax来实现实时消息传输。简单来说，这项持续是通过持续发送一系列的ajax请求来实现的，但是，当服务器端 没有数据返回到客户端时，连接还会持续打开20-50秒，以确保不再有额外的数据通过HTTP请求/咱就头传递过来。
Socket.io会自动使用像long polling这样复杂的技术，但其API保持了与WebSocket一样的简洁。
另外，即使浏览器端支持的Websocket被代理或者防火墙禁止了，Socket.io依然能够通过采用别的技术来处理这类问题。
##断开VS关闭
socket.io带来的另一个基础功能就是对超时的支持。正如第6章和第10章中讨论的，在实际情况下，应用不能依赖TCP连接一定能够正常关闭。
本章中，我们使用socket.io, 监听的是connect事件，而不是open事件，以及disconnect事件而不是close事件。原因是socket.io提供了可靠的事件机制。若客户端停止传输数据，但在一定的时间内又没有正常的关闭连接，Socket.io就认为它是断开连接了。
这样一来，就能够让你专注在应用逻辑本身，而无须去过多担心网络的各种不确定情况。
当连接丢失时，Socket.io默认会自动重连。
##事件
Socket.io仍然允许你像websocket那样传输简单文本信息，除此之外，还支持通过分发(emit)和监听(listen)事件来进行JSON数据的收发。

注意了，使用socket.io可以在应用中根据数据的含义进行频道分类，不再需要对单一事件（消息）中收到的事件进行解析。事件可以接收任意数量的JSON编码的参数：Number, Array, String, Object等等。
##命名空间
socket.io还提供了另一个强大的特性，它允许在单个连接中利用命名空间来将消息彼此区分开来。
有的时候，应用程序需要进行逻辑拆分，但考虑到性能，速度之类的原因，使用同一个连接还是可以接受的。考虑到我们无法事先获悉客户端的速度的快慢，浏览器的好坏，不依赖同时打开过多的连接通常是个不错的主意。
因为，socket.io允许监听多个命名空间中的connection事件。
io.sockets.on('connection');
io.of('/some/namespace').on('connection');
io.of('/some/other/namespace').on('connection');

尽管当通过如下方式从浏览器中获取连接时，可以获取到不同的连接对象，但是，通常只会用一个传输通道（像Websocket连接一样）：
var socket = io.connect();
var socket2 = io.connect('/some/namespace');
var socket3 = io.connect('/some/other/namespace');
某些场景下，为了更好地抽象，应用程序的部分代码或模块书写的时候完全是互相独立的。部分客户端javascript代码可能完全不知道另外一部分并行执行的代码。
比如，构建一个社交网络，在农场游戏旁边展示一个空间里聊天程序。尽管，它们可以共享一些如授权信息的信息这样的通用的数据，但书写代码时让它们都能够完全控制一个socket依然是个很好的主意。
归功于命名空间（也可以称为多路传输），那样的socket不必非得是自己分配的真正的TCP socket。socket.io对同样的资源（为用户选择的传输通道）进行频道切分，并将数据传输给对应的回调函数。
socket.emit返回给客户端
socket.broadcast.emit是广播数据
##消息接收确认
在聊天应用中，我们在用户按下回车键后立刻调用addMessage，这会让人产生一种错觉，感觉消息瞬间就发送成功了。
和websocket一样，socket.io并不强制对每条发送的消息做回应。不过，有的时候，我们需要确认消息是否达到。socket.io把这类确认消息叫做确认（acknowledgment）。
要实现这样的通知响应，我们要做的就是在分发事件的时候提供一个回调函数。

首先，我们要获得通过addMessage函数创建的消息元素，以便在收到确认咱就后，对该消息添加一个CSS类。接着，就可以在该消息后显示一个漂亮的小图标。

/chat.js
socket.emit('text', input.value, function(date) {
  li.className = 'confirmed';
})
server.js
socket.on('text', function (msg, fn) {
  //....
  // 确认消息已接收
  fn(Date.now());
})

##一个轮流做DJ的应用
##集成Grooveshark API

#第12章 MongoDB
mongoose

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var PostSchema = new Schema({
  author : ObjectId,
  title: { type: String, default: 'untitled' },
  body: String,
  date: Date,
  meta: {
    votes: Number,
    favs: Number
  }
});
var Post = mongoose.model('BlogPost', PostSchema);
//使用
var Post = mongoose.model('BlogPost');
new Post({ title: 'My title' }).save(function (err) {
  console.log('that was easy!');
});
Post.find();
db.blogposts.find({ 'meta.votes': 5});

定义嵌套文档：
var Comments = new Schema({
  title: String,
  body: String,
  date: Date
});
var BlogPost = new S工（{
  author: ObjectId,
  title: { type: String, index: true },
  uid: { type: Number, unique: true },
  body: String,
  buf: Buffer,
  date: Date,
  comments: [Comments],
  meta: {
    votes: Number,
    favs: Number
  }
});

//中间件在删除之前做一些事情
BlogPost.pre('remove', function(next) {
  emailAuthor(this.emal, 'blog post removed!');
});

//探测模型状态
BlogPost.pre('save', function(next) {
  if (this.isNew) {
    //...
  } else {
    //
  }
})
//还可以通过this.dirtyPaths来探测什么键被修改了

##查询
find()
findOne()
remove()
update()
count()
findById()

##扩展查询
Post.find({ author: '432432l' })
.where('title', 'my title')
.sort('content', -1)
.limit(5)
.run(function (err, post) {

})

##排序
query.sort('key', 1);
query.sort('some.key', -1);

##选择
Post.find().select('field', 'field2');

##限制
query.limit(5)

##跳过
query.skip(10);
//这个功能结合Model#count对做分页非常有用：
Post.count(function (err, totalPosts) {
  var numPages = Math.ceil(totalPosts / 10);
});

##自动产生键
在BlogPost模型例子中，我们将博文作者的ID存储为author属性。
很多时候，在查询一个博文时，我们还需要获取对应的作者。这个时候，就可以为ObjectId类型提供一个ref属性，之后，查询文档时就能自动产生作者数据！通过简单地对指定键调用populate方法即可：
BlogPost.find({ title: 'my title' })
.populate('author')
.run(function (err, doc) {
  consoe.log(doc.author.email);
});

##应用
var Schema = mongoose.Schema;
var User = mongoose.model('User', new Schema({
  first: String,
  last: String,
  email: { type: String, unique: true },
  password: { type: String, index: true }
}));

app.use(function (req, res, next) {
  if (req.session.loginIn) {
    res.local('authoricated', true);
    User.findById(req.session.loggedIn, function (err, doc) {
      if (err) return next(err);
      res.local('me', local);
      next();
    })
  } else {
    res.local('authoricated', false);
    next();
  }
});

app.post('/login', function (req, res) {
  User.findOne({ email: req.body.user.email, password: req.body.user.password }, function (err, doc) {
    if (err) return next(err);
    if (!doc) return res.send('<p>User not found. Go back and try again');
    res.session.loggedIn = doc._id.toString();
    res.redirect('/');
  })
});

app.post('/signup', function (req, res, next) {
  var user = new User(req.body.user).save(function (err) {
    if (err) return next(err);
    res.redirect('/login/' + user.email);//这里直接使用use.email, 不需要在回调函数中doc[0].email
  })
});

#第15章 代码共享
本书介绍部分，就提过，Node.js最重要的特点之一就是：它所使用的语言----JavaScript，是浏览器唯一支持的语言。
尽管在我们已经写了很多独立的JavaScript代码，减少了在开发Web应用时总要在不同语言之间切换上下文的痛苦。我们还没有享受到一次编码处处运行的好处。
本章分析适合代码共享的最佳用例，以及如何解决常见的语言兼容性问题。本章还会介绍如何书写模块化Node代码的最佳实践，并将其通过browserbuild编译后在浏览器中直接运行。
