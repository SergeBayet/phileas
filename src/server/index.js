import express from "express";
import path from "path";

require('dotenv').config();
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const user = require("./routes/user.route").default;
const resources = require("./routes/resource.route").default;
const { APP_PORT, SECRET_TOKEN_KEY, SECRET_REFRESH_KEY, MONGODB_URI } = process.env;
const app = express();
app.set('secretTokenKey', SECRET_TOKEN_KEY);
app.set('secretRefreshKey', SECRET_REFRESH_KEY);
app.set('refreshTokens', {});
// Connection to Mongo DB 

mongoose.connect(MONGODB_URI, {
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
app.use("/resources", resources);



// Listening to the port

app.listen(APP_PORT, () =>
  console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
