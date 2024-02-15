const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.books_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.book_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.book_put = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.book_delete = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});
