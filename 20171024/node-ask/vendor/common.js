let md5 = require('./md5');
let config = require('../config/config');
module.exports = {
  encryption: (password) => {
    return md5(md5(password + config.SALT));
  },
  errorMessage: (message) => {
    return `<h2 style="color:red">${message}</h2>`;
  }
}
