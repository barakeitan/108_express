const express = require("express");
const csrf = require("csurf");
const router = express.Router();
const {
  userContactUsValidationRules,
  validateContactUs,
} = require("../config/validator");

const pagesController = require("../controllers/pages.controller");

const csrfProtection = csrf();
router.use(csrfProtection);

//GET: display abous us page
router.get("/about-us", pagesController.renderAboutUs);

//GET: display shipping policy page
router.get("/shipping-policy", pagesController.renderShippingPolicy);

//GET: display careers page
router.get("/careers", pagesController.renderCareers);

//GET: display contact us page and form with csrf tokens
router.get("/contact-us", pagesController.renderContactUs);

//POST: handle contact us form logic using nodemailer
router.post(
  "/contact-us",
  [userContactUsValidationRules(), validateContactUs],
  pagesController.handleContactUs);

module.exports = router;
