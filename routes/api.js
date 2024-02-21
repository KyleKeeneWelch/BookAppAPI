const express = require("express");
const { paginatedResults, checkIdFormat } = require("../helpers/middleware");
const passport = require("passport");
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

router.put(
  "/users/:id",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  userController.user_put
);

router.delete(
  "/users/:id",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  userController.user_delete
);

// Book

router.get("/books", paginatedResults(Book), bookController.books_get);

router.get("/books/:id", checkIdFormat(), bookController.book_get);

router.post(
  "/books",
  passport.authenticate("jwt", { session: false }),
  bookController.book_post
);

router.put(
  "/books/:id",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  bookController.book_put
);

router.delete(
  "/books/:id",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  bookController.book_delete
);

// Review
router.get("/reviews", paginatedResults(Review), reviewController.reviews_get);

router.get("/reviews/:id", checkIdFormat(), reviewController.review_get);

router.post(
  "/reviews",
  passport.authenticate("jwt", { session: false }),
  reviewController.review_post
);

router.put(
  "/reviews/:id",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  reviewController.review_put
);

router.delete(
  "/reviews/:id",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  reviewController.review_delete
);

// Comment
router.get(
  "/reviews/:id/comments",
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
  passport.authenticate("jwt", { session: false }),
  commentController.comment_post
);

router.put(
  "/reviews/:reviewId/comments/:commentId",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  commentController.comment_put
);

router.delete(
  "/reviews/:reviewId/comments/:commentId",
  checkIdFormat(),
  passport.authenticate("jwt", { session: false }),
  commentController.comment_delete
);

module.exports = router;
