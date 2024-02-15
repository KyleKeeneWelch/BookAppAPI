const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  review: { type: Schema.Types.ObjectId, ref: "Review", required: true },
  body: { type: String, required: true, maxLength: 2000 },
  createdAt: { type: Date, imumutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

commentSchema.virtual("url").get(function () {
  return `/reviews/${this.review._id}/comments/${this._id}`;
});

module.exports = mongoose.model("Comment", commentSchema);
