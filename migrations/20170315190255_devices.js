
exports.up = function(knex) {
  return knex.schema.createTable('devices', table => {
    table.increments()
    table.string('nickname').notNullable()
    table.specificType('MAC_address', 'char(17)')
    table.string('socket_id')
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('devices')
};
