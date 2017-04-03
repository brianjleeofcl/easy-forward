
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'Brian Lee',
          email: 'user@example.com',
          //password
          pw_hash: '$2a$12$WKpXHU3GgCX8FHoAmC5wdeHSUMBKPFhz4o503Rmx7BOA5NKVbEfTK'
        },
        {
          id: 2,
          name: 'Janet Reed',
          email: 'jmr@porchlight.com',
          //gardengnomes
          pw_hash: '$2a$12$U12Pm3QGGXeMka5tlr3Ts.BiX.qoEaZyctq9.jGdZOnSMhge8rUui'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      )
    });
};
