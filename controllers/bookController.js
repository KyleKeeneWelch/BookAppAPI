const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Book = require("../models/book");

// Get Books
exports.books_get = (req, res, next) => {
  res.json(res.paginatedResults);
};

// Get Book
exports.book_get = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id).exec();

  if (book === null) {
    const err = new Error("No Book Found");
    err.status = 404;
    return next(err);
  }

  res.json(book);
});

// Create Book
exports.book_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.authors)) {
      req.body.authors =
        typeof req.body.authors === "undefined" ? [] : [req.body.authors];
    }
    next();
  },
  (req, res, next) => {
    if (!Array.isArray(req.body.categories)) {
      req.body.categories =
        typeof req.body.categories === "undefined" ? [] : [req.body.categories];
    }
    next();
  },
  body("isbn", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("title", "Body is required").trim().isLength({ min: 1 }).escape(),
  body("subTitle", "Sub Title is Invalid")
    .trim()
    .optional({ values: "falsy" })
    .escape(),
  body("authors.*", "Author is required").isLength({ min: 1 }).escape(),
  body("categories.*", "Categories is required").isLength({ min: 1 }).escape(),
  body("thumbnail", "Thumbnail is Invalid")
    .trim()
    .isURL()
    .optional({ values: "falsy" }),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("publishedYear", "Published Year is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("averageRating", "Average Rating is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("numPages").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const book = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      subTitle: req.body.subTitle ? req.body.subTitle : null,
      authors: req.body.authors,
      categories: req.body.categories,
      thumbnail: req.body.thumbnail ? req.body.thumbnail : null,
      description: req.body.description,
      publishedYear: req.body.publishedYear,
      averageRating: req.body.averageRating,
      numPages: req.body.numPages,
      createdAt: Date.now(),
    });

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    } else {
      await book.save();
      res.sendStatus(200);
    }
  }),
];

// Update Book
exports.book_put = [
  (req, res, next) => {
    if (!Array.isArray(req.body.authors)) {
      req.body.authors =
        typeof req.body.authors === "undefined" ? [] : [req.body.authors];
    }
    next();
  },
  (req, res, next) => {
    if (!Array.isArray(req.body.categories)) {
      req.body.categories =
        typeof req.body.categories === "undefined" ? [] : [req.body.categories];
    }
    next();
  },
  body("isbn", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("subTitle", "Sub Title is Invalid")
    .trim()
    .optional({ values: "falsy" })
    .escape(),
  body("authors.*", "Author is required").isLength({ min: 1 }).escape(),
  body("categories.*", "Categories is required").isLength({ min: 1 }).escape(),
  body("thumbnail", "Thumbnail is Invalid")
    .trim()
    .isURL()
    .optional({ values: "falsy" }),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("publishedYear", "Published Year is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("averageRating", "Average Rating is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("numPages").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const existingBook = await Book.findById(req.params.id).exec();

    if (!existingBook) {
      const err = new Error("Book not found");
      err.status = 404;
      next(err);
      return;
    }

    const book = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      subTitle: req.body.subTitle ? req.body.subTitle : null,
      authors: req.body.authors,
      categories: req.body.categories,
      thumbnail: req.body.thumbnail ? req.body.thumbnail : null,
      description: req.body.description,
      publishedYear: req.body.publishedYear,
      averageRating: req.body.averageRating,
      numPages: req.body.numPages,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    } else {
      await Book.findByIdAndUpdate(req.params.id, book, {}).exec();
      res.sendStatus(200);
    }
  }),
];

// Delete Book
exports.book_delete = asyncHandler(async (req, res, next) => {
  const existingBook = await Book.findById(req.params.id).exec();

  if (!existingBook) {
    const err = new Error("Book not found");
    err.status = 404;
    next(err);
    return;
  }

  await Book.findByIdAndDelete(req.params.id).exec();
  res.sendStatus(200);
});
