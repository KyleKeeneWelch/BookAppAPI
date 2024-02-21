const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recommendationId: { type: String, required: true, maxLength: 100 },
  viewRecommendations: { type: Array, maxLength: 100 },
  likeRecommendations: { type: Array, maxLength: 100 },
  ratingRecommendations: { type: Array, maxLength: 100 },
  revision: { type: Number, required: true },
  createdAt: { type: Date, imumutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
