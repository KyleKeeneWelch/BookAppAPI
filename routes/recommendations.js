const express = require("express");
const passport = require("passport");
const { checkIdFormat } = require("../helpers/middleware");
const recommendationController = require("../controllers/recommendationController");
const router = express.Router();

// Get Recommendation
router.get(
  "/users/:id/book-recommendation",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_get
);

// Create Recommendation
router.post(
  "/users/:id/book-recommendation",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_post
);

// Add View Book
router.post(
  "/users/:id/book-recommendation/view-book",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_book_view_post
);

// Add Rate Book
router.post(
  "/users/:id/book-recommendation/rate-book",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_book_rate_post
);

// Add Like Book
router.post(
  "/users/:id/book-recommendation/like-book",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_book_like_post
);

// Unlike Book
router.post(
  "/users/:id/book-recommendation/unlike-book",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_book_unlike_post
);

module.exports = router;
