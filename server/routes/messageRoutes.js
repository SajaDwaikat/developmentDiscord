const express = require("express");

const {
  getMessages,
  createMessage,
} = require(
  "../controllers/messageController"
);

const router = express.Router();

router.get(
  "/:channel",
  getMessages
);

router.post(
  "/",
  createMessage
);

module.exports = router;