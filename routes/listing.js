const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");



// Fetch all listings  index route
router.get(
    "/",
    wrapAsync(async (req, res) => {
      const allListings = await Listing.find({});
      res.render("listings/index.ejs", { allListings });
    })
  );
  //New Route
  router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  
  //Show Route
  router.get(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id).populate("reviews");
      res.render("listings/show.ejs", { listing });
    })
  );

  //Create Route
  router.post(
    "/",
    wrapAsync(async (req, res, next) => {
      const { error } = listingSchema.validate(req.body);
      if (error) {
        throw new ExpressError(
          400,
          error.details.map((el) => el.message).join(", ")
        );
      }
      if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
      }
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      res.redirect("/listings");
    })
  );
  
  //Edit Route
  
  router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id);
      res.render("listings/edit.ejs", { listing });
    })
  );
  
  //Update Route
  router.put(
    "/:id",
    wrapAsync(async (req, res) => {
      if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
      }
      let { id } = req.params;
      await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      res.redirect(`/listings/${id}`);
    })
  );

  //Delete Route
  router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let deletedListing = await Listing.findByIdAndDelete(id);
      console.log(deletedListing);
      res.redirect("/listings");
    })
  );

  module.exports = router;