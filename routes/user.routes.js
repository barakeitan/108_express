const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

const middleware = require("../middleware");
const {
  userSignUpValidationRules,
  userSignInValidationRules,
  validateSignup,
  validateSignin,
} = require("../config/validator");

const userController = require("../controllers/user.controller");

const csrfProtection = csrf();
router.use(csrfProtection);

// GET: display the signup form with csrf token
router.get("/signup", middleware.isNotLoggedIn,userController.renderSignUp)


// POST: handle the signup logic
router.post(
  "/signup",
  [
    middleware.isNotLoggedIn,
    userSignUpValidationRules(),
    validateSignup,
    passport.authenticate("local.signup", {
      successRedirect: "/user/profile",
      failureRedirect: "/user/signup",
      failureFlash: true,
    }),
  ],userController.handleSignUp);

// GET: display the signin form with csrf token
router.get("/signin", middleware.isNotLoggedIn, userController.renderSignIn)

// POST: handle the signin logic
router.post(
  "/signin",
  [
    middleware.isNotLoggedIn,
    userSignInValidationRules(),
    validateSignin,
    passport.authenticate("local.signin", {
      failureRedirect: "/user/signin",
      failureFlash: true,
    }),
  ],userController.handleSignIn
);

// GET: display user's profile
router.get("/profile", middleware.isLoggedIn,userController.renderUserProfile);

// GET: logout
router.get("/logout", middleware.isLoggedIn,userController.handleLogOut);

router.get("/admin", middleware.isAdmin, userController.renderAdminPage)

module.exports = router;
