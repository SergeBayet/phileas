// User Validation using json web token
const jwt = require('jsonwebtoken');
module.exports = {
  validateUser: function (req, res, next) {

    jwt.verify(req.headers['x-access-token'], req.app.get('secretTokenKey'), function (err, decoded) {
      next();
      /* if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      } */
    })
  }
}