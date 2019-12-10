import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const CategorySchema = new Schema({
  label: { type: String, trim: true, required: true, max: 255 },
  image: { type: String, trim: true, default: null },
  hidden: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  parents: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
}, { collection: 'categories' });

// Static method to retrieve children of a category

CategorySchema.statics.getChildren = function (idCategory) {
  return new Promise((resolve, reject) => {
    this.find({ parents: idCategory }, (err, docs) => {
      if (err) {
        return reject(err)
      }
      resolve(docs)
    })
  })
}

CategorySchema.statics.getParents = function (idCategory) {
  return new Promise((resolve, reject) => {
    this.find({ _id: idCategory }, { parents: true }).populate('parents').exec((err, docs) => {
      if (err) {
        return reject(err)
      }
      resolve(docs)
    })
  })
}

export default model("Category", CategorySchema);