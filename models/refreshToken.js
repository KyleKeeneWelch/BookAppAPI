const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, imumutable: true },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
