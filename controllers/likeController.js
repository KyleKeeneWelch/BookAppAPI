const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Like = require("../models/like");
const User = require("../models/user");
const Book = require("../models/book");

// Get Like
exports.likes_get = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const book = await Book.findById(req.params.id).exec();

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const like = await Like.findOne({
    user: user._id,
    book: book._id,
  }).exec();

  if (!like) {
    return res.status(200).json({ message: "Not Found" });
  }

  res.status(200).json(like);
});

// Create Like
exports.likes_post = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const book = await Book.findById(req.params.id).exec();

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const like = new Like({
    user: user._id,
    book: book._id,
    createdAt: Date.now(),
  });

  await like.save();

  res.sendStatus(200);
});

// Delete Like
exports.likes_delete = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const book = await Book.findById(req.params.id).exec();

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const like = await Like.findOne({ user: user._id, book: book._id }).exec();

  if (!like) {
    return res.status(404).json({ message: "Like not found" });
  }

  await Like.findByIdAndDelete(like._id);

  res.sendStatus(200);
});
