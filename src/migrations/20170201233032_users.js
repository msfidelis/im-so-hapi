
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('users', (table) => {
  			table.uuid('id').primary()
  			table.string('email').unique().notNullable()
  			table.string('password').notNullable()
  			table.timestamps()
 		 })
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
			knex.schema.dropTable('users')
		]);
};
