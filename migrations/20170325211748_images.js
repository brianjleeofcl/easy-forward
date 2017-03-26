
exports.up = function(knex) {
  return knex.schema.createTable('images', table => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').index();
    table.string('url').notNullable().unique();
    table.string('title').notNullable();
    table.timestamps(true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('images')
};
