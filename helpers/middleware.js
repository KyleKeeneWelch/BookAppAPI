const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");
const allowedOrigins = require("../config/allowedOrigins");

// Authenticate using JSONWebToken
exports.verifyJWT = () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader?.split(" ")[0].toLowerCase() != "bearer")
      return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.user = decoded.UserInfo;
      next();
    });
  };
};

// Mechanism for providing paginated results for api entities
exports.paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const numDocs = await model.countDocuments();
    const finalPage = numDocs / limit + 1;

    if (finalPage < page) {
      const err = new Error("Page not found");
      err.status = 404;
      err.message = "Page not found";
      return next(err);
    }

    if (limit > 10) {
      const err = new Error("Limit cannot exceed 10");
      err.message = "Limit cannot exceed 10";
      err.status = 403;
      return next(err);
    }

    const results = {};

    if (endIndex < (await model.countDocuments().exec()))
      results.next = {
        page: page + 1,
        limit: limit,
      };

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // Check the paginated model and populate associated fields before sending response.
    try {
      if (model.collection.collectionName == "books") {
        results.results = await model
          .find()
          .limit(limit)
          .skip(startIndex)
          .exec();
        res.paginatedResults = results;
        next();
      } else if (model.collection.collectionName == "reviews") {
        results.results = await model
          .find()
          .limit(limit)
          .skip(startIndex)
          .populate("user", { password: 0, refreshToken: 0 })
          .exec();
        res.paginatedResults = results;
        next();
      } else if (model.collection.collectionName == "users") {
        results.results = await model
          .find()
          .select({ password: 0, refreshToken: 0 })
          .limit(limit)
          .skip(startIndex)
          .exec();
        res.paginatedResults = results;
        next();
      } else if (model.collection.collectionName == "comments") {
        results.results = await model
          .find({ review: req.params.id })
          .select({ password: 0 })
          .limit(limit)
          .skip(startIndex)
          .populate("user", { password: 0, refreshToken: 0 })
          .populate("review")
          .exec();
        res.paginatedResults = results;
        next();
      }
    } catch (e) {
      res.status(500);
    }
  };
};

// Check to see if passed ID(s) are in the correct format before passing to controller.
exports.checkIdFormat = () => {
  return (req, res, next) => {
    if (ObjectId.isValid(req.params.id) && !req.params._id) {
      return next();
    }

    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params._id)) {
      return next();
    }

    if (
      ObjectId.isValid(req.params.commentId) &&
      ObjectId.isValid(req.params.reviewId)
    ) {
      return next();
    }

    const err = new Error("Invalid ID");
    err.status = 400;
    err.message = "Invalid ID";
    return next(err);
  };
};

// Sets up config for cookies
exports.credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
