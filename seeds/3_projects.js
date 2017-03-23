
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          id: 1, 
          user_id: 1, 
          duration: 1000 * 60 * 60,
          interval: 1000 * 60 * 3,
          hash_id:'VolejRejNm', 
          last_frame_index: 20, 
          published_url: 'http://temporary-url'
        }
      ]);
    }).then(() => {
      return knex.raw(
        "SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));"
      )
    });
};
