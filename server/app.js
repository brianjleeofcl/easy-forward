const path = require('path');
const express = require('express');
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

app.use(
  require('morgan')('dev'),
  require('body-parser').json(),
  require('cookie-parser')()
)

app.use('/api',require('./api/api'))

// app.use(express.static(path.resolve(__dirname, '..', 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

app.use('*', (err, req, res, next) => {
  console.error(err)
  res.sendStatus(err.output.status).end(err.output)
})

module.exports = app;
