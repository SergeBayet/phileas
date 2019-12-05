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
export function user_token(req, res, next) {
  const userId = req.body.userId;
  const refreshToken = req.body.refreshToken;
  let refreshTokens = req.app.get('refreshTokens');
  console.log(refreshTokens);
  if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == userId)) {

    const token = jwt.sign({ id: userId }, req.app.get('secretTokenKey'), { expiresIn: 300 })
    const refresh = jwt.sign({ id: userId }, req.app.get('secretRefreshKey'), { expiresIn: 88600 });

    refreshTokens[refresh] = userId;
    req.app.set('refreshTokens', refresh);
    console.log(req.app.get('refreshTokens'));
    res.json({ status: "success", message: "token refreshed", data: { token: token, refresh: refresh } });
  }
  else {
    res.send(401)
  }
}
export function user_authenticate(req, res, next) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ id: user._id }, req.app.get('secretTokenKey'), { expiresIn: 300 });
      const refresh = jwt.sign({ id: user._id }, req.app.get('secretRefreshKey'), { expiresIn: 88600 });
      let refreshs = req.app.get('refreshTokens');
      refreshs[refresh] = user._id;
      req.app.set('refreshTokens', refreshs);
      console.log(req.app.get('refreshTokens'));
      res.json({ status: "success", message: "user found", data: { user: user, token: token, refresh: refresh } });

    }
    else {
      res.json({ status: "error", message: "Invalid email/password", data: null });
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

