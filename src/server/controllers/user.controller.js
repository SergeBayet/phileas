const User = require('../models/user.model');

exports.user_create = function (req, res) {
  let user = new User({
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
    res.send('User created successfully');
  });
};

exports.user_details = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.send(user);
  });
};

exports.user_update = function (req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
    if (err) return next(err);
    res.send('User udpated.');
  });
}

exports.user_delete = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    console.log(err);
    if (err) return next(err);
    res.send('User deleted');
  });
}

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send('Greetings from the Test controller!');
};