const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose"); // Import mongoose
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { merge } = require("./listing.js");
const validateLReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errMsg, 400);
  } else {
    next();
  }
};

// POST Review
// POST Review
router.post(
  "/",
  validateLReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ExpressError("Invalid listing ID", 400);
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      throw new ExpressError("Listing not found", 404);
    }

    // Debugging: log the value of reviews
    console.log("Listing reviews before:", listing.reviews);

    // Ensure the reviews array is initialized
    if (!Array.isArray(listing.reviews)) {
      listing.reviews = [];
    }

    // Debugging: log the value after initialization
    console.log("Listing reviews after initialization:", listing.reviews);

    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New Review Added!");
    res.redirect(`/listings/${listing._id}`);
  })
);

// DELETE Review Route
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(reviewId)
    ) {
      throw new ExpressError("Invalid listing or review ID", 400);
    }

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
