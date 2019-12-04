import { Schema as _Schema, model } from "mongoose";
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Schema = _Schema;

const UserSchema = new Schema({
  name: { type: String, trim: true, required: true, max: 255 },
  email: { type: String, trim: true, required: true, max: 255 },
  password: { type: String, trim: true, required: true },
  remember_token: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
  console.log('this : ', this);
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

export default model("User", UserSchema);
