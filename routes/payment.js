//routes/payment.js-new
const express = require("express");
const router = express.Router();
const {
  createPayment,
  updatePaymentStatus,
  getPaymentDetails,
  getUserPayments
} = require("../controllers/payment");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/authentication");

router.post("/", auth, createPayment);
router.patch("/:id", adminAuth, updatePaymentStatus);
router.get("/:id", auth, getPaymentDetails);
router.get("/user/history", auth, getUserPayments);

module.exports = router;