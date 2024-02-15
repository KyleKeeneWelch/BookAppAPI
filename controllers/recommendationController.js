const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.recommendation_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.recommendation_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.recommendation_book_view_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.recommendation_book_rate_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.recommendation_book_like_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.recommendation_book_unlike_post = asyncHandler(
  async (req, res, next) => {
    res.send("NOT IMPLEMENTED");
  }
);
