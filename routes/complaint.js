//routes/complaint.js-new
const express = require("express");
const router = express.Router();
const {
  createComplaint,
  updateComplaint,
  getAllComplaints,
  getUserComplaints
} = require("../controllers/complaint");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/authentication");

router.post("/", auth, createComplaint);
router.patch("/:id", adminAuth, updateComplaint);
router.get("/", adminAuth, getAllComplaints);
router.get("/user", auth, getUserComplaints);

module.exports = router;