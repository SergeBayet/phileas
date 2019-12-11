import Category from "../models/categories.model";
import WrittenForm from "../models/writtenForms.model";
import Lemmas from "../models/lemmas.model";
let fs = require('fs');
let path = require('path');



export function tokenize(file) {
  file = 'categories.txt';
  let tokens = fs.readFileSync(path.resolve(__dirname, '../_data/' + file), 'utf8');
  let wf = [...new Set(tokens.toLowerCase().split(/(\W)/g))].map(x => { return { label: x } });
  WrittenForm.collection.insert(wf, function (err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  });
}
export function getLemma(req, res, next) {
  Lemmas.getLemma(req.query.id).then(doc => {
    res.json(doc);
  }).catch(err => {
    res.json('error');
  });
}
export async function importCategories(req, res, next) {
  console.log('ici');
  let categories = fs.readFileSync(path.resolve(__dirname, '../_data/categories.txt'), 'utf8');
  let lemmas = categories.toLowerCase().split(/\n|\//).map(x => x.trim().split(/(\W)/g));

  const getWf = async function (syntagm) {
    let ids = [];
    for (let j = 0; j < syntagm.length; j++) {
      console.log(`-${syntagm[j]}-`)
      await WrittenForm.findOne({ label: { $eq: `${syntagm[j]}` } }, function (err, doc) {
        console.log('-' + syntagm[j] + '- --> -' + doc.label + '-');
        ids.push(doc._id);
      });
    }
    return ids;
  }

  for (let i = 0; i < lemmas.length; i++) {
    let ids = await getWf(lemmas[i]);
    await Lemmas.create({ lang: 'en', written_forms: ids }, function (err, doc) {

    });
  }
  res.json('ok');

}

export function test(req, res, next) {

  let idCategory = req.query.id;
  Category.getParents(idCategory)
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
