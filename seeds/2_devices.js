
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('devices').del()
    .then(function () {
      // Inserts seed entries
      return knex('devices').insert([
        {
          id: 1,
          user_id: 1,
          nickname: 'First camera',
          MAC_address: '02:a3:70:35:bc:a6',
          socket_id: null
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('devices_id_seq', (SELECT MAX(id) FROM devices));"
      )
    });
};
