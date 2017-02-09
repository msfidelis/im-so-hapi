'use strict'

let Hapi = require('hapi');
let User = require('./models/user');
let Joi = require('joi');
let bcrypt = require('./libs/crypt');

/**
 * Server Configuration
 * @type {Hapi}
 */
let server = new Hapi.Server();
server.connection({ port : 8080})

/**
 * Verifica se a API está online
 * @type {String}
 */
server.route({
  method: 'GET',
  path: '/v1/alive',
  handler : function (req, res) {
    res({'alive' : 'true'});
  }
});

/**
 * Cadastra um usuário
 * @type {String}
 */
server.route({
  method: 'POST',
  path: '/v1/users',
  handler : function (req, res) {

    User.forge(req.payload)
      .save()
      .then((user) => res(user), (err) => res(err))
  },
  config: {
    validate: {
      payload: Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().required()
      })
    }
  }
});

/**
 * Retorna todos os Usuários - TESTE
 * @type {String}
 */
server.route({
  method: 'GET',
  path: '/v1/users',
  handler : function (req, res) {
    User.forge({})
      .fetchAll()
      .then((users) => res(users))
  }
});


/**
 * Rota de Login do usuário
 * @type {String}
 */
server.route({
  method: 'POST',
  path: '/v1/sessions',
  handler : function (req, res) {
    User.forge({email : req.payload.email})
      .fetch({require : true})
      .then((user) => user.compare(req.payload.password)
      .then((isValid) => res({login: isValid}))

      , (err) => res(err))
  },
  config: {
    validate: {
      payload: Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().required()
      })
    }
  }
})

server.start((err) => {
  if (err) {
    throw err;
  }
});


console.log('Server running at: ', server.info.uri)
