import User from "../models/users.model";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export async function create(req, res, next) {

  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }, function (err) {
    if (err) {

      res.json({ status: "error", message: err, data: null });
      return;
    }
    res.json({ status: "success", message: "User created", data: null });
  });
}
export function tokenReject(req, res, next) {

  const refreshToken = req.body.refreshToken;
  let refreshTokens = req.app.get('refreshTokens');
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
    res.json({ status: "success", message: "token rejected" })
    return;
  }
  res.json({ status: "error", message: "token doesn't exist" })

}
export function token(req, res, next) {

  const userId = req.body.userId;
  const refreshToken = req.body.refreshToken;
  let refreshTokens = req.app.get('refreshTokens');
  if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == userId)) {

    const token = jwt.sign({ id: userId }, req.app.get('secretTokenKey'), { expiresIn: 300 })
    const refresh = jwt.sign({ id: userId }, req.app.get('secretRefreshKey'), { expiresIn: 88600 });

    refreshTokens[refresh] = userId;
    req.app.set('refreshTokens', refresh);
    res.json({ status: "success", message: "token refreshed", data: { token: token, refresh: refresh } });
  }
  else {
    res.send(401).json({ status: "error", message: "token undefined", data: null });
  }
}
export function login(req, res, next) {
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

      res.json({ status: "success", message: "user found", data: { user: user, token: token, refresh: refresh } });

    }
    else {
      res.json({ status: "error", message: "Invalid email/password", data: null });
    }
  });
};

export function getById(req, res, next) {
  console.log(req.query);
  if (req.query.id !== undefined) {
    User.findById(req.query.id, 'name email admin', (err, user) => {
      if (err) {
        res.json({ status: "error", message: "User id doesn't exist", data: null });
        return;
      }
      res.json({ status: "success", message: "User retrieved", data: user });
    });
  }
  else if (req.query.query !== undefined) {
    User.find({ name: new RegExp(req.query.query, "i") }, 'name email admin', (err, users) => {
      if (err) {
        res.json({ status: "error", message: "No results", data: null });
        return;
      }
      res.json({ status: "success", message: "Users list retrieved", count: users.length, data: users });
    })
  }

}

export function updateById(req, res, next) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) {
      res.json({ status: "error", message: "User id doesn't exist", data: null });
      return;
    }
    res.json({ status: "success", message: "User updated", data: user });
  });
}

export function deleteById(req, res, next) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      res.json({ status: "error", message: "User id doesn't exist", data: null });
      return;
    }
    res.json({ status: "success", message: "User deleted", data: user });
  });
}

