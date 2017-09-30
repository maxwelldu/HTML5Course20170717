学习之前的安装：
npm config set loglevel=http

npm i ejs
npm i -g mustache
npm install --save handlebars
npm i -g jade
npm i -g pug-cli

npm i -g less
npm i -g stylus
npm i -g postcss-cli
npm i -g autoprefixer
npm i -g babel-cli
npm i -g typescript
npm i -g coffee-script




#html模板引擎
html: ejs, mustache, handlerbars, jade pug [最主要的是学jade]
ejs
  教程链接 http://www.embeddedjs.com/getting_started.html  https://www.npmjs.com/package/ejs  https://ionicabizau.github.io/ejs-playground/
  安装： npm i ejs
  引入：新建html, script引入node_modules/ejs/ejs.min.js
  新建模板：新建index.ejs
  新建数据：var data = {};
mustache
  链接：http://mustache.github.io/  https://github.com/janl/mustache.js/
  http://www.jianshu.com/p/7f1cecdc27e1
  1. 新建一个文件夹
  2. 在当前文件夹中打开命令行
  3. npm i -g mustache
  4. 新建index.mustache (自己新建普通文件，后缀名叫mustache就行)
  5. 新建index.json
  6. mustache index.json index.mustache > index.html

  安装：npm i -g mustache
    如果是这样全局安装的，使用的时候直接输入 mustache  (因为这个地址被在环境变量的PATH里面，也就是说你输入任何的命令，他都会到环境变量里面统统找一遍，找到就执行，找不到就报command not found)
    npm i mustache
    如果是这样局部安装， 使用的时候输入 ./node_modules/mustache/bin/mustache
  命令行使用：
    新建index.mustache, 新建index.json
    //表示执行mustache这个命令，传入两个参数index.json index.mustache, >表示输出到index.html
    mustache index.json index.mustache > index.html

    ```
  npm i mustache
   ./node_modules/mustache/bin/mustache index.json index.mustache > index.html
    ```

    如果希望每次都输这个命令是不是挺费劲的，所以希望用一个简单的命令代替他
    1. npm init -y 或者  npm i -S mustache
    2. package.json
    ```
    {
      "scripts": {
        "build": "mustache index.json index.mustache > inex.html"
      }
    }
    ```
    3. npm run build

    如果希望在页面里面直接使用，不用命令行编译
    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <script src="./node_modules/mustache/mustache.js" charset="utf-8"></script>
    </head>
    <body>
      <script>
        var view = {
          title: "Joe",
          calc: function () {
            return 2 + 4;
          }
        };

        var output = Mustache.render("{{title}} spends {{calc}}", view);
        document.querySelector('body').innerHTML += output;
      </script>
    </body>
    </html>
    ```

handlerbarjs
  链接：http://handlebarsjs.com/  http://www.ghostchina.com/introducing-the-handlebars-js-templating-engine/
  安装：npm install --save handlebars


html预处理器(你写的代码不是目标代码，写这种预处理的语言，帮你编译成目标代码)：jade pug
  链接：http://jade-lang.com/command-line
  安装：npm i -g jade
  jade index.jade
  jade list.jade

pug
  链接：https://segmentfault.com/a/1190000006198621
  https://www.npmjs.com/package/pug
  安装：npm i -g pug-cli

css: less, sass, stylus, postcss [最主要的是学sass]
  less
  下载：npm i -g less
  命令行使用：lessc index.less index.css
  代码的使用：后面在gulp里面会使用
  浏览器端：下载less.js文件，在文件中引入

  sass
  链接：http://www.sass.hk/install/
  compass: http://www.ruanyifeng.com/blog/2012/11/compass.html
  compass compile
  compass compile --output-style compressed
  compass watch
  
js: typescript, es6, coffeescript [最主要的是学es6]
