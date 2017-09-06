#当你输入一个域并敲下回车，发生了些什么？
根据域名找到IP地址
  本地host文件：在项目上线之前可以用来模拟真实环境；laod.cn上面下载hosts文件覆盖本地的实现翻墙
  域名系统中查找IP
找到IP之后向对应的服务器发送请求
响应回来的是一个静态的HTML文件
响应回来的HTML文件当中有各种资源，浏览器会自动去请求这些资源并解析展示

HTTP协议 https://developer.mozilla.org/zh-CN/docs/Web/HTTP
请求
响应

我们在浏览器中输入一个地址，这是通过GET请求一个网络资源
自己写一个表单，可以模拟POST请求

postman模拟网络请求 https://www.getpostman.com/
导入商城的API，学会测试API

请求一个地址，如果返回的内容是JSON或者XML，我们称这个地址为API地址

- 学会GET请求商品分类，获取的分类中有cat_id, 表示分类ID
- 根据商品分类GET请求商品列表，练习GET传参，知道cat_id, page, pagesize的意思；cat_id是从商品分类返回的数据中得到的；page表示第几页，pagesize是一页的商品数量
- 获取一个具体的商品详情，商品的ID是从商品列表中得到的，自己手动填写上去
- 获取热门商品，没参数
- 搜索商品
- 检查用户名是否被占用
- 注册
- 登录（登录一次之前的token就失效了）
- 查看购物车（需要提供用户的token，这个值是通过登录API得到的)
- 更新购物车（需要传递token, goods_id, number) goods_id商品ID，number商品数量
  添加商品到购物车
  删除商品，当number传递为0时从购物车中删除当前商品
  更改数量的话就把number值改成非0就行
- 查看收货地址
- 添加收货地址
- 删除收货地址
- 查看订单列表
- 下订单，传递一个地址和总价：下完订单，购物车就被清空

 No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
 ajax不允许跨域
 URL: 协议：//域名或IP:端口/路径/文件名?查询参数#hash
 浏览器有同源策略，就是说你只能够请求自己同域里面的资源
 同域：协议, 域名或IP，端口三者都相同的时候表示同域

 GET和POST的区别
 GET传参在请求的文件后面，参数长度受浏览器限制
 POST请求参数在请求头的body部分，可以上传文件，传参的内容长度不受限制

##作业
- 电子商城的首页，商品分类列表展示，热门商品展示
- 代码敲一遍
- 总结知识点
