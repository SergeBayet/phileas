const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: { type: String, required: true, max: 255 },
  email: { type: String, required: true, max: 255 },
  password: { type: String },
  remember_token: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model('User', UserSchema);