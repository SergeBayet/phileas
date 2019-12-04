import express from "express";
import path from "path";
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const user = require("./routes/user.route").default;
const resources = require("./routes/resource.route").default;
const jwt = require('jsonwebtoken');

const { APP_PORT } = process.env;
const url = "mongodb://dev:dev@mongo:27017";
const app = express();
app.set('secretKey', 'AroundTheWorldInEightyDays');

// Connection to Mongo DB

const mongoDB = process.env.MONGODB_URI || url;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "phileas",
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger('dev'));

// body-parser init

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Client side of application

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

// Api routes towards controllers

app.use("/user", user);
app.use("/resources", validateUser, resources);

// User Validation using json web token

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

// Listening to the port

app.listen(APP_PORT, () =>
  console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
