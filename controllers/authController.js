const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

// Login User
exports.login_post = [
  body("email", "Email is required")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage("Invalid email format")
    .escape(),
  body("password", "Password is required").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation Error" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).exec();
    if (!user) return res.sendStatus(401);

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const userInfo = {
        UserInfo: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
        },
      };

      const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
      });
      const refreshToken = jwt.sign(
        userInfo,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Saving refreshToken with current user
      user.refreshToken = refreshToken;
      await user.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        // sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send access token to user
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  }),
];

// Create User
exports.signup_post = [
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
  body("password", "Password is required").trim().isLength({ min: 1 }).escape(),
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

    // Check for exisitng user email
    const duplicate = await User.findOne({ email: req.body.email }).exec();

    if (duplicate) return res.sendStatus(409); // Conflict

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation Error" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      createdAt: Date.now(),
    });

    // Save to db
    await user.save();
    res.status(200).json({ id: user._id });
  }),
];

// Get Token from Refresh
exports.refresh_token_get = asyncHandler(async (req, res, next) => {
  // Get jwt from secure cookie
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();

  if (!user) return res.sendStatus(403);

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.email !== decoded.UserInfo.email)
      return res.sendStatus(403);
    const userInfo = {
      UserInfo: {
        _id: decoded.UserInfo._id,
        first_name: decoded.UserInfo.first_name,
        last_name: decoded.UserInfo.last_name,
        username: decoded.UserInfo.username,
        email: decoded.UserInfo.email,
      },
    };

    // Create new access token
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    // Send as response
    res.json({ email: user.email, accessToken });
  });
});

// Logout User
exports.logout_delete = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Find user with refresh
  const user = await User.findOne({ refreshToken }).exec();

  if (!user) {
    // Clear jwt cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      // sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  // Clear refresh and cookie
  user.refreshToken = "";
  await user.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    // sameSite: "None",
    secure: true,
  });
  return res.sendStatus(204);
});
