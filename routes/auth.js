var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController");

// Login
router.post("/login", authController.login_post);

// Signup
router.post("/signup", authController.signup_post);

// Get new Token
router.get("/refresh", authController.refresh_token_get);

//Logout
router.delete("/logout", authController.logout_delete);

module.exports = router;
