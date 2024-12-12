const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL =
  "mongodb+srv://alfatest:test12345@testclustor.1vgul.mongodb.net/wanderlust";

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
    await initDB(); // Initialize the DB after the connection is successful
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Initialize database with data
const initDB = async () => {
  try {
    await Listing.deleteMany({}); // Delete existing listings
    await Listing.insertMany(initData.data); // Insert new data
    console.log("Data initialized successfully");
  } catch (err) {
    console.error("Error initializing the database:", err);
  }
};

main(); // Call the main function
