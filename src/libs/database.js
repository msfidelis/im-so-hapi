'use strict';

let knexfile = require('../knexfile');
let knex = require('knex')(knexfile[process.env.NODE_ENV || 'development']);
let bookshelf = require('bookshelf')(knex);
let bookshelfUuid = require('bookshelf-uuid');

/**
 * Plugins no Bookshelf
 */
bookshelf.plugin(require('bookshelf-uuid'));
bookshelf.plugin(require('bookshelf-bcrypt'));
bookshelf.plugin('visibility');

/**
 * Conexão com o Banco de Dados
 * @type {[type]}
 */
module.exports = bookshelf;
