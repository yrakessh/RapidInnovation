# RapidInnovation - Setup

## Clone

Clone the repo by using command git clone. see example below.

`$ git clone  https://github.com/yrakessh/RapidInnovation.git`

## Install

Please follow the below command to install all the required dependancy
```
$ cd RapidInnovation
$ npm install
$ npm install -g  nodemon // for local environment
```

## Configurations

Please find the sample envconfig config/default.json

Update the environment specific values in the config/default.json file
```
{
    "mongoURI": "<yourmongodburi>",
    "jwtSecret": "<yoursecretkey>"
}
```
For the testing purpose, mongoURI will be added in the config as it has sample data

## Run

Please the the below command to start the server

```
Start service using npm
$ cd RapidInnovation         // Locate to service directory
$ npm run server             // Start server without nodemon 
$ npm run dev                // Start server with nodemon
```
