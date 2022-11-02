import { Router } from "express";
const userRouter = require("./user");
const pagesRouter = require("./pages");
const productsRouter = require("./products");
const router = Router();

router.use("/user", userRouter);
router.use("/pages", pagesRouter);
router.use("/products", productsRouter);

module.exports = router;