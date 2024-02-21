const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const fetch = require("node-fetch");
const Recommendation = require("../models/recommendation");

const WeakETagRegex = /W\/"(\d+.*)"/;

// Get ETag value using WeakETagRegex
const getWeakETagValue = (etag) => {
  const weak = WeakETagRegex.exec(etag);
  if (weak == null || weak.length == 0) {
    const err = new Error("Wrong ETag Format");
    err.status = 500;
    return next(err);
  }
  return weak[1];
};

// Return the most common category in recommendation.
const categoryMode = (arr) => {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
};

// Get recommendation
exports.recommendation_get = asyncHandler(async (req, res, next) => {
  const recommendation = await Recommendation.findOne({
    user: req.params.id,
  }).exec();

  if (!recommendation) {
    const err = new Error("Recommendation Not Found");
    err.status = 404;
    return next(err);
  }

  const response = await fetch(
    `http://localhost:5000/users/${req.params.id}/book-recommendation/${recommendation.recommendationId}`,
    {
      method: "get",
      headers: {
        Authorization: req.headers["authorization"],
      },
    }
  );

  const data = await response.json();

  if (!data) {
    const err = new Error("Invalid Response");
    err.status = 500;
    return next(err);
  }

  const viewRecommendations = [];
  const likeRecommendations = [];
  const ratingRecommendations = [];

  // If recommendation subset provided, count the most common category, then second most if categories left after filter.
  if (data.recommendFromViews.length > 0) {
    viewRecommendations.push(categoryMode(data.recommendFromViews.slice()));

    const remainingCategories = data.recommendFromViews
      .slice()
      .filter((category) => category != viewRecommendations[0]);

    if (remainingCategories.length > 0) {
      viewRecommendations.push(categoryMode(remainingCategories));
    }
  }

  if (data.recommendFromLikes.length > 0) {
    likeRecommendations.push(categoryMode(data.recommendFromLikes.slice()));

    const remainingCategories = data.recommendFromLikes
      .slice()
      .filter((category) => category != likeRecommendations[0]);

    if (remainingCategories.length > 0) {
      likeRecommendations.push(categoryMode(remainingCategories));
    }
  }

  if (data.recommendFromRatings.length > 0) {
    ratingRecommendations.push(categoryMode(data.recommendFromRatings.slice()));

    const remainingCategories = data.recommendFromRatings
      .slice()
      .filter((category) => category != ratingRecommendations[0]);

    if (remainingCategories.length > 0) {
      ratingRecommendations.push(categoryMode(remainingCategories));
    }
  }

  // Update recommendation to provide new profile.
  const newRecommendation = new Recommendation({
    user: recommendation.user,
    recommendationId: recommendation.recommendationId,
    viewRecommendations: viewRecommendations,
    likeRecommendations: likeRecommendations,
    ratingRecommendations: ratingRecommendations,
    revision: data.revision,
    _id: recommendation._id,
  });

  await Recommendation.findByIdAndUpdate(
    recommendation._id,
    newRecommendation,
    {}
  ).exec();

  res.status(200).json(newRecommendation);
});

// Create Recommendation
exports.recommendation_post = asyncHandler(async (req, res, next) => {
  const response = await fetch(
    `http://localhost:5000/users/${req.params.id}/book-recommendation/`,
    {
      method: "post",
      headers: {
        Authorization: req.headers["authorization"],
      },
    }
  );

  const data = await response.json();

  if (!data) {
    const err = new Error("Invalid Response");
    err.status = 500;
    return next(err);
  }

  // Get Etag value.
  const nextRevision = getWeakETagValue(response.headers.get("etag"));

  // Update revision with Etag value.
  const recommendation = new Recommendation({
    user: req.user.id,
    recommendationId: data.id,
    viewRecommendations: [],
    likeRecommendations: [],
    ratingRecommendations: [],
    revision: nextRevision,
    createdAt: Date.now(),
  });

  await recommendation.save();
  res.sendStatus(200);
});

exports.recommendation_book_view_post = [
  body("isbn", "Isbn is required").isNumeric().isLength({ min: 1 }).escape(),
  body("categories.*", "Categories is required").isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    }

    const recommendation = await Recommendation.findOne({
      user: req.params.id,
    }).exec();

    if (!recommendation) {
      const err = new Error("Recommendation Not Found");
      err.status = 404;
      return next(err);
    }

    const response = await fetch(
      `http://localhost:5000/users/${req.params.id}/book-recommendation/${recommendation.recommendationId}/view-book`,
      {
        method: "post",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers["authorization"],
          "If-Match": `W/"${recommendation.revision}"`,
        },
      }
    );

    if (response.ok) {
      // Get Etag value.
      const nextRevision = getWeakETagValue(response.headers.get("etag"));

      // Update revision with Etag value.
      const newRecommendation = new Recommendation({
        user: recommendation.user,
        recommendationId: recommendation.recommendationId,
        viewRecommendations: recommendation.viewRecommendations,
        likeRecommendations: recommendation.likeRecommendations,
        ratingRecommendations: recommendation.ratingRecommendations,
        revision: nextRevision,
        _id: recommendation._id,
      });

      await Recommendation.findByIdAndUpdate(
        recommendation._id,
        newRecommendation,
        {}
      );

      res.sendStatus(200);
    } else {
      const err = new Error("Invalid Response");
      err.status = 500;
      return next(err);
    }
  }),
];

exports.recommendation_book_rate_post = [
  body("isbn", "Isbn is required").isNumeric().isLength({ min: 1 }).escape(),
  body("categories.*", "Categories is required").isLength({ min: 1 }).escape(),
  body("rating", "Rating is required")
    .isNumeric()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    }

    const recommendation = await Recommendation.findOne({
      user: req.params.id,
    }).exec();

    if (!recommendation) {
      const err = new Error("Recommendation Not Found");
      err.status = 404;
      return next(err);
    }

    const response = await fetch(
      `http://localhost:5000/users/${req.params.id}/book-recommendation/${recommendation.recommendationId}/rate-book`,
      {
        method: "post",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers["authorization"],
          "If-Match": `W/"${recommendation.revision}"`,
        },
      }
    );

    if (response.ok) {
      // Get Etag value.
      const nextRevision = getWeakETagValue(response.headers.get("etag"));

      // Update revision with Etag value.
      const newRecommendation = new Recommendation({
        user: recommendation.user,
        recommendationId: recommendation.recommendationId,
        viewRecommendations: recommendation.viewRecommendations,
        likeRecommendations: recommendation.likeRecommendations,
        ratingRecommendations: recommendation.ratingRecommendations,
        revision: nextRevision,
        _id: recommendation._id,
      });

      await Recommendation.findByIdAndUpdate(
        recommendation._id,
        newRecommendation,
        {}
      );

      res.sendStatus(200);
    } else {
      const err = new Error("Invalid Response");
      err.status = 500;
      return next(err);
    }
  }),
];

exports.recommendation_book_like_post = [
  body("isbn", "Isbn is required").isNumeric().isLength({ min: 1 }).escape(),
  body("categories.*", "Categories is required").isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    }

    const recommendation = await Recommendation.findOne({
      user: req.params.id,
    }).exec();

    if (!recommendation) {
      const err = new Error("Recommendation Not Found");
      err.status = 404;
      return next(err);
    }

    const response = await fetch(
      `http://localhost:5000/users/${req.params.id}/book-recommendation/${recommendation.recommendationId}/like-book`,
      {
        method: "post",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers["authorization"],
          "If-Match": `W/"${recommendation.revision}"`,
        },
      }
    );

    if (response.ok) {
      // Get Etag value.
      const nextRevision = getWeakETagValue(response.headers.get("etag"));

      // Update revision with Etag value.
      const newRecommendation = new Recommendation({
        user: recommendation.user,
        recommendationId: recommendation.recommendationId,
        viewRecommendations: recommendation.viewRecommendations,
        likeRecommendations: recommendation.likeRecommendations,
        ratingRecommendations: recommendation.ratingRecommendations,
        revision: nextRevision,
        _id: recommendation._id,
      });

      await Recommendation.findByIdAndUpdate(
        recommendation._id,
        newRecommendation,
        {}
      );

      res.sendStatus(200);
    } else {
      const err = new Error("Invalid Response");
      err.status = 500;
      return next(err);
    }
  }),
];

exports.recommendation_book_unlike_post = [
  body("isbn", "Isbn is required").isNumeric().isLength({ min: 1 }).escape(),
  body("categories.*", "Categories is required").isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error(errors.Array());
      err.status = 403;
      next(err);
      return;
    }

    const recommendation = await Recommendation.findOne({
      user: req.params.id,
    }).exec();

    if (!recommendation) {
      const err = new Error("Recommendation Not Found");
      err.status = 404;
      return next(err);
    }

    const response = await fetch(
      `http://localhost:5000/users/${req.params.id}/book-recommendation/${recommendation.recommendationId}/unlike-book`,
      {
        method: "post",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers["authorization"],
          "If-Match": `W/"${recommendation.revision}"`,
        },
      }
    );

    if (response.ok) {
      // Get Etag value.
      const nextRevision = getWeakETagValue(response.headers.get("etag"));

      // Update revision with Etag value.
      const newRecommendation = new Recommendation({
        user: recommendation.user,
        recommendationId: recommendation.recommendationId,
        viewRecommendations: recommendation.viewRecommendations,
        likeRecommendations: recommendation.likeRecommendations,
        ratingRecommendations: recommendation.ratingRecommendations,
        revision: nextRevision,
        _id: recommendation._id,
      });

      await Recommendation.findByIdAndUpdate(
        recommendation._id,
        newRecommendation,
        {}
      );

      res.sendStatus(200);
    } else {
      const err = new Error("Invalid Response");
      err.status = 500;
      return next(err);
    }
  }),
];
