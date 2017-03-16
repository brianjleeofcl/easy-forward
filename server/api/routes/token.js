const knex = require('../../knex');

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const boom = require('boom');

router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {
  const {email, password} = req.body;

  let user;
  knex('users').where('email', email).then(([existingUser]) => {
    if (!existingUser) {
      throw boom.badRequest('Invalid email or password');
    }

    user = existingUser
    return bcrypt.compare(password, existingUser.pw_hash)
  })
  .then((resBool) => {
    if (!resBool) {
      throw boom.badRequest('Invalid email or password');
    }

    delete user.pw_hash;

    const claim = {id: user.id}
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '120 days'
    });

    res.cookie('token', token, {
      httpOnly: true,
      expiresIn: new Date(Date.now() + 3600000 * 24 * 120),
      secure: router.get('env') === 'Production',
    });

    res.send(user);
  })
  .catch(err => next(err));
})

router.delete('/', (req, res, next) => {
  res.clearCookie('token');
  res.end();
})

module.exports = router