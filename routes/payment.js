// //routes/payment.js-new
// const express = require("express");
// const router = express.Router();
// const {
//   createPayment,
//   updatePaymentStatus,
//   getPaymentDetails,
//   getUserPayments
// } = require("../controllers/payment");
// const adminAuth = require("../middleware/adminAuth");
// const auth = require("../middleware/authentication");

// router.post("/", auth, createPayment);
// router.patch("/:id", adminAuth, updatePaymentStatus);
// router.get("/:id", auth, getPaymentDetails);
// router.get("/user/history", auth, getUserPayments);

// // module.exports = router;
// export default payment;

// routes/payment.js
import express from "express";
import {
  createPayment,
  updatePaymentStatus,
  getPaymentDetails,
  getUserPayments
} from "../controllers/payment.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/authentication.js";

const router = express.Router();

// Public route: Create a payment (requires user authentication)
router.post("/", auth, createPayment);

// Admin-only route: Update payment status
router.patch("/:id", adminAuth, updatePaymentStatus);

// Public route: Get payment details (requires user authentication)
router.get("/:id", auth, getPaymentDetails);

// Public route: Get user payment history (requires user authentication)
router.get("/user/history", auth, getUserPayments);

export default router;
