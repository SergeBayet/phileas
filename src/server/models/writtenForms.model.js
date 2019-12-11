import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const WrittenFormSchema = new Schema({
  label: { type: String, required: true, max: 128, unique: true }
}, { collection: 'written_forms' });

export default model("WrittenForm", WrittenFormSchema);