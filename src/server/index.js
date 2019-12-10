import express from "express";
import path from "path";
import db from "./managers/database.connect";
require('dotenv').config();
const logger = require('morgan');
const bodyParser = require("body-parser");
const routes = require("./routes/root.route");

const { APP_PORT, SECRET_TOKEN_KEY, SECRET_REFRESH_KEY } = process.env;
const app = express();

app.set('secretTokenKey', SECRET_TOKEN_KEY);
app.set('secretRefreshKey', SECRET_REFRESH_KEY);
app.set('refreshTokens', []);

// Middlewares

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../../bin/client")));

// Api routes towards controllers

app.use("/", routes);

// Listening to the port

app.listen(APP_PORT, () =>
  console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
