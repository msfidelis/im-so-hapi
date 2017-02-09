'use strict'

let db = require('../libs/database');

/**
 * Model de Usuários
 * @type {[type]}
 */
module.exports = db.Model.extend({
  tableName : 'users',
  hasTimestamps : true,
  uuid : true,
  bcrypt: {
    field : 'password'
  },
  hidden : ['password']
});
