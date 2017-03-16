// const knex = require('../../knex');

const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
  const user = {
    id: 1,
    name: 'John Smith',
    email: 'user@example.com',
    devices: [
      {
        uuid: '22OIJWIJ2',
        MAC: '2D:14:A2:11:45:1F',
        nickname: "John's camera"
      },
      {
        uuid: '34WEFOI23',
        MAC: '24:13:A2:14:57:B3',
        nickname: 'Second camera'
      }
    ]
  }
  res.send(user)
})

module.exports = router;
