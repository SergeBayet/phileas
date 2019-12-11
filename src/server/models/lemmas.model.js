import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const LemmaSchema = new Schema({
  lang: { type: String, maxlength: 3, default: 'en' },
  written_forms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'WrittenForm'
    }
  ]
}, { collection: 'lemmas' });

LemmaSchema.statics.getLemma = function (idLemma) {
  return new Promise((resolve, reject) => {
    this.findOne({ _id: idLemma }, { written_forms: true }).populate("written_forms").exec((err, docs) => {
      if (err) {
        return reject(err)
      }
      docs = docs.written_forms.map(x => x.label).join('');
      resolve(docs)
    })
  })
}
export default model("Lemma", LemmaSchema);