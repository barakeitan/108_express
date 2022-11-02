import { Router } from "express";
const userRouter = require("./user");
const pagesRouter = require("./pages");
const router = Router();

router.use("/user", userRouter);
router.use("/pages", pagesRouter);

module.exports = router;