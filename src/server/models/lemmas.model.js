import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const LemmaSchema = new Schema({
  lang: { type: String, maxlength: 3, default: 'en' },
  written_forms: [{ type: Schema.Types.ObjectId, ref: 'WrittenForm' }]
}, { collection: 'lemmas' });

export default model("Lemma", LemmaSchema);