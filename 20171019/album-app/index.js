let http = require('http');
let url = require('url');
let router = require('./router');

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return;
  //路由处理
  let pathname = url.parse(req.url).pathname;
  console.log(pathname, pathname.substr(0, 9));
  //首页显示相册列表
  if (pathname === '/') {
    return router.showIndex(req, res);
  //后台
  } else if(pathname === '/admin') {
    return router.showAdmin(req, res);
  //专门处理上传图片
  } else if (pathname === '/upload') {
    return router.upload(req, res);
  //创建相册
} else if (pathname.substr(0, 13) === '/create-album') {
    return router.createAlbum(req, res);
  //显示图片
  } else if (pathname.substr(0, 9) === '/uploads/') {
    console.log(pathname);
    return router.showImage(req, res);
  //查看一个相册里面的图片
  } else {
    return router.showPhotos(req, res);
  }
}).listen(80);
