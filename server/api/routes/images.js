const express = require('express');
const router = express.Router();

const knex = require('../../knex');
const fs = require('fs');
const path = require('path')

const temp = process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, '..', '..', '..', 'tmp');

const request = require('request');
const aws = require('aws-sdk');
const s3 = new aws.S3()
const im = require('gm').subClass({imageMagick: true});

const jwt = require('jsonwebtoken');
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
      next(boom.notFound('No project matching the id was found'));
    }

    res.send(image);
  }).catch(err => next(boom.create(err)));
})

function auth(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, claim) => {
    if (err) {
      next(boom.unauthorized('Invalid access token'));
    }

    req.claim = claim;
    next();
  })
};

const filename = function (hashUrl, num) {
  const str = `000${num}`.slice(-3)
  return `${hashUrl}-${str}.jpg`
}

const s3Url = function (hashUrl, num) {
  return `https://s3.amazonaws.com/brianjleeofcl-capstone/${filename(hashUrl, num)}`
}

function generateRequests (lastFrame, url) {

  return [...Array(lastFrame).keys()].map(num => new Promise(
    (resolve, reject) => request(s3Url(url, num))
      .pipe(fs.createWriteStream(path.join(temp, url, filename(url, num))))
      .on('finish', () => {
        console.log(`${num} finished writing`);
        resolve();
      })
      .on('error', error => {
        console.error(error)
        reject()
      })
  ));
} 

router.post('/new', auth, (req, res, next) => {
  const user_id = req.claim.id;
  const { url, delay, title, last_frame_index } = req.body;

  // step 1: create folder in tmp directory
  fs.mkdir(path.join(temp, url), () => {
    // step 2: request from aws s3 the images and store in the new directory
    // step 3: convert using imageMagick
    Promise.all(generateRequests(last_frame_index, url)).then(() => im(path.join(temp, url, '*.jpg'))
      .delay(delay).write(path.join(temp, `${url}.gif`), function (err) {
        if (err) {
          return next(boom.create(500, `imageMagick write failed`, err))
        }

        const imgData = fs.createReadStream(path.join(temp, `${url}.gif`))
        
        // step 4: upload the converted image to new bucket in s3
        s3.putObject({
          ACL: 'public-read',
          Bucket: 'brianjleeofcl-capstone-gif',
          Key: `${url}.gif`,
          Body: imgData,
          ContentEncoding: 'base64',
          ContentType: 'image/jpg',
        }, (err, data) => {
          if (err) {
            console.error(err);
            return next(boom.create(500, 'S3 Error', err))
          } else {
            const created_at = new Date()
            const updated_at = new Date()

            knex('images').insert({user_id, url, title, created_at, updated_at}, '*')
              .then(([image]) => {
                knex('projects').where('hash_id', url).update('published_at', image.created_at, '*')
                  .then(() => res.send(image))
              }).catch(err => next(boom.create(500, 'Database error',err)))
          }
        })
      })
    )
  })
})

module.exports = router;