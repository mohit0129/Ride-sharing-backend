//routes/promoCode.js-new
const express = require("express");
const router = express.Router();
const {
  createPromoCode,
  getAllPromoCodes,
  validatePromoCode
} = require("../controllers/promoCode");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/authentication");

router.post("/", adminAuth, createPromoCode);
router.get("/", adminAuth, getAllPromoCodes);
router.get("/validate/:code", auth, validatePromoCode);

module.exports = router;