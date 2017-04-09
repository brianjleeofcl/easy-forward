const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const boom = require('boom');

router.get('/install?', (req, res, next) => {
  const boards = { t2: 't2', pi: 'pi' }
  const { board } = req.query

  if (!boards[board]) return next(boom.badRequest('Board format unrecognized'))

  fs.readFile(path.join(__dirname, 'install', board, 'install.sh'), 'utf-8', (err, data) => {
    if (err) return next(boom.create(500, 'file read error', err));
    res.set('Content-Type', 'application/sh').send(data);
  });
});

router.use((req, res, next) => {
  next(boom.notFound());
});

module.exports = router;
