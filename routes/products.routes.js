const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const middleware = require("../middleware");

// GET: display all products
router.get("/", productsController.renderAllProducts);

// GET: search box
router.get("/search", productsController.renderSearchForProducts);

router.post('/handle-edit-product/:productId',middleware.isAdmin, productsController.handleEditProduct)

router.get("/edit-product/:productId", middleware.isAdmin, productsController.renderEditProduct);

router.get('/new-product', middleware.isAdmin, productsController.renderCreateNewProduct)

// POST: handle create new product logic
router.post("/create-new-product", middleware.isAdmin, productsController.handleCreateNewProduct);

router.get("/delete-product/:productId", productsController.handleDeleteProduct);

// GET: display a certain product by its id
router.get("/:slug/:id", productsController.renderProductBySlugAndId);

//GET: get a certain category by its slug (this is used for the categories navbar)
router.get("/:slug", productsController.renderCategoryBySlug);








module.exports = router;
