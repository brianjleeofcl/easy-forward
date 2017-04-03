
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {
          id: 1,
          user_id: 1,
          url: 'k8mep2bMyJ',
          title: 'Test shot, Thursday afternoon',
          created_at: '2017/03/26 22:34:00 UTC'
        },
        {
          id: 2,
          user_id: 1,
          url: 'l4zbq2dprO',
          title: 'Test shot2, Monday afternoon',
          created_at: '2017/04/03 14:03:00 PDT'
        }
      ]);
    });
};
