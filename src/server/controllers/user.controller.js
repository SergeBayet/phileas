import User from "../models/user.model";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export function user_create(req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user.save(err => {
    console.log(user);
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send("User created successfully");
  });
}

export function user_authenticate(req, res, next) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '1h' });
      res.json({ status: "success", message: "user found!!!", data: { user: user, token: token } });
    }
    else {
      res.json({ status: "error", message: "Invalid email/password!!!", data: null });
    }
  });
};

export function user_details(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
}

export function user_update(req, res, next) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) {
      return next(err);
    }
    res.send("User udpated.");
  });
}

export function user_delete(req, res, next) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      return next(err);
    }
    res.send("User deleted");
  });
}

