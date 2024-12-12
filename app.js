const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const path = require('path');
const app = express();
const PORT = 8080;
const MONGO_URL =
  "mongodb+srv://alfatest:test12345@testclustor.1vgul.mongodb.net/wanderlust";

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded({ extended: true }));
// Routes
// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Wanderlust API!");
});

// Create a sample listing for testing
/*app.get("/testListing", async (req, res) => {
  try {
    let sampleListing = new Listing({
      title: "My Home",
      description: "By the beach",
      image: {
        url: "https://example.com/image.jpg",
        filename: "image.jpg",
      },
      price: 1200,
      location: "Calangute, Goa",
      country: "India",
      unit: "Villa",
      enquiry: "Contact for more details",
      email: "owner@example.com",
      number: 9876543210,
    });
    await sampleListing.save();
    console.log("Sample listing was saved");
    res.status(201).send("Sample listing created successfully");
  } catch (error) {
    console.error("Error creating sample listing:", error);
    res.status(500).send("Failed to create sample listing");
  }
});*/

// Fetch all listings
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  });
  //Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});