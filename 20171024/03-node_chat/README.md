node_chat
=========
express chatdemo
cd chatdemo
npm i
npm i -S socket.io
touch public/javascripts/client.js
touch chat.js
/bin/www中添加
require('../chat').listen(server);

npm i -g jade
在views/layout.jade中引入css和js
npm i -g supervisor
supervisor ./bin/www
实现客户端的连接，用户的上下线打通

整合chatui, sco.js, messanger.js
