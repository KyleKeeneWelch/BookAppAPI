const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

// Get Comments
exports.comments_get = (req, res, next) => {
  res.json(res.paginatedResults);
};

// Get Comment
exports.comment_get = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId)
    .populate("user")
    .populate("review")
    .exec();

  if (comment === null) {
    const err = new Error(errors.Array());
    err.status = 403;
    next(err);
    return;
  }

  res.json(comment);
});

// Create Comment
exports.comment_post = [
  body("body").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      user: req.user.id,
      review: req.params.id,
      body: req.body.body,
      createdAt: Date.now(),
    });

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    } else {
      await comment.save();
      res.sendStatus(200);
    }
  }),
];

// Update Comment
exports.comment_put = [
  body("body").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const existingComment = await Comment.findById(req.params.commentId).exec();

    if (!existingComment) {
      const err = new Error("Comment not found");
      err.status = 404;
      next(err);
      return;
    }

    const comment = new Comment({
      user: req.user.id,
      review: req.params.reviewId,
      body: req.body.body,
      _id: req.params.commentId,
    });

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    } else {
      await Comment.findByIdAndUpdate(req.params.commentId, comment, {});
      res.sendStatus(200);
    }
  }),
];

// Delete Comment
exports.comment_delete = asyncHandler(async (req, res, next) => {
  const existingComment = await Comment.findById(req.params.commentId).exec();

  if (!existingComment) {
    const err = new Error("Comment not found");
    err.status = 404;
    next(err);
    return;
  }

  await Comment.findByIdAndDelete(req.params.commentId).exec();
  res.sendStatus(200);
});
