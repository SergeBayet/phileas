import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const WrittenFormSchema = new Schema({
  label: { type: String, required: true, max: 128, unique: true }
}, { collection: 'written_forms' });

WrittenFormSchema.statics.updateById = function (idWrittenForm, label, callback) {
  return this.findOneAndUpdate({ _id: idWrittenForm }, { label: label.toLowerCase().trim() }, callback);
}
WrittenFormSchema.statics.getById = function (idWrittenForm, callback) {
  return this.findById(idWrittenForm).exec(callback);
}
WrittenFormSchema.statics.getByLabel = function (query, wholeWord = false, callback) {

  let newQuery = [...new Set(query.toLowerCase().split(/\W/g))];

  if (wholeWord == 'true') {
    newQuery = newQuery.map(x => '^' + x + '$').join("|");
  }
  else {
    newQuery = newQuery.join("|");
  }
  return this.find({ label: new RegExp(newQuery, "i") }).exec(callback);
}
WrittenFormSchema.statics.saveToken = function (token, callback) {
  return this.create({ label: token.toLowerCase().trim() }, callback);
}
WrittenFormSchema.statics.saveTokens = function (text, callback) {

  let tokens = [...new Set(text
    .toLowerCase()
    .split(/(\W)/g))
  ]
    .filter(x => x !== '')
    .map(x => { return { label: x } });
  console.log(tokens);
  this.insertMany(tokens, { ordered: false }, callback);

}

export default model("WrittenForm", WrittenFormSchema);