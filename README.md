# HTML5Course20170717

##20170821
```
//获取元素
document.getElementById()  //一个DOM对象
DOM对象.getElementById()  
document.getElementsByTagName() //包含多个DOM对象的数组
DOM对象.getElementsByTagName()
//创建元素
document.createElement('') //可以创建p,div,span,link,script,img
//属性
innerText, innerHTML,checked(true|false ""|"checked")，title, value, src, href
///修改皮肤就是切换样式的href属性值
通用的属性：id, class, name, title, style
document.title //获取文档的标题
//自定义属性
对原有标签的功能进行扩展，v-for, v-if, v-show;
用来在元素上面存储数据data-id="1" username="maxwell"
//属性操作
DOM对象.属性名  //获取属性
DOM对象.属性名 = 属性值 //设置属性
//非标准的属性需要使用以下方式去获取和设置，当然也对标准属性进行操作，是比较通用的
DOM对象.getAtrribute(属性名)  //获取属性
DOM对象.setAttribute(属性名, 属性值) //设置属性
//元素操作
DOM对象.appendChild()
//节点关系
DOM对象.childNodes  数组//获取所有的子节点，包括文本节点，元素节点，注释节点
节点.nodeType //值可以 1是元素节点
DOM对象.previousSibling //上一个兄弟节点
DOM对象.parentNode //父节点
//样式
DOM对象.style.样式 //样式如果是中横线，需要改成驼峰命名；这里的样式只能够得到或者设置行内样式
getComputedStyle(DOM对象) //获取DOM对象的计算后属性的对象（CSSOM）
DOM对象.className 设置class的值，如果有多个，可以用字符串拼凑
//事件, 事件可以嵌套
//绑定事件
DOM对象.on事件名 = function() {
  //这里面的this指向当前对象
}
//取消绑定事件
DOM对象.on事件名 = null;
常用事件名 click, mouseover, mouseout, focus, blur, load, submit, invalid
load事件是指当前页面结构加载完成，并且里面的所有资源都加载完成
//变量
全局变量其实就是把当前变量名放到window当中的一个属性
//函数
函数其实就是把函数名作为window当中的一个属性，他的值的是function
//调试
console.log()
console.dir()
断点调试，添加观察表达式
网络环境模拟
//概念的理解
user agent表示当前的浏览器，它代理你去上网
信号量 非常重要，一定要理解，就是页面元素的变化都根据这个信号量来决定，自己说的一个名词；实际上说白就是一个变量或者属性
业务逻辑方法  信号量和业务逻辑通常是对应的，业务逻辑会根据信号量的值作出不同的决定，到底是改变元素的颜色还是大小，还是位置等等
页面解析顺序是文本的从上到下；如果js代码写在需要获取的html元素之上的时候，会暴错，获取不到；如果需要写在上面，要添加window.onload事件
资源：只要是有链接地址的都是资源，不论里面的内容是什么；
html内容是资源， css文件，js文件，图片，音频，视频，网络字体文件，API
URL: 统一资源定位符
URL地址包括：http://www.baidu.com:80/news/index.php?username=a#fa
协议://域名或IP:端口号/路径/文件名?queryString#锚点(hash)
//技巧
state = !state //通常用来做toggle效果，或者开关
class设置样式，id属性用来给js使用
```

```
//git是一个版本控制工具：针对修改(变化)的版本控制工具，历史管理，最主要的功能是备份和团队协作
下载git工具，到这个网址下载对应的版本 https://git-scm.com/downloads
//命令行操作(最主要的是心态，第一你能够意识当前学的这个东西非常有用，或者能提升效率；第二个你就会拼命的去把他学好;意味着你能够节省很多的时间，enjoy your life!) https://guoyongfeng.github.io/book/21/21/04-shell%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8.html
windows平台常用的命令行工具有git bash, putty, securecrt
, powershell
常用命令：
cd change directory改变目录
  cd /d/HTML5Course20170717/20170822
  cd ..
ls List 查看列表
  ls 查看当前文件夹中的文件
  ls -l 以长格式查看，包括权限，用户，大小，创建时间等
技巧：按tab键自动补全
输入任何命令都加一个 -v
输入过的命令通过上下箭可以选择
ctrl+a 直接跳到开头
ctrl+e 跳到当前行的末尾
ctrl+u 当前行内容全部删除|撤销

mkdir 文件夹名
rm -rv 文件夹名，只能删除空的目录，git bash可以删除非空的目录
rm -rfv 文件夹名 强制删除
touch a.js b.css index.html .gitignore
.开头的文件通常都是隐藏文件
.gitignore文件表示git仓库忽略提交的文件列表
. 表示当前目录
.. 表示上级目录
通常你输入的命令没有任何反应表示最好的响应
操作的时候一定要特别的小心谨慎，知道自己的命令会发生什么事；误操作有可能会把系统整崩，有可能删除数据库
通常编程中的目录和文件名最好全部是英文名，并且是小写
安装软件，有时候装到中文名的目录，也会发生问题
```

```
1.cd 目录切换

注意目录分隔符为“/”，与dos相反

# 格式：cd dirname，比如我们要进入到d盘的website目录
$ cd /d/website
# 到当前目录的上一级
$ cd ../
# 到当前目录的上上级
$ cd ../../
2.mkdir 新建文件夹

$ mkdir dirname
$ mkdir website
3.touch 创建文件

$ touch .gitignore
$ touch a.js b.html c.css
4.ls 显示文件

命令格式：ls [option] file

# 显示详细列表
$ ls -l
# ls -l的简写
$ ll
# 显示所有文件，包含隐藏文件（以. 起头的文件名）
$ ls -a
# 显示文件及所有子目录
$ ls -R
$ 显示文件（后跟*）和目录（后跟/）
$ ls -F
# 与l选项合用，显示目录名而非其内容
$ ls -d
5.pwd 显示当前路径

$ pwd
6.cat 显示文件内容

# 格式：cat filename
$ cat a.js
7.rm 删除文件或目录

命令格式： rm [-r] filename (filename 可为档名，或档名缩写符号.)

# 删除档名为 file1 之文档.
$ rm file1
# 删除档名中有五个字元，前四个字元为file 之所有文档.
$ rm file?
# 删除档名中，以 f 为字首之所有文档.
$ rm f*
# 删除目录 dir1，及其下所有文档及子目录.
$ rm -r dir1
8.cp 文档的复制

命令格式: cp [-r] source destination

# 将文档 file1 复制成 file2
$ cp file1 file2
# 将文档 file1 复制到目录 dir1 下，文件名仍为 file1.
$ cp file1 dir1
# 将目录 /tmp 下的文档 file1复制到现行目录下，文件名仍为 file1.
$ cp /tmp/file1 .
# 将目录 /tmp 下的文档 file1现行目录下，档名
为file2
$ cp /tmp/file1 file2
# (recursive copy) 复制整个目录.
$ cp -r dir1 dir2
# 复制dir1整个目录到dir2
$ cp -R dir1 dir2
9.mv 移动文件

命令格式： mv source destination

# 将文档 file1，更改档名为 file2.
$ mv file1 file2
# 将文档 file1，移到目录 dir1 下，档名仍为 file1.
$ mv file1 dir1
# 若目录 dir2 不存在，则将目录 dir1，及其所有档案和子目录，移到目录 dir2 下，新目录名称为 dir1.若目录dir2 不存在，则将dir1，及其所有文档和子目录，更改为目录 dir2.
$ mv dir1 dir2
10.grep 搜索

$ grep string filename
# 在a.js文件中查找===字符串，并且显示行号
$ grep -rn '====' a.js
```

```
vim: 链接: http://pan.baidu.com/s/1hr2W8RE 密码: qay8
vim 05-vim.html
ESC 在不同模式之间切换
进入插入模式之后不能输入各种命令
i 在当前位置前面插入
I 在当前行首插入内容
o 在当前行下面插入一行
O 在当前行上面插入一行
a 在当前位置后面插入字符
A 在当前行尾插入字符

移动：
hjkl : wasd类似
gg 文件的开头第一行
w e b 单词之间跳转
显示行号，进入末行模式 :set nu
在命令模式下输入:

:100 到100行
100G 到100行
:1,5 copy 7   拷贝1-5行，粘贴到第7行
字符选择，按v
复制 y 复制一行yy 复制10行 10yy  复制当前光标到末尾 y$ 复制当前光标到文件末尾yG
粘贴 p
```

```
命令状态：

j,k,h,l:上下左右
0： 行首
$: 行尾
i,I :插入命令，i 在当前光标处插入 I 行首插入
a,A:追加命令，a 在当前光标后追加，A 在行末追加
o,O:打开命令，o 在当前行下打开一行，O在当前行上插入一行
r,R :替换命令，r 替换当前光标处字符，R从光标处开始替换
数字s: 替换指定数量字符
x: 删除光标处字符
dd: 删除当前行
d0: 删除光标前半行
d$: 删除光标后半行
ctrl+f :后翻页
ctrl+b:前翻页
G : 文件尾
数字G: 数字所指定行
/string 查找字符串
n 继续查找
N 反向继续查找
% 查找对应括号
u 取消上次操作
ex命令状态
：0 文件首
：1,5 copy 7 块拷贝
：1，5 del 块删除
：1，5 move 7 块移动
：1，$s/string1/string2/g 全文件查找string1并替换为string2
：wq! 存盘退出
```

```
github
程序员的社交网站 没有妹子，只有代码  开源项目的集中地
注册一个github帐号，需要在邮箱中进行验证
下载git命令行工具
打开命令行工具：
git config --global user.name "你的github用户名"
git config --global user.emal "你的github邮箱"


git clone 仓库地址
git pull

git的更多学习：https://guoyongfeng.github.io/book/01/04-git%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8.html
在bbs.duchengjiu.top这个网站找一下git系列教程

将本地修改提交到远程仓库
git add .
git commit -m '描述'
git push origin master

正负性的值 http://www.cnblogs.com/snandy/p/3589517.html
```


IIFE

```
// 最常用的两种写法
(function(){ /* code */ }()); // 老道推荐写法
(function(){ /* code */ })(); // 当然这种也可以

// 括号和JS的一些操作符（如 = && || ,等）可以在函数表达式和函数声明上消除歧义
// 如下代码中，解析器已经知道一个是表达式了，于是也会把另一个默认为表达式
// 但是两者交换则会报错
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();

// 如果你不怕代码晦涩难读，也可以选择一元运算符
!function(){ /* code */ }();
~function(){ /* code */ }();
-function(){ /* code */ }();
+function(){ /* code */ }();

// 你也可以这样
new function(){ /* code */ }
new function(){ /* code */ }() // 带参数
```

##20170822
onload事件在window对象，还有图片对象，音视频
vim 中写代码，按大小写的aio都可以进入插入模式
按ESC，然后输入  :wq!  保存并强制退出
ZZ 也保存退出
:w 保存
:q 退出

reset.css
```
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

实体字符：
&nbsp; 空格
&gt;   >
&lt;   <
&copy; 版权号
&reg;  
&quot; "
&amp;  &

##组件化思想
将一个小组件的css写好之后放到一个css文件
组件对应的js放到一个js文件中
在需要使用的页面将css和js引入；写上对应的html结构就搞定了

##伪代码|画图
假的代码，能够指导你的开发思想
可以用中文加上你会写的代码，描述性的
好处：让你从没思路到有思路
如果伪代码也写不出来，在图纸上多画一画, 光去想想不出来的时候写出来画出来，慢慢思路就有了

#20170823
```
html,css,js代码缩进使用2个空格，不要使用tab或四个空格
html元素中的id主要给js用，不要给css用
写方法的话，尽可能让一个方法只完成一件事情
后面写构造函数（类）的时候，一个类只描述一个对象

可以使用正则的常用方法有
字符串的 `replace`, search, match, split
正则对象的 exec `test`
所有语言都有正则,是通用的技能

正则表达式的创建
字面量的方式：/正则/修饰符
对象的方式：  new RegExp('正则字符串', '修饰符');

- 字符类型
  . 除了回车换行之外的任意字符
  \d [0-9]
  \D [^0-9]
  \s 空白字符
  \S 非空白字符
  \w [0-9a-zA-Z_]
  \W 非\w
  \t 制表符
  \n 换行符
- 字符集合
  [1234] 表示一个字符，匹配1，2,3,4中的任意一个
  [^1234] 表示一个字符，匹配不是1,2,3,4的任意一个

- 边界
  ^ 匹配开头
  $ 匹配结束
  \b 匹配单词边界
- 分组与反向引用
  ()
- 或者
  | 可以单独使用或者在分组内部使用；不能够在字符集中使用, 在字符集中就表示一个竖线
  a|b
  (sina|qq)  
  [sina|qq]  x错误的使用方式
- 数量词
  {2} 精确匹配前面的一个字符或一个分组2次
  {2,} 至少2次，最多不限
  {2,8} 匹配2次到8次之间
  ? 0或1次
  + 1或多次
  * 0或多次
  ```

  CSS透明度：
  ```
  .transparent_class {
  /* IE 8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";

  /* IE 5-7 */
  filter: alpha(opacity=50);

  /* Netscape */
  -moz-opacity: 0.5;

  /* Safari 1.x */
  -khtml-opacity: 0.5;

  /* Good browsers */
  opacity: 0.5;
}
```

#20170824
表单验证的方式：
  - 在表单的submit事件中：验证失败返回false,  表单将不会提交；全部通过返回true, 正常提交表单
  - 在form的input元素blur事件，当验证失败给当前input元素的状态设置为false, 并将整个表单的一个状态进行重新计算，当表单的状态为可用，让提交按钮可用；
  表单状态信号 = input1.状态信号 === true && input2.状态信号 === true ...
  表单状态信号 = input1.状态信号 && input2.状态信号 ...

  造轮子：把基础的东西我们要自己写出来；以后需要开发类似的功能，可以直接使用
  包括了
    - js验证库（写一堆校验的方法)
    - css库（写一堆方便使用的class样式)
    - web组件库（写一堆有界面有交互的小挂件，小组件）组件就是我们网页中经常会出现的一些小模块（包括了html,css,js)

透明度：
  opacity: .2;
  filter: alpha(opacity=20);

js设置透明度：
  var oSpan = document.getElementsByTagName('span')[0];
  var opacity = 0.1;
  oSpan.style.opacity = opacity;
  oSpan.style.filter = "alpha(opacity=" + opacity*100 + ")"

针对最新的浏览器：
offsetParent    找到离自己最近的已定位的元素为参考元素
offsetLeft      自身的border外侧到offsetParent元素的内边框
offsetTop
offsetWidth     width + padding + border
offsetHeight    height + padding + border
clientWidth     width + padding
clientHeight    height + padding

开启定时器
var timer = setInterval(函数, 间歇时间); //函数的地方不要去调用，直接给函数
//方式一
var timer = setInterval(function(){
}, 1000);
//方式二
function fun() {
}
var timer = setInterval(fun, 1000);
停止定时器
clearInterval(timer);

定时器的注意事项：在你开启定时器之前最好先关闭定时器：设表先关

##标准的动画
```
//配置参数
var oDiv = document.getElementById('odiv');
var time = 1000;
var interval = 20;
var frames = time / interval;
var distance = 400;
var step = distance / frames;

//信号量
var startLeft = 100;//起始位置信号量
var frame = 0; //当前帧信号量

var timer = setInterval(function(){
  frame++;
  oDiv.style.left = startLeft + step * frame + 'px';
  if (frame >= frames) {
    clearInterval(timer);
  }
}, interval);
```

图片的load事件，表示图片已经下载完成
offsetLeft, offsetWidth, clientWidth这些值都需要等图片下载完成之后才能获得

//当页面上所有的资源都加载完成之后再执行, 这个方法只能绑定一次，绑定多次会覆盖
window.onload = function(){

}
//这个事件是当页面内容加载完成的时候会执行，可以绑定多次，会依次执行
document.addEventListener('DOMContentLoaded', function(){

})
//jquery的写法，当DOM内容加载完成的时候执行
$(function(){

})

如何判断页面上所有的图片都加载完成
`通过一个加载完成的个数信号量，加载完一张就把信号量+1， 当信号量的值和图片标签的个数相等时，表示页面中的所有图片加载完成`
在图片加载完成之后就可以让无缝滚动的功能开始工作

通用的技术点：
正则
JSON

JSON编码格式必须是UTF-8, 如果是GBK或其他则需要先转换后再生成JSON

前后端的区分：
前端是指工作在浏览器上面的所有事情都是前端负责(html, css, js[动态效果，和后端打交道，获取数据])
后端是工作在服务器上的所有事情：动态编程语言（java,php,python,ruby)+数据库（mysql,mongodb,redis)
