const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Unlike = require("../models/unlike");
const User = require("../models/user");
const Book = require("../models/book");

// Get Like
exports.unlikes_get = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const book = await Book.findById(req.params.id).exec();

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const unlike = await Unlike.findOne({
    user: user._id,
    book: book._id,
  }).exec();

  if (!unlike) {
    return res.status(200).json({ message: "Not Found" });
  }

  res.status(200).json(unlike);
});

// Create Like
exports.unlikes_post = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const book = await Book.findById(req.params.id).exec();

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const unlike = new Unlike({
    user: user._id,
    book: book._id,
    createdAt: Date.now(),
  });

  await unlike.save();

  res.sendStatus(200);
});

// Delete Like
exports.unlikes_delete = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const book = await Book.findById(req.params.id).exec();

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const unlike = await Unlike.findOne({
    user: user._id,
    book: book._id,
  }).exec();

  if (!unlike) {
    return res.status(404).json({ message: "Unlike not found" });
  }

  await Unlike.findByIdAndDelete(unlike._id);

  res.sendStatus(200);
});
