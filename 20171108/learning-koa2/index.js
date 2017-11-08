let Koa = require('koa');
let app = new Koa();

app.use(async ctx => {
  // ctx.body = '<h1>hello world</h1>';
  ctx.body = {
    data: [
      {
        id:1,
        name:"max"
      }
    ]
  }
});

app.listen(3000);
