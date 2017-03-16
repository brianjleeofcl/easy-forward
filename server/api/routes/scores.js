const knex = require('../../knex');

const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
  knex('scores').innerJoin('users', 'users.id', 'scores.user_id')
    .select('users.name', 'score', 'scores.id', 'scores.updated_at')
    .orderBy('score', 'desc').limit(15).then(arr => res.send(arr))
})

router.post('/game', (req, res) => {
  const { userId, score } = req.body

  knex('scores').insert({ user_id: userId, score }, '*').then((arr) => {
    res.send(arr[0])
  })
})

router.patch('/game', (req, res) => {
  const { id, score } = req.body
  const updated_at = new Date()
  knex('scores').where('id', id).update({ score, updated_at }, '*').then(arr => {
    res.send(arr[0])
  })
})

module.exports = router;
