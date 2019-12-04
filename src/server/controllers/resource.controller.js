const resourceModel = require('../models/resource.model');
module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    resourceModel.findById(req.params.resourceId, function (err, resourceInfo) {
      if (err) {
        next(err);
      } else {
        res.json({ status: "success", message: "Movie found!!!", data: { movies: movieInfo } });
      }
    });
  }, getAll: function (req, res, next) {
    let resourcesList = [];
    resourceModel.find({}, function (err, resources) {
      if (err) {
        next(err);
      } else {
        for (let resource of resources) {
          resourcesList.push(
            {
              id: resource._id,
              label: resource.label,
              description: resource.description
            });
        }
        res.json({ status: "success", message: "Resources list found!!!", data: { resources: resourcesList } });

      }
    });
  }, updateById: function (req, res, next) {
    resourceModel.findByIdAndUpdate(req.params.resourceId, { label: req.body.label }, function (err, resourceInfo) {
      if (err)
        next(err);
      else {
        res.json({ status: "success", message: "Resource updated successfully!!!", data: null });
      }
    });
  }, deleteById: function (req, res, next) {
    resourceModel.findByIdAndRemove(req.params.resourceId, function (err, resourceInfo) {
      if (err)
        next(err);
      else {
        res.json({ status: "success", message: "Resource deleted successfully!!!", data: null });
      }
    });
  }, create: function (req, res, next) {
    resourceModel.create({ label: req.body.label, description: req.body.description }, function (err, result) {
      if (err)
        next(err);
      else
        res.json({ status: "success", message: "Movie added successfully!!!", data: null });

    });
  },
}