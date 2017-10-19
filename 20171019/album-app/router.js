let fs = require('fs');
let path = require('path');
let url = require('url');
let ejs = require('ejs');
let formidable = require('formidable');
let sd = require('silly-datetime');
let util = require('util');

//显示首页
function showIndex(req, res) {
  //读取模板文件ejs, 读取uploads目录的子目录
  fs.readFile('./views/index.ejs', (err, data) => {
    if (err) {
      throw err;
    }
    let template = data.toString();
    //读取目录下的子目录,异步
    let uploadDir = __dirname + '/uploads/';
    fs.readdir(uploadDir, (err, files) => {
      //过滤目录, 子目录的数组
      let subFolders = [];
      (function iterator(i){
        //当所有的都检测完成
        if (i === files.length) {
          //合并模板，渲染前台页面
          let html = ejs.render(template, {subFolders});
          res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
          res.end(html);
          return;
        }
        let subFileName = uploadDir + files[i];
        fs.stat(subFileName, (err, state) => {
          if (err) {
            throw err;
          }
          if (state.isDirectory()) {
            subFolders.push(files[i]);
          }
          iterator(i+1);
        });
      })(0);
    });
  });
}
function showAdmin(req, res) {
  fs.readFile('./views/admin.ejs', (err, data) => {
    if (err) {
      throw err;
    }
    let template = data.toString();
    //读取目录下的子目录,异步
    let uploadDir = __dirname + '/uploads/';
    fs.readdir(uploadDir, (err, files) => {
      //过滤目录, 子目录的数组
      let subFolders = [];
      (function iterator(i){
        //当所有的都检测完成
        if (i === files.length) {
          //合并模板，渲染前台页面
          let html = ejs.render(template, {subFolders});
          res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
          res.end(html);
          return;
        }
        let subFileName = uploadDir + files[i];
        fs.stat(subFileName, (err, state) => {
          if (err) {
            throw err;
          }
          if (state.isDirectory()) {
            subFolders.push(files[i]);
          }
          iterator(i+1);
        });
      })(0);
    });
  });
}
//显示相册中的所有图片
function showPhotos(req, res) {
  let dirname = url.parse(req.url).pathname;
  fs.readFile('./views/photos.ejs', (err, data) => {
    if (err) {
      throw err;
    }
    //得到模板
    let template = data.toString();
    let albumPath = __dirname + '/uploads/' + dirname;
    //获取目录下的所有文件
    fs.readdir(albumPath, (err, files) => {
      //所有的图片都放到这个数组中
      let photos = [];
      (function iterator(i){
        if (i === files.length) {
          let html = ejs.render(template, {photos});
          res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
          res.end(html);
          return;
        }
        let photopath = albumPath + '/' + files[i];
        fs.stat(photopath, (err, state) => {
          if (!state.isDirectory()) {
            photos.push('/uploads/' + dirname + '/' + files[i]);
          }
          iterator(i+1);
        });
      })(0);
    });
  });
}
//显示图片
function showImage(req, res) {
  let pathname = url.parse(req.url).pathname;
  //拓展名
  var extname = path.extname(pathname);
  //真的读取这个文件
  fs.readFile(__dirname + pathname , (err, data) => {
    if (err) {
      throw err;
    }
    var mime = getMime(extname);
    res.writeHead(200, {"Content-Type": mime});
    res.end(data);
  });
}
//上传图片
function upload(req, res){
  //创建一个新的来源表单
  let form = new formidable.IncomingForm();
  form.uploadDir = './uploads';
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err;
    }
    console.log(fields, files);
    console.log(util.inspect({fields, files}));//ES6的简写相当于，{fields: fileds, files: files}
    let albumName = fields.album;

    //时间，使用silly-datetime
    let time = sd.format(new Date(), 'YYYYMMDDHHmmss');
    let rand = Number.parseInt(Math.random() * 89999 + 10000);
    let extname = path.extname(files.pic.name);
    let oldpath = __dirname + '/' + files.pic.path;
    //新的路径
    let newpath = __dirname + '/uploads/' + albumName + '/' + time + rand + extname;
    console.log('newpath = ' + newpath);
    //改名
    fs.rename(oldpath, newpath, (err) => {
      if (err) {
        throw err;
      }
      res.writeHead(200, {'content-type':'text/html;charset=utf-8'});
      res.end('成功');
      //:TODO跳转到对应的相册
    });
  });
}
//创建相册
function createAlbum(req, res) {
  //得到新的相册的名称
  var albumName = url.parse(req.url, true).query.name;
  //创建之前先检测一下是否存在
  //:TODO
  fs.mkdir(__dirname + '/uploads/' + albumName, function(err, data) {
    if (err) {
      return res.end('1');//出错了
    }
    return res.end('0');//创建成功
  });
}
function getMime(extname) {
  //表驱动法
  var extObj = {
    ".html": "text/html",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".css": "text/css",
    ".js": "text/javascript"
  };
  return extObj[extname];
}
module.exports = {
  showIndex,
  showAdmin,
  showPhotos,
  showImage,
  upload,
  createAlbum
}
