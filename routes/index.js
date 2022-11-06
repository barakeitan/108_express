const { Router }  = require("express");
const userRouter = require("./user.routes");
const pagesRouter = require("./pages.routes");
const productsRouter = require("./products.routes");
const shopRouter = require("./cart.routes");
const { isAdmin } = require("../middleware/index");
const router = Router();

// fallback for homePage

router.use("/user" ,userRouter);
router.use("/pages", pagesRouter);
router.use("/products", productsRouter);
router.use("/shop", shopRouter)
router.use('*', (req, res) => res.redirect("/shop/home"));

module.exports = router;