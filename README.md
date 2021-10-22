# RapidInnovation

Clone Git
git clone

# Setup

* Clone

Clone the repo by using command git clone. see example below.
$ git clone  https://github.com/yrakessh/RapidInnovation.git

* Install

Please follow the below command to install all the required dependancy
$ cd smart-search
$ npm install
$ npm install -g  nodemon // for local environment

* Configurations

Required directory need to present to run the service the directories are secrets and logs please find the commands below to create directory and configure envvconfig
$ sudo mkdir /secrets                        // This directory contain envconfig file
$ sudo mkdir /logs                           // This directory contain service logs 
$ sudo vi /secrets/search-service/searchEnvConfig.js  // Here you need to put environment config

Please find the sample envconfig searchEnvConfig.js

Update the environment specific values in the searchEnvConfig.js file


* Run

Please the the below command to start the service

* On local environment

Start service using npm
$ cd smart-search         // Locate to service directory
$ npm start               // Start service 
$ npm run start:watch     // Start service and watch filechanges
$ npm run start-build     // Start service from the build file

Start service using PM2
$ npm run pm2-start

Build and start using pm2 module
$ npm run build && npm run pm2-start-build





