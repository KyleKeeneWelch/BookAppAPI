const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Review = require("../models/review");
const Book = require("../models/book");
const Comment = require("../models/comment");

// Get Reviews
exports.reviews_get = (req, res, next) => {
  res.json(res.paginatedResults);
};

// Get Review
exports.review_get = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate("user", { password: 0, refreshToken: 0 })
    .populate("book")
    .exec();

  if (review === null) {
    return res.status(404).json({ message: "Review not found" });
  }

  res.json(review);
});

// Create Review
exports.review_post = [
  body("book", "Book is required").trim().isLength({ min: 1 }).escape(),
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("body", "Body is required").trim().isLength({ min: 1 }).escape(),
  body("rating", "Rating is required").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation Error" });
    }

    const existingBook = await Book.findOne({
      title: { $regex: req.body.book, $options: "i" },
    }).exec();

    if (!existingBook) {
      return res.status(404).json({ message: "Book does not exist" });
    }

    const review = new Review({
      user: req.user._id,
      book: existingBook._id,
      title: req.body.title,
      body: req.body.body,
      rating: req.body.rating,
      createdAt: Date.now(),
    });

    // Create review
    await review.save();
    res.status(200).json({ id: review._id });
  }),
];

// Update Review
exports.review_put = [
  body("book", "Book is required").trim().isLength({ min: 1 }).escape(),
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("body", "Body is required").trim().isLength({ min: 1 }).escape(),
  body("rating", "Rating is required").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    // Check review exists
    const existingReview = await Review.findById(req.params.id).exec();

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation Error" });
    }

    const review = new Review({
      user: req.user._id,
      book: req.body.book,
      title: req.body.title,
      body: req.body.body,
      rating: req.body.rating,
      _id: req.params.id,
    });

    // Update review
    await Review.findByIdAndUpdate(req.params.id, review, {});
    res.sendStatus(200);
  }),
];

// Delete Review
exports.review_delete = asyncHandler(async (req, res, next) => {
  // Check if review exists
  const existingReview = await Review.findById(req.params.id).exec();

  if (!existingReview) {
    return res.status(404).json({ message: "Review not found" });
  }

  // Delete comments
  await Comment.deleteMany({ review: req.params.id }).exec();

  // Delete review
  await Review.findByIdAndDelete(req.params.id).exec();
  res.sendStatus(200);
});
