const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

// GET: display all products
router.get("/", productsController.renderAllProducts);

// GET: search box
router.get("/search", productsController.renderSearchForProducts);

//GET: get a certain category by its slug (this is used for the categories navbar)
router.get("/:slug", productsController.renderCategoryBySlug);

// GET: display a certain product by its id
router.get("/:slug/:id", productsController.renderProductBySlugAndId);

// POST: handle add new product logic
router.post("/add-product", productsController.handleAddProduct);
module.exports = router;
