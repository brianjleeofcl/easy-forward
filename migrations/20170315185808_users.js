
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.specificType('pw_hash', 'char(60)').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
