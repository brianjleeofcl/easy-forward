
exports.up = function(knex) {
  return knex.schema.createTable('devices', table => {
    table.increments()
    table.integer('user_id').references('id').inTable('users').notNullable().index()
    table.string('nickname').notNullable()
    table.specificType('MAC_address', 'char(17)')
    table.string('url').defaultTo(null)
    table.string('socket_id').defaultTo(null)
    table.boolean('busy').defaultTo(false)
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('devices')
};
