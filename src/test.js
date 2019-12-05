import express from "express";
import path from "path";
import assert from "assert";
const mongo = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const { APP_PORT } = process.env;
const url = "mongodb://dev:dev@mongo:27017";
const app = express();
let db;
mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    assert.equal(null, err);
    console.log('connected to mongo');
    db = client.db('phileas');
    const collection = db.collection('users');
    /* collection.find({}).toArray((err, items) => {
      console.log(items);
    }); */
    collection.findOne({ name: 'Serge Bayet' })
      .then(items => {
        console.log(items);
      })
      .catch(error => {
        console.log(error);
      });
  },
);

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/hello", (req, res) => {
  console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
  console.log(db);
  res.send("Hello, World!");
});

app.listen(APP_PORT, () =>
  console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
