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
    .populate("user", { password: 0, refreshToken: 0 })
    .populate("review")
    .exec();

  if (comment === null) {
    return res.status(404).json({ message: "Comment not found" });
  }

  res.status(200).json(comment);
});

// Create Comment
exports.comment_post = [
  body("body").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation Error" });
    }

    const comment = new Comment({
      user: req.user._id,
      review: req.params.id,
      body: req.body.body,
      createdAt: Date.now(),
    });

    // Create comment
    await comment.save();
    res.sendStatus(200);
  }),
];

// Update Comment
exports.comment_put = [
  body("body").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    console.log(req.body.body);
    const errors = validationResult(req);

    // Check if comment exists
    const existingComment = await Comment.findById(req.params.commentId).exec();

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation Error" });
    }

    const comment = new Comment({
      user: req.user._id,
      review: req.params.reviewId,
      body: req.body.body,
      _id: req.params.commentId,
    });

    console.log(existingComment);
    console.log(comment);

    // Update comment
    await Comment.findByIdAndUpdate(req.params.commentId, comment, {});
    res.sendStatus(200);
  }),
];

// Delete Comment
exports.comment_delete = asyncHandler(async (req, res, next) => {
  // Check if comment exists
  const existingComment = await Comment.findById(req.params.commentId).exec();

  if (!existingComment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  // Delete comment
  await Comment.findByIdAndDelete(req.params.commentId).exec();
  res.sendStatus(200);
});
