const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const unlikeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  createdAt: { type: Date, imumutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Unlike", unlikeSchema);
