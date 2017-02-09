'use strict'

let db = require('../libs/database');
module.exports = db.Model.extend({
  tableName : 'users',
  hasTimestamps : true,
  uuid : true,
  bcrypt: {
    field : 'password'
  },
  hidden : ['password']
});
