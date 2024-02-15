const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.reviews_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.review_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.review_put = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.review_delete = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});
