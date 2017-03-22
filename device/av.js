'use strict';

const cp = require('child_process');

function ffmpeg (options) {
  opts.unshift('-v', 'fatal'); // Comment out to see ffmpeg logging
  const ffmpegProcess = cp.spawn('ffmpeg', options);
  return new Promise((resolve, reject) => {
    ffmpegProcess.on('exit', code => {
      if (code != 0) {
        console.error(code);
        reject(code);
      } else {
        resolve();
      }
    });
    ffmpegProcess.stderr.on('data', data => {
      console.log(data.toString()); // Logging when not suppressed
    });
  });
}

module.exports.capture = function (filepath) {
  const captureArgs = [
    '-y', // Overwrite
    '-s', '320x240', 
    '-r', '15', // Framerate
    '-i', '/dev/video0', // Mount location of video camera
    '-q:v', '2', // Quality (1 - 31, 1 is highest)
    '-vframes', '1', // Total number of frames in the "video"
    filepath
  ];
  return ffmpeg(captureArgs).then(() => filepath);
};