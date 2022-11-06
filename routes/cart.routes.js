const {Router} = require("express");
const csrf = require("csurf");
const middleware = require("../middleware");
const router = Router();
const cartController = require("../controllers/cart.controller");

const csrfProtection = csrf();
router.use(csrfProtection);

// GET: render home page
router.get("/home",cartController.renderShopHomePage);

// GET: add a product to the shopping cart when "Add to cart" button is pressed
router.get("/add-to-cart/:id",cartController.addProductToCart );

// GET: view shopping cart contents
router.get("/shopping-cart", cartController.renderShoppingCart);

// GET: reduce one from an item in the shopping cart
router.get("/reduce/:id", cartController.reduceProductFromShoppingCart);

// GET: remove all instances of a single product from the cart
router.get("/removeAll/:id", cartController.removeAllByProductId);

// GET: checkout form with csrf token
router.get("/checkout", middleware.isLoggedIn, cartController.renderCheckoutForShoppingCart);

// POST: handle checkout logic and payment using Stripe
router.post("/checkout", middleware.isLoggedIn, cartController.handleCheckoutLogic);

module.exports = router;
