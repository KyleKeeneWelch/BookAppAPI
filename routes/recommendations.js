const express = require("express");
const Recommendation = require("../models/recommendation");
const passport = require("passport");
const { checkIdFormat } = require("../helpers/middleware");
const recommendationController = require("../controllers/recommendationController");
const router = express.Router();

// Recommendation
router.get(
  "/users/:id/book-recommendation",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_get
);

router.post(
  "/users/:id/book-recommendation",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_post
);

router.post(
  "/users/:id/book-recommendation/view-book",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_book_view_post
);

router.post(
  "/users/:id/book-recommendation/rate-book",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_book_rate_post
);

router.post(
  "/users/:id/book-recommendation/like-book",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_book_like_post
);

router.post(
  "/users/:id/book-recommendation/unlike-book",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  recommendationController.recommendation_book_unlike_post
);

module.exports = router;
