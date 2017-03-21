const knex = require('../../knex');

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const boom = require('boom');

// router.get('/', (req, res) => {
//   const user = {
//     id: 1,
//     name: 'John Smith',
//     email: 'user@example.com',
//     devices: [
//       {
//         uuid: '22OIJWIJ2',
//         MAC: '2D:14:A2:11:45:1F',
//         nickname: "John's camera"
//       },
//       {
//         uuid: '34WEFOI23',
//         MAC: '24:13:A2:14:57:B3',
//         nickname: 'Second camera'
//       }
//     ]
//   }
//   res.send(user)
// });

router.post('/new', (req, res, next) => {
  const { email, name, password } = req.body;

  knex('users').where('email', email).then(([existingUser]) => {
    if (existingUser) {
      throw boom.badRequest('Email already exists');
    }

    return bcrypt.hash(password, 12);
  }).then(pw_hash => {
    const user = { email, pw_hash, name};

    return knex('users').insert(user, '*');
  }).then(([newUser]) => {
    delete newUser.pw_hash;

    const claim = { id: newUser.id };
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '7 days'
    });

    res.cookie('token', token, {
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      secure: router.get('env') === 'production'
    });

    res.send(newUser);
  })
  .catch((err) => next(err));
});

module.exports = router;
