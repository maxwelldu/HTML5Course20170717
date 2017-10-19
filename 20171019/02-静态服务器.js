let express = require('express');
let app = express();
app.use(express.static('./public'));
app.get('/hi', (req, res) => {
  res.send('hi');
});
app.listen(3000);
