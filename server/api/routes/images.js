const knex = require('../../knex');

const express = require('express');
const router = express.Router();

const boom = require('boom');

router.get('/', (req, res, next) => {
  knex('images').innerJoin('users', 'users.id', 'images.user_id').select(
    'images.id', 
    'users.name',
    'images.url',
    'images.title',
    'images.created_at'
  ).then((images) => res.send(images))
  .catch(err => next(boom.create(err)))
});

router.get('/:url', (req, res, next) => {
  knex('images').innerJoin('users', 'users.id', 'images.user_id').select(
    'images.id', 
    'users.name',
    'images.url',
    'images.title',
    'images.created_at'
  ).where('url', req.params.url).then(([image]) => {
    if (!image) {
      next(boom.notFound('No project matching the id was found'))
    }

    res.send(image)
  }).catch(err => next(boom.create(err)))
})

module.exports = router;