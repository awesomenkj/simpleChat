## Simple Chat React App

## About the project
A simple chat based on Socket.IO using Node Express and Mongoose.

## Running the front-end

`yarn` or `npm install`

## Start <br />

`yarn start` or `npm start`

## Build <br />

`yarn build` or `npm build`

### Changing Developement Port

This app use the webpack-dev-server which by default use port 5000
You can change the default port by adding to the package.json start script --port flag followed by the port you want to use. for example --port 3000

## Running the back-end
```
npm install
npm start
```
To connect with your Mongo's database in developement mode, you need to change ```src/db/config.js``` file. E.g.:
```
export default {
  "mongo": {
    "host" : "localhost",
    "port" : "27017",
    "db" : "simpleChat"
  }
}
```
