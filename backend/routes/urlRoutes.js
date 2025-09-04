const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  redirectUrl,
  getAllUrls,
} = require("../controller/urlController");

router.post("/shorten", createShortUrl);

router.get("/urls", getAllUrls);

router.get("/:shortCode", redirectUrl);

module.exports = router;
