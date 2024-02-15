const ObjectId = require("mongoose").Types.ObjectId;

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
          .populate("user")
          .exec();
        res.paginatedResults = results;
        next();
      } else if (model.collection.collectionName == "users") {
        results.results = await model
          .find()
          .select({ password: 0 })
          .limit(limit)
          .skip(startIndex)
          .exec();
        res.paginatedResults = results;
        next();
      } else if (model.collection.collectionName == "comments") {
        results.results = await model
          .find()
          .select({ password: 0 })
          .limit(limit)
          .skip(startIndex)
          .populate("user")
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

exports.checkIdFormat = () => {
  return (req, res, next) => {
    if (ObjectId.isValid(req.params.id) && !req.params._id) {
      return next();
    }

    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params._id)) {
      return next();
    }

    const err = new Error("Invalid ID");
    err.status = 400;
    err.message = "Invalid ID";
    return next(err);
  };
};
