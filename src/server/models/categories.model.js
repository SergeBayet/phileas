import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const CategorySchema = new Schema({
  label: { type: String, trim: true, required: true, max: 255 },
  image: { type: String, trim: true },
  relations: [{
    label: { type: String, enum: ['subclassOf', 'superclassOf', 'partOf', 'has', 'memberOf', 'hasForAMember'] },
    id_category: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  }]
}, { collection: 'categories' });

export default model("Category", CategorySchema);