
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {
          id: 1,
          user_id: 1,
          url: 'VolejRejNm',
          title: 'Test shot, Thursday afternoon',
          created_at: '2017/03/26 22:34:00 UTC'
        },
        {
          id: 2,
          user_id: 1,
          url: 'wpmbk5ezJn',
          title: 'Test shot2, Monday afternoon',
          created_at: '2017/04/03 14:03:00 PDT'
        },
        {
          id: 3,
          user_id: 1,
          url: 'Opnel5aKBz',
          title: 'North-facing windows on Jackson',
          created_at: '2017-04-03T23:25:42'
        }
      ]);
    }).then(() => {
      return knex.raw(
        "SELECT setval('images_id_seq', (SELECT MAX(id) FROM images));"
      )
    });
};
