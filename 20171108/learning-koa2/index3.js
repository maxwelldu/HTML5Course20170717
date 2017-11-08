const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
router
.get('/', async (ctx, next) => {
    ctx.body = '<h1>首页</h1>';
})
.get('/users', async (ctx, next) => {
    ctx.body = '<h1>用户列表</h1>';
})
.get('/users/:id', async (ctx, next) => {
  ctx.body = '<h1>用户详情页</h1>' + ctx.params.id;
});
app.use(router.routes());
app.listen(3000);
