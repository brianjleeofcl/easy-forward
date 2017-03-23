
exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').notNullable().index();
    table.integer('duration').notNullable();
    table.integer('interval').notNullable();
    table.string('hash_id');
    table.integer('last_frame_index').defaultTo(0);
    table.timestamp('recording_completed_at').defaultTo(null);
    table.string('published_url').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
