/*testcode*/
const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

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
//const validateListing = (req,res,next) =>{
// let { error} = listingSchema.validate(req.body);
//if (error){
////  let errMsg = error.details.map((el)=> el.message).join(",");

//}else{
//   next();
//}
//};

//Create Route ara

//app.post("/listings", async (req, res) => {
//try {
//const newListing = new Listing(req.body.listing);
//console.log(newListing);
//await newListing.save();
//res.redirect("/listings");
//} catch (error) {
//console.error("Error creating listing:", error);
//res.status(500).send("Failed to create listing");
// }
//});

app.use("/listings", listings);

app.use("/listings/:id/reviews", reviews);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
  //res.status(statusCode).send(message);
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
