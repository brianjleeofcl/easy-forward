const knex = require('../../knex');

const express = require('express');
const router = express.Router();

const aws = require('aws-sdk')
const s3 = new aws.S3()

const leftPad = require('left-pad');
const boom = require('boom');

router.post('/:hash/:index', (req, res, next) => {
  const { hash, index } = req.params;
  const paddedIndex = leftPad(index, 3, '0');
  const reqBuffer = [];

  console.log(`request received: ${index}`);
  req.on('data', chunk => {
    console.log(`incoming data for ${index}`);
    reqBuffer.push(chunk);
  }).on('end', () => {
    console.log('request body received');
    const reqBody = Buffer.concat(reqBuffer);
    s3.putObject({
      ACL: 'public-read',
      Bucket: 'brianjleeofcl-capstone',
      Key: `${hash}-${paddedIndex}.jpg`,
      Body: reqBody,
      ContentEncoding: 'base64',
      ContentType: 'image/jpg',
    }, (err, data) => {
      if (err) {
        console.error(err);
        next(boom.notImplemented('S3 Error', err))
      } else {
        console.log(`${index}: posted to s3 successfully`)
        knex('projects').where('hash_id', hash).then(([project]) => {
          const last_frame_index = project.last_frame_index < index 
            ? index 
            : project.last_frame_index;
          
          return knex('projects').where('hash_id', hash).update({last_frame_index}, '*')
        }).then(([project]) => {
          console.log(project.last_frame_index)
          res.send(project)
        }).catch(err => next(boom.create(err)))
      }
    })
  })
})

module.exports = router;