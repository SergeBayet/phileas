const user = require("./users.route").default;
const resources = require("./resources.route").default;
const express = require("express");
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time : ' + Date.now());
  next();
});

router.use("/users", user);
router.use("/resources", resources);

module.exports = router;