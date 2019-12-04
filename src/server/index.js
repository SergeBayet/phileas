import express from "express";
import path from "path";
import assert from "assert";
const mongo = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const user = require('./routes/user.route');
const { APP_PORT } = process.env;
const url = "mongodb://dev:dev@mongo:27017";
const app = express();

let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'phileas' });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../../bin/client")));
app.use('/user', user);






app.listen(APP_PORT, () =>
  console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
