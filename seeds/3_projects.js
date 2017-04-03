
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
          published_at: new Date()
        },
        {
          id: 2,
          user_id: 1,
          duration: 1000 * 60 * 20,
          interval: 1000 * 30,
          hash_id: 'wpmbk5ezJn',
          last_frame_index: 20,
          recording_completed_at: new Date(),
          published_at: '2017/04/03 14:03:00 PDT'
        },
        {
          id: 3,
          user_id: 1,
          duration: 1000 * 60 * 30,
          interval: 1000 * 60,
          hash_id: 'Opnel5aKBz',
          last_frame_index: 30,
          recording_completed_at: new Date(),
          published_at: '2017-04-03T23:25:42'
        }
      ]);
    }).then(() => {
      return knex.raw(
        "SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));"
      )
    });
};
