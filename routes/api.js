const express = require("express");
const {
  paginatedResults,
  checkIdFormat,
  verifyJWT,
} = require("../helpers/middleware");
const User = require("../models/user");
const Book = require("../models/book");
const Comment = require("../models/comment");
const Review = require("../models/review");
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const commentController = require("../controllers/commentController");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

// User

router.get("/users", paginatedResults(User), userController.users_get);

router.get("/users/:id", checkIdFormat(), userController.user_get);

router.put("/users/:id", checkIdFormat(), verifyJWT(), userController.user_put);

router.delete(
  "/users/:id",
  checkIdFormat(),
  verifyJWT(),
  userController.user_delete
);

// Book

router.get("/books", paginatedResults(Book), bookController.books_get);

router.get("/books/:id", checkIdFormat(), bookController.book_get);

router.post("/books", verifyJWT(), bookController.book_post);

router.put("/books/:id", checkIdFormat(), verifyJWT(), bookController.book_put);

router.delete(
  "/books/:id",
  checkIdFormat(),
  verifyJWT(),
  bookController.book_delete
);

// Review
router.get("/reviews", paginatedResults(Review), reviewController.reviews_get);

router.get("/reviews/:id", checkIdFormat(), reviewController.review_get);

router.post("/reviews", verifyJWT(), reviewController.review_post);

router.put(
  "/reviews/:id",
  checkIdFormat(),
  verifyJWT(),
  reviewController.review_put
);

router.delete(
  "/reviews/:id",
  checkIdFormat(),
  verifyJWT(),
  reviewController.review_delete
);

// Comment
router.get(
  "/reviews/:id/comments",
  checkIdFormat(),
  paginatedResults(Comment),
  commentController.comments_get
);

router.get(
  "/reviews/:reviewId/comments/:commentId",
  checkIdFormat(),
  commentController.comment_get
);

router.post(
  "/reviews/:id/comments",
  checkIdFormat(),
  verifyJWT(),
  commentController.comment_post
);

router.put(
  "/reviews/:reviewId/comments/:commentId",
  checkIdFormat(),
  verifyJWT(),
  commentController.comment_put
);

router.delete(
  "/reviews/:reviewId/comments/:commentId",
  checkIdFormat(),
  verifyJWT(),
  commentController.comment_delete
);

module.exports = router;
