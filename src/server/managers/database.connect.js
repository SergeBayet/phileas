require('dotenv').config();
const mongoose = require("mongoose");

// Connection to Mongo DB 

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "phileas",
    })
      .then(() => {
        console.log("Connection to database successful");
      })
      .catch(err => {
        console.log("Database connection error");
      })
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  }
}

module.exports = new Database();

