import { Router } from "express";
const userRouter = require("./user");
const pagesRouter = require("./pages");
const productsRouter = require("./products");
const notificationsRouter = require("./notifications");
const router = Router();

router.use("/user", userRouter);
router.use("/pages", pagesRouter);
router.use("/products", productsRouter);
router.use("*", notificationsRouter);

module.exports = router;