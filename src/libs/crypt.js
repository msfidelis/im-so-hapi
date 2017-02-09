bcrypt = require('bcrypt')

var crypt = function(raw) {
  return bcrypt.hashSync(raw, 10);
}

/**
 * Lib genérica com algumas funções de Hashing com Bcrypt
 * @type {[type]}
 */
module.exports = crypt;
