// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '0.0.0.0',
      database: 'api_exemplo',
      user:     'matheus',
      password: 'batatinha'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
