
exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
    table.increments()
    table.integer('user_id').references('id').inTable('users').notNullable().index()
    table.number('duration').notNullable()
    table.number('interval').notNullable()
    table.string('hash_id')
    table.integer('last_frame_index').defaultTo(0)
    table.string('published_url').defaultTo(null)
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects')
};
