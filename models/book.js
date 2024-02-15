const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: { type: Number, required: true, maxLength: 13 },
  title: { type: String, required: true, maxLength: 200 },
  subTitle: { type: String, maxLength: 200 },
  authors: { type: Array, required: true },
  categories: { type: Array, required: true },
  thumbnail: { type: String, required: true, maxLength: 200 },
  description: { type: String, required: true, maxLength: 500 },
  publishedYear: { type: Number, required: true, maxLength: 4 },
  averageRating: { type: Number, required: true, maxLength: 5 },
  numPages: { type: Number, required: true, maxLength: 10 },
});

bookSchema.virtual("url").get(function () {
  return `/books/${this._id}`;
});

module.exports = mongoose.model("Book", bookSchema);
