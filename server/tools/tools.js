const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const boom = require('boom');

router.get('/install/pi', (req, res, next) => {
  fs.readFile(path.join(__dirname, 'install', 'pi', 'install.sh'), 'utf-8', (err, data) => {
    if (err) return next(boom.create(500, 'file read error', err));
    res.set('Content-Type', 'application/sh').send(data);
  });
});

router.get('/install/t2', (req, res, next) => {
  fs.readFile(path.join(__dirname, 'install', 't2', 'install.sh'), 'utf-8', (err, data) => {
    if (err) return next(boom.create(500, 'file read error', err));
    res.set('Content-Type', 'application/sh').send(data);
  });
});

router.use((req, res, next) => {
  next(boom.notFound());
});

module.exports = router;
