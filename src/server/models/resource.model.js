import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const ResourceSchema = new Schema({
  label: { type: String, trim: true, required: true, max: 255 },
  resource: { type: String, trim: true, required: true },
  description: { type: String },
  estimated_time: { type: Number },
  repetitions: {
    mode: { type: String },
    times: { type: Number },
    cron: { type: String },
    human_readable: { type: String },
  },
  type: { type: String },
  private: { type: Boolean },
  id_user: { type: Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now }
});


export default model("Resource", ResourceSchema);
