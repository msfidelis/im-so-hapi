 
 #Stack Utilizada 

 * HAPI.JS - https://hapijs.com/ - Rotas da API
 * Knex.JS - http://knexjs.org/ - SQL Builder - MultiDB
 * Bookshelf - http://bookshelfjs.org/ - ORM Builder (Knex)
 * pg - PostgreSQL Connector pro Knex


 ```
{
  "name": "happy-hapi",
  "version": "1.0.0",
  "description": "Exemplo de API com Hapi js e Knex",
  "main": "index.js",
  "scripts": {
    "test": "npm test", 
    ""
  },
  "author": "Matheus Fidelis <msfidelis01@gmail.com>",
  "license": "ISC",
  "dependencies": {
    "bookshelf": "^0.10.3",
    "hapi": "^16.1.0",
    "knex": "^0.12.6",
    "pg": "^6.1.2"
  }
}

 ```

 ```
 	npm run knex migrate:make users
 ```