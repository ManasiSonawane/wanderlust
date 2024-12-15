const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
//const { saveRedirectUrl } = require("../middleware.js");

router.get(
  "/signup",
  wrapAsync(async (req, res) => {
    res.render("users/signup.ejs");
  })
);
router.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;
  try {
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "welcome to SmartTrade");
    res.redirect("/listings");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    res.send("Welcome to SmartTrade! you are logged in");
  }
);

/*module.exports = router;
const userContorller = require("../controllers/users.js");


router
    .route("/signup")
 
    .get( userContorller.rendersignupForm)

  
    .post(wrapAsync( userContorller.signup ));


router
    .route("/login")
 
    .get( userContorller.renderLoginForm)

   
    .post( saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login", 
            failureFlash: true,
        }), 
        userContorller.login
    );


router.get("/logout", userContorller.logout);

*/
module.exports = router;
