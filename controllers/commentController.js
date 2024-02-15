const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.comments_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.comment_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.comment_put = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.comment_delete = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});
