// routes/upload.routes.js
const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller");

router.post("/document", uploadController.uploadFile);

module.exports = router;
