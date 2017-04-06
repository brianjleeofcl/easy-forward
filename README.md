# Easy Forward

##### Capstone Project!
Brian J Lee, created March 2017.

## Description

Time lapse camera, built using ~~Tessel 2 development board~~ Raspberry Pi, incorporating Socket.io, ImageMagic and Express.js; frontend built using Angular 2.4

## Installation

### Hardware requirements
This project requires a development board to serve as the remote device. For best performance, use a Raspberry Pi running the latest version of Raspian OS and the RPi camera module. Otherwise, most development boards capable of installing and running Node.js will work with small adjustments to the code.

If using a setup other than Raspberry Pi with the native camera module, a UVC webcam with the appropriate interface for connecting with the development board is required.

All systems will require either sufficient internal memory space or external storage device such as a USB flash drive or an external hard disk.

### Dependencies
Install [ImageMagick](https://www.imagemagick.org/script/download.php) and [PostgreSQL](https://www.postgresql.org/download/). Both are available on [Homebrew](https://brew.sh/) for MacOS or APT on Debian-based linux distributions.

### Device

#### Raspberry Pi

#### Tessel 2
Initialize [Tessel 2 and T2-CLI](http://tessel.github.io/t2-start/). Run the device files with `t2 run device/main.js` or deploy file to device with `t2 push device/main.js`.

#### Other development boards
Follow instructions for deploying code to your device. The code from T2 can be reused after adjustments to NPM io packages and Johnny Five settings.

### Development
Run `yarn` or `npm install` to install dependencies. Run `yarnpkg knex migrate:latest` (or `npm run knex migrate:latest`) and `yarnpkg knex seed:run` (or `npm run knex seed:run`) to initialize database.

Start development server with `yarnpkg start` or `npm start`. `http://localhost:4200` proxies to backend running on `http://localhost:3000` by default.

## Features



## Technology

#### Frontend
* [Angular2](https://angular.io) with [TypeScript](https://www.typescriptlang.org/) and [RxJS](http://reactivex.io/rxjs/)
* Angular CLI
* [Bootstrap 4.0.0](http://v4-alpha.getbootstrap.com/) with [ng-bootstrap](https://ng-bootstrap.github.io/#/home)

#### Backend
* [Express.js](https://expressjs.com)
* [Socket.io](https://socket.io)
* [ImageMagick](https://www.imagemagick.org/script/index.php)

#### Database
* [PostgreSQL](https://postgresql.org) with [Knex](https://knexjs.org)

#### Storage
* [AWS S3](https://aws.amazon.com/s3/)

#### Device
* Hardware: Raspberry Pi or [Tessel 2](https://tessel.io/)
* Software: Node.js, [Johnny-Five](http://johnny-five.io/) optional

## Further Development

##### TODO
* Improve styling
* Improve device stability
* Meta tags (service incorporated in Angular 4.0.0, consider migrating once dependencies catch up!)
* NativeScript
* Stepper motor