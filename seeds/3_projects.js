
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          id: 1, 
          user_id: 1, 
          duration: 1000 * 60 * 3,
          interval: 1000 * 3,
          hash_id:'k8mep2bMyJ', 
          last_frame_index: 53,
          recording_completed_at: new Date(),
          published_at: null
        }
      ]);
    }).then(() => {
      return knex.raw(
        "SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));"
      )
    });
};
