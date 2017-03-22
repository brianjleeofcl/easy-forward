const knex = require('../../knex');

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const boom = require('boom');

function auth(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, claim) => {
    if (err) {
      next(boom.unauthorized('Invalid access token'));
    }

    req.claim = claim
    next()
  })
};

router.get('/:id', auth, (req, res, next) => {
  
})

module.exports = router;