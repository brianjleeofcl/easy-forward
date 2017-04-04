# Easy Forward

##### Capstone Project!
Brian J Lee, created March 2017.

## Description

Time lapse camera, built using ~~Tessel 2 development board~~ Raspberry Pi, incorporating Socket.io, ImageMagic and Express.js; frontend built using Angular 2.4

## Installation

### Dependencies
Install [ImageMagick](https://www.imagemagick.org/script/download.php) and [PostgreSQL](https://www.postgresql.org/download/)

### Device
Initialize [Tessel 2 and T2-CLI](http://tessel.github.io/t2-start/). Run the device files with `t2 run device/main.js` or deploy file to device with `t2 push device/main.js`.

### Development
Run `yarn` or `npm install` to install dependencies. Run `yarnpkg knex migrate:latest` (or `npm run knex migrate:latest`) and `yarnpkg knex seed:run` (or `npm run knex seed:run`) to initialize database.

Start development server with `yarnpkg start` or `npm start`. `http://localhost:4200` proxies to backend running on `http://localhost:3000` by default.

## Features



## Technology

#### Frontend
* [Angular2](https://angular.io) with [TypeScript](https://www.typescriptlang.org/)
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
* Hardware: [Tessel 2](https://tessel.io/)
* Software: [Johnny-Five](http://johnny-five.io/)

## Further Development

##### TODO
* Improve styling
* Improve device stability
* Meta tags (service incorporated in Angular 4.0.0, consider migrating once dependencies catch up!)
* NativeScript