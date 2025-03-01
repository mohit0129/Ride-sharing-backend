//routes/admin.js-new
const express = require("express");
const router = express.Router();
const { login } = require("../controllers/admin");
const adminAuth = require("../middleware/adminAuth");

router.post("/login", login);

module.exports = router;