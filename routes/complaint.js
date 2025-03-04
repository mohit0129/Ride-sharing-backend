// //routes/complaint.js-new
// const express = require("express");
// const router = express.Router();
// const {
//   createComplaint,
//   updateComplaint,
//   getAllComplaints,
//   getUserComplaints
// } = require("../controllers/complaint");
// const adminAuth = require("../middleware/adminAuth");
// const auth = require("../middleware/authentication");

// router.post("/", auth, createComplaint);
// router.patch("/:id", adminAuth, updateComplaint);
// router.get("/", adminAuth, getAllComplaints);
// router.get("/user", auth, getUserComplaints);

// // module.exports = router;
// export default complaing;

// routes/complaint.js
import express from "express";
import {
  createComplaint,
  updateComplaint,
  getAllComplaints,
  getUserComplaints
} from "../controllers/complaint.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/authentication.js";

const router = express.Router();

// Public route: Create a complaint (requires authentication)
router.post("/", auth, createComplaint);

// Admin-only route: Update a complaint
router.patch("/:id", adminAuth, updateComplaint);

// Admin-only route: Get all complaints
router.get("/", adminAuth, getAllComplaints);

// Public route: Get user complaints (requires authentication)
router.get("/user", auth, getUserComplaints);

export default router;
