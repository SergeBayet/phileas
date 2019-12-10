import Category from "../models/categories.model";

export function test(req, res, next) {
  let idCategory = req.query.id;
  Category.getChildren(idCategory)
    .then(children => {
      res.json({ status: "success", message: "Children categories found", data: { categories: children } });
      return;
    })
    .catch(err => {
      res.json({ status: "error", message: err, data: null });
    });
}
export function getById(req, res, next) {

  Category.findById(req.query.id, function (err, resource) {
    if (err) {
      next(err);
    } else {
      res.json({ status: "success", message: "Category found!", data: { category: category } });
    }
  });
}
export function getAll(req, res, next) {

  Category.find({}, function (err, resources) {
    if (err) {
      next(err);
    } else {

      res.json({ status: "success", message: "Category list found", data: { category: category } });

    }
  });
}

export function create(req, res, next) {
  console.log(req.body);
  const category = new Category({
    label: req.body.label,
    image: req.body.image,
    hidden: req.body.hidden,
    parents: JSON.parse(req.body.parents)
  });
  category.save(err => {
    if (err)
      next(err);
    else
      res.json({ status: "success", message: "Category added", data: category });
  });
}
