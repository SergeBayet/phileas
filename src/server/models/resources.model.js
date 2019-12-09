import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const ResourceSchema = new Schema({
  label: { type: String, trim: true, required: true, max: 255 },
  resource: { type: String, trim: true },
  description: { type: String },
  estimated_time: { type: Number },
  type_resource: { type: String },
  private: { type: Boolean },
  id_user: { type: Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
}, { collection: 'resources' });

export default model("Resource", ResourceSchema);
