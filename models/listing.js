const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
      default:
        "https://plus.unsplash.com/premium_photo-1683543124672-6cbc571d1f31?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    filename: {
      type: String,
      required: true,
      default: "Listing Image",
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  enquiry: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  reviews:{
    type: Schema.Types.ObjectId,
    ref: "Review",
},
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
