const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Get Users
exports.users_get = (req, res, next) => {
  res.json(res.paginatedResults);
};

// Get User
exports.user_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select({ password: 0 })
    .exec();

  if (user === null) {
    const err = new Error("No User Found");
    err.status = 404;
    return next(err);
  }

  res.json(user);
});

// Update User
exports.user_put = [
  body("first_name", "First Name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last Name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username is required").trim().isLength({ min: 1 }).escape(),
  body("email", "Email is required")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage("Invalid email format")
    .escape(),
  body("password", "Password is required with a minimum of 8 characters")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirm_password", "Confirm Password is required")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Confirm Password needs to match Password"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const existingUser = User.findById(req.params.id).exec();

    if (!existingUser) {
      const err = new Error("User not found");
      err.status = 404;
      next(err);
      return;
    }

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    } else {
      await User.findByIdAndUpdate(req.params.id, user, {});
      res.sendStatus(200);
    }
  }),
];

// Delete User
exports.user_delete = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();

  if (user === null) {
    const err = new Error("User Not Found");
    err.status = 404;
    return next(err);
  }

  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});
