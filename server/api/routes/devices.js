const knex = require('../../knex');

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

function auth(req, res, next) {

};

router.get('/', auth, (req, res, next) => {
  next()
});


module.exports = router;