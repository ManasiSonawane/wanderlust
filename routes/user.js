const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
//const { saveRedirectUrl } = require("../middleware.js");

router.get(
  "/signup",
  wrapAsync(async (req, res) => {
    res.render("users/signup.ejs");
  })
);
router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to SmartTrade");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.redirectUrl || "/listings");
  }
);
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  req.flash("success", "Thankyou for Visting!");
  res.redirect("/listings");
});
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
