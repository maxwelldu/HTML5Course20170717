let express = require('express');
let app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('%s:%s', host, port);
});
