const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

// GET: display notifications all clients
router.get("/", notificationController.renderNotifications);

module.exports = router;