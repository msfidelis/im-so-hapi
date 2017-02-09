
 #Stack Utilizada

 * HAPI.JS - https://hapijs.com/ - Rotas da API
 * Knex.JS - http://knexjs.org/ - SQL Builder - MultiDB
 * Bookshelf - http://bookshelfjs.org/ - ORM Builder (Knex)
 * pg - PostgreSQL Connector pro Knex
 * bcrypt - Pacote de Criptografia Bcrypt
 * Joi - Validação ß


 ```
 {
   "name": "happy-hapi",
   "version": "1.0.0",
   "description": "Exemplo de API com Hapi js e Knex",
   "main": "index.js",
   "scripts": {
     "test": "npm test",
     "knex": "knex --knexfile ./knexfile.js"
   },
   "author": "Matheus Fidelis <msfidelis01@gmail.com>",
   "license": "ISC",
   "dependencies": {
     "bcrypt": "^1.0.2",
     "bookshelf": "^0.10.3",
     "bookshelf-bcrypt": "^2.1.0",
     "bookshelf-uuid": "^1.0.0",
     "hapi": "^16.1.0",
     "joi": "^10.2.1",
     "knex": "^0.12.6",
     "pg": "^6.1.2"
   }
 }
ß
 ```


# Rodando as Migrations

* Criando uma migration da tabela users

 ```
 	npm run knex migrate:make users
 ```

* Instalando as Migrations

```
npm run knex migrate:latest
```

* Rollback nas Migrations

```
npm run knex migrate:rollback
```
