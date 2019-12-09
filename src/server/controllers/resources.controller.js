import Resource from "../models/resources.model";

export function getById(req, res, next) {

  Resource.findById(req.params.resourceId, function (err, resource) {
    if (err) {
      next(err);
    } else {
      res.json({ status: "success", message: "Resource found!", data: { resource: resource } });
    }
  });
}
export function getAll(req, res, next) {

  Resource.find({}, function (err, resources) {
    if (err) {
      next(err);
    } else {

      res.json({ status: "success", message: "Resources list found", data: { resources: resources } });

    }
  });
}
export function updateById(req, res, next) {
  Resource.findByIdAndUpdate(req.params.resourceId, { label: req.body.label }, function (err, resource) {
    if (err)
      next(err);
    else {
      res.json({ status: "success", message: "Resource updated", data: resource });
    }
  });
}
export function deleteById(req, res, next) {
  Resource.findByIdAndRemove(req.params.resourceId, function (err, resource) {
    if (err)
      next(err);
    else {
      res.json({ status: "success", message: "Resource deleted", data: resource });
    }
  });
}
export function create(req, res, next) {
  console.log(Resource);
  const resource = new Resource({
    label: req.body.label,
    resource: req.body.resource,
    description: req.body.description,
    estimated_time: req.body.estimated_time,
    type_resource: req.body.type_resource,
    private: req.body.private,
    id_user: req.body.id_user,
  });
  resource.save(err => {
    if (err)
      next(err);
    else
      res.json({ status: "success", message: "Resource added", data: null });

  });
}
