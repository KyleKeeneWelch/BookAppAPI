const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.users_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.user_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.user_put = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.user_delete = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});
