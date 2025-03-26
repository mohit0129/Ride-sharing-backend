// //routes/promoCode.js-new
// const express = require("express");
// const router = express.Router();
// const {
//   createPromoCode,
//   getAllPromoCodes,
//   validatePromoCode
// } = require("../controllers/promoCode");
// const adminAuth = require("../middleware/adminAuth");
// const auth = require("../middleware/authentication");

// router.post("/", adminAuth, createPromoCode);
// router.get("/", adminAuth, getAllPromoCodes);
// router.get("/validate/:code", auth, validatePromoCode);

// // module.exports = router;
// export default promoCode;

// routes/promoCode.js
import express from "express";
import {
  createPromoCode,
  getAllPromoCodes,
  validatePromoCode,
  getPromoCodeById,
  updatePromoCodeStatus,
  deletePromoCode
} from "../controllers/promoCode.js";
// import adminAuth from "../middleware/admin-auth.js";
import { adminAuth } from "../middleware/authentication.js";
import auth from "../middleware/authentication.js";

const router = express.Router();

// Admin-only route: Create a promo code
router.post("/", adminAuth, createPromoCode);

// Admin-only route: Get all promo codes
router.get("/", adminAuth, getAllPromoCodes);

// Admin-only route: Get a single promo code by ID
router.get("/:id", adminAuth, getPromoCodeById);

// Admin-only route: Update promo code status
router.patch("/:id", adminAuth, updatePromoCodeStatus);

// Admin-only route: Delete a promo code
router.delete("/:id", adminAuth, deletePromoCode);

// Public route: Validate a promo code (requires user authentication)
router.get("/validate/:code", auth, validatePromoCode);

export default router;
