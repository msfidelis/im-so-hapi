'use strict'

let Hapi = require('hapi');
let User = require('./models/user');
let Joi = require('joi');
let bcrypt = require('./libs/crypt');
let jwt = require('jsonwebtoken');
let boom = require('boom');

/**
* Chave do JWT
* @type {String}
*/
const JWT_KEY = "DOUTOR E QUEM TEM DOUTORADO";

/**
* Server Configuration
* @type {Hapi}
*/
let server = new Hapi.Server();

/**
* Define a porta de comunicaçãos
* @type {[type]}
*/
server.connection({ port : 8080});

/**
* Registra o JWT no Hapi
*/
server.register(require('hapi-auth-jwt2'), (err) => {

  if (err) throw err;

  function validate(jwt, request, callback) {
    User.forge( {id: jwt.id})
    .fetch()
    .then((user) => {
      if (user) {
        callback(null, true, user.toJSON());
      } else {
        callback(null, false);
      }
    })
    .catch((err) => callback(err))
  }

  server.auth.strategy('jwt', 'jwt', true, {
      key: JWT_SECRET_KEY,
      validateFunc: validate
    }
  );

  server.auth.default('jwt');
})


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

    let user;

    /**
    * Busca o usuário no banco e compara com as credenciais informadas
    * @type {[type]}
    */
    User.forge({email : req.payload.email})
    .fetch({require : true})
    .then((result) => {
      user = result;
      return result.compare(req.payload.password)
    })
    /**
    * Essa promisse verifica se o usuário é válido.
    * Caso seja, ele retorna um JWT com o ID so usuário
    * @type {[type]}
    */
    .then((isValid) => {
      console.log(isValid);
      res({
        token: jwt.sign({id: user.id}, JWT_KEY)
      });
      /**
      * Retorna um Status de Não autorizado
      * @type {Object}
      */
    }, (err) => res(boom.unauthorized()))
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
 * [method description]
 * @type {String}
 */
server.route({
  method: 'GET',
  path: '/v1/sessions',
  handler: (req, res) => {
    res(req.auth.credentials);
  },
  config: {
    auth : 'jwt'
  }
})

server.start((err) => {
  if (err) {
    throw err;
  }
});


console.log('Server running at: ', server.info.uri)
