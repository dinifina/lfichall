const express = require("express");
const router = express.Router();
const path = require("path");
const photoController = require("../../controllers/photoController");

router.route('/')
  .get(photoController.getPhoto)
  .post(photoController.uploadPhoto)

module.exports = router;