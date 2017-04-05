const knex = require('../../knex');

const express = require('express');
const router = express.Router();

const HashId = require('hashids');
const hash = new HashId('', 10)
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

router.get('/', auth, (req, res, next) => {
  knex('projects').where('user_id', req.claim.id).then((projects) => res.send(projects))
    .catch(err => next(boom.create(err)))
});

router.get('/:id', auth, (req, res, next) => {
  knex('projects').where('id', req.params.id).then(([project]) => {
    if (!project) {
      next(boom.notFound('No project matching the id was found'))
    }
    if (project.user_id !== req.claim.id) {
      next(boom.unauthorized('Invalid access token'))
    }

    res.send(project)
  }).catch(err => next(boom.create(err)))
})

router.post('/new', auth, (req, res, next) => {
  const user_id = req.claim.id
  const { duration, interval } = req.body
  const created_at = new Date()
  const updated_at = new Date()

  if (!user_id || !duration || !interval) {
    next(boom.badRequest('Missing input'))
  }

  knex('projects').insert({
    user_id, 
    duration, 
    interval, 
    last_frame_index: -1, 
    created_at, 
    updated_at
  }, '*').then(([project]) => {
    const hash_id = hash.encode(project.id)

    return knex('projects').where('id', project.id).update({hash_id}, '*')
  }).then(([augProject]) => res.send(augProject)).catch(err => next(boom.create(err)))
});

module.exports = router;