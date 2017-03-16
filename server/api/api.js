const express = require('express');
const router = express.Router()

// router.use('/scores', require('./routes/scores'))
router.use('/user', require('./routes/users'))

module.exports = router;
