#NodeJS问答系统

##技术栈

Web服务器：Express
数据库：MongoDB
模板引擎：EJS
后端包管理：npm
前端包管理：bower

##功能

###用户模块

- 注册功能
- 登录
- 查看用户信息
- 退出
- 修改个人信息
- 上传头像
- 裁剪头像

{
  id:
  username:
  password:
  avatar:
  last_login_at:
  sex:
}

###问答

- 创建问题
- 查看问题列表
- 查看问题详情
- 对问题进行评论
- 对问题进行顶或踩

{
  title:
  content:
  created_at:
  author:
  up: 1,
  down: 2,
  comments: [
    {content: author: created_at, vote:1}
  ]
}
