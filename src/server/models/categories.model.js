import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const CategorySchema = new Schema({
  label: { type: String, trim: true, required: true, max: 255 },
  image: { type: String, trim: true, default: null },
  hidden: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  parents: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
}, { collection: 'categories' });

export default model("Category", CategorySchema);