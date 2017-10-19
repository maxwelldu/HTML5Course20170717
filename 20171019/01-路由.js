let express = require('express');
let app = express();
app.get('/', (req, res) => {
  res.send('hi');
});
app.get('/admin', (req, res) => {
  res.send('admin page');
});
app.get(/^\/student\/([\d]{10})$/, (req, res) => {
  res.send("学号" + req.params[0]);
});
//自定义一个名字，以冒号开头；这样写的内容通过 req.params.gonghao
app.get("/teacher/:gonghao", (req, res) => {
  res.send("工号：" + req.params.gonghao);
});
app.listen(3000);
