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
    const bookSearch = req.query.search;
    const bookId = req.query.bookId;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const numDocs = await model.countDocuments();
    const finalPage = numDocs / limit + 1;

    if (finalPage < page) {
      return res.status(404).json({ message: "Page Not Found" });
    }

    if (limit > 20) {
      return res.status(400).json({ message: "Limit cannot exceed 20" });
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
        if (bookSearch && bookSearch != "undefined") {
          results.results = await model
            .find({
              $or: [
                { title: { $regex: bookSearch, $options: "i" } },
                { categories: { $regex: bookSearch, $options: "i" } },
              ],
            })
            .limit(limit)
            .skip(startIndex)
            .exec();
          res.paginatedResults = results;
        } else {
          results.results = await model
            .find()
            .limit(limit)
            .skip(startIndex)
            .exec();
          res.paginatedResults = results;
        }
        next();
      } else if (model.collection.collectionName == "reviews") {
        if (bookId && bookId != "undefined") {
          results.results = await model
            .find({ book: bookId })
            .limit(limit)
            .skip(startIndex)
            .populate("user", { password: 0, refreshToken: 0 })
            .exec();
          res.paginatedResults = results;
        } else {
          results.results = await model
            .find()
            .limit(limit)
            .skip(startIndex)
            .populate("user", { password: 0, refreshToken: 0 })
            .exec();
          res.paginatedResults = results;
        }
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

    return res.status(400).json({ message: "Bad ID Format" });
  };
};

exports.checkEmailFormat = () => {
  return (req, res, next) => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = EMAIL_REGEX.test(req.params.email);

    if (result) {
      return next();
    }

    return res.status(400).json({ message: "Bad Email Format" });
  };
};

// Sets up config for cookies
exports.credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
  }
  next();
};
