let express = require('express');
let app = express();

// 自定义一个视图所在的目录,第二个参数是自定义的,第一个参数是固定
app.set('views', './view')
// 自定义模板引擎，第一个参数是固定，第二个参数表示使用何种模板引擎
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    "news": ['ab', 'cd']
  });
});
app.listen(3000);
