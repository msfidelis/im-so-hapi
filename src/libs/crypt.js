bcrypt = require('bcrypt')

var crypt = function(raw) {
  return bcrypt.hashSync(raw, 10);
}

module.exports = crypt;
