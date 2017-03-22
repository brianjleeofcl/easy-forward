const express = require('express');
const router = express.Router()

const boom = require('boom')

router.use('/streams', require('./routes/streams'))

router.use((req, res, next) => {
  next(boom.notFound())
});

module.exports = router;