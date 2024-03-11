const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  title: { type: String, maxLength: 100, required: true },
  body: { type: String, required: true, maxLength: 5000 },
  rating: { type: Number, required: true, maxLength: 10 },
  createdAt: { type: Date, imumutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

reviewSchema.virtual("url").get(function () {
  return `/reviews/${this._id}`;
});

module.exports = mongoose.model("Review", reviewSchema);
