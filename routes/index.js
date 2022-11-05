import { Router } from "express";
const userRouter = require("./user.routes");
const pagesRouter = require("./pages.routes");
const productsRouter = require("./products.routes");
const shopRouter = require("./cart.routes");
const router = Router();

router.get('/', (req, res) => res.redirect("/shop/home")); // fallback for homePage
router.use("/user", userRouter);
router.use("/pages", pagesRouter);
router.use("/products", productsRouter);
router.use("/shop", shopRouter)
module.exports = router;