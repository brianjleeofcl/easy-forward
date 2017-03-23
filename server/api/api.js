const express = require('express');
const router = express.Router()

const boom = require('boom')

router.use('/users', require('./routes/users'))
router.use('/token', require('./routes/token'))
router.use('/devices', require('./routes/devices'))
router.use('/projects', require('./routes/projects'))

router.use((req, res, next) => {
  next(boom.notFound())
});

module.exports = router;
