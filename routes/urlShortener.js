const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const URL = require("../models/urlShort");
const urlController = require("../controllers/urlShortController");
const authToken = require("../middleware/authToken");
const { body, validationResult } = require("express-validator");
const validate = require("../middleware/validateFields");

router
  .route("/short-url")
  .post(
    body("weburl", "Enter a valid URL").isURL(),
    validate,
    urlController.createShortUrl
  );
router
  .route("/auth/short-url")
  .post(
    body("weburl", "Enter a valid URL").isURL(),
    validate,
    authToken,
    urlController.createAuthShortUrl
  );
  router
  .route("/auth/edit-short-url")
  .put(
    body("weburl", "Enter a valid URL").isURL(),
    validate,
    authToken,
    urlController.editAuthShortUrl
  );
router
  .route("/:id")
  .post( urlController.shortUrlClickCount);

router
  .route("/auth/getAll-short-url")
  .get(authToken, urlController.fetchShortUrls);

router.route("/:code").get(urlController.redirectToUrl);

module.exports = router;
