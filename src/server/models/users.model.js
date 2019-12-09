import { Schema as _Schema, model } from "mongoose";
import * as EmailValidator from "email-validator";
const PasswordValidator = require("password-validator");
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Schema = _Schema;
const pv = new PasswordValidator();

pv.is().min(8)
  .is().max(64)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces();

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'name is required'],
    min: 6,
    max: 255
  },
  email: {
    type: String, trim: true,
    validate: {
      validator: email => EmailValidator.validate(email),
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'email is required'],
    unique: true,
    max: 255
  },
  password: {
    type: String,
    trim: true,
    validate: {
      validator: password => pv.validate(password),
      message: 'Invalid password'
    },
    required: [true, 'password is required'],
    minlength: 8,
    maxlength: 64
  },
  admin: {
    type: Boolean,
    default: false
  },
  remember_token: {
    type: String,
    default: null
  }

}, { timestamps: true });

UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

export default model("User", UserSchema);
