const express = require("express");
const { checkIdFormat, verifyJWT } = require("../helpers/middleware");
const recommendationController = require("../controllers/recommendationController");
const router = express.Router();

// Forward to Write Model or get current recommendation state

// Get Recommendation
router.get(
  "/users/:id/book-recommendation",
  checkIdFormat(),
  verifyJWT(),
  recommendationController.recommendation_get
);

// Create Recommendation
router.post(
  "/users/:id/book-recommendation",
  checkIdFormat(),
  verifyJWT(),
  recommendationController.recommendation_post
);

// Add View Book
router.post(
  "/users/:id/book-recommendation/view-book",
  checkIdFormat(),
  verifyJWT(),
  recommendationController.recommendation_book_view_post
);

// Add Rate Book
router.post(
  "/users/:id/book-recommendation/rate-book",
  checkIdFormat(),
  verifyJWT(),
  recommendationController.recommendation_book_rate_post
);

// Add Like Book
router.post(
  "/users/:id/book-recommendation/like-book",
  checkIdFormat(),
  verifyJWT(),
  recommendationController.recommendation_book_like_post
);

// Unlike Book
router.post(
  "/users/:id/book-recommendation/unlike-book",
  checkIdFormat(),
  verifyJWT(),
  recommendationController.recommendation_book_unlike_post
);

// Obtain books from recommendation

// Get recommended books based on views
router.get(
  "/users/:id/book-recommendation/views",
  checkIdFormat(),
  verifyJWT(),
  recommendationController.recommendation_views_get
);

// Get recommended books based on likes
router.get(
  "/users/:id/book-recommendation/likes",
  checkIdFormat(),
  verifyJWT(),
  recommendationController.recommendation_likes_get
);

// Get recommended books based on ratings
router.get(
  "/users/:id/book-recommendation/ratings",
  checkIdFormat(),
  verifyJWT(),
  recommendationController.recommendation_ratings_get
);

module.exports = router;
