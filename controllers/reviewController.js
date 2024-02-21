const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Review = require("../models/review");
const Comment = require("../models/comment");

// Get Reviews
exports.reviews_get = (req, res, next) => {
  res.json(res.paginatedResults);
};

// Get Review
exports.review_get = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate("user", { password: 0 })
    .populate("book")
    .exec();

  if (review === null) {
    const err = new Error(errors.Array());
    err.status = 403;
    next(err);
    return;
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

    const review = new Review({
      user: req.user.id,
      book: req.body.book,
      title: req.body.title,
      body: req.body.body,
      rating: req.body.rating,
      createdAt: Date.now(),
    });

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    } else {
      await review.save();
      res.sendStatus(200);
    }
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

    const existingReview = await Review.findById(req.params.id).exec();

    if (!existingReview) {
      const err = new Error("Review not found");
      err.status = 404;
      next(err);
      return;
    }

    const review = new Review({
      user: req.user.id,
      book: req.body.book,
      title: req.body.title,
      body: req.body.body,
      rating: req.body.rating,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    } else {
      await Review.findByIdAndUpdate(req.params.id, review, {});
      res.sendStatus(200);
    }
  }),
];

// Delete Review
exports.review_delete = asyncHandler(async (req, res, next) => {
  const existingReview = await Review.findById(req.params.id).exec();

  if (!existingReview) {
    const err = new Error("Review not found");
    err.status = 404;
    next(err);
    return;
  }

  await Comment.deleteMany({ review: req.params.id }).exec();

  await Review.findByIdAndDelete(req.params.id).exec();
  res.sendStatus(200);
});
