const knex = require('../../knex');

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, claim) => {
    if (err) {
      next(boom.unauthorized('Invalid access token'))
    }

    req.claim = claim
    next()
  })
};

router.get('/', auth, (req, res, next) => {
  knex('devices').where('user_id', req.claim.id).then((devices) => res.send(devices))
});

router.get('/:id', auth, (req, res, next) => {
  knex('devices').where('id', req.params.id).then(([device]) => {
    if (!device) {
      next(boom.notFound('No device matching the id was found'))
    }
    if (device.user_id !== req.claim.id) {
      next(boom.unauthorized('Invalid access token'))
    }

    res.send(device)
  })
})

router.post('/new', auth, (req, res, next) => {
  const { MAC_address, nickname, socket_id } = req.body
  const user_id = req.claim.id

  knex('devices').where('MAC_address', MAC_address).then(([existingDevice]) => {
    if (existingDevice) {
      throw boom.badRequest('Device already registered')
    }

    return knex('devices').insert({user_id, MAC_address, nickname, socket_id}, '*')
  }).then(([newDevice]) => {
    res.send(newDevice)
  })
})


module.exports = router;