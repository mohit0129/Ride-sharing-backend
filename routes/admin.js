// //routes/admin.js-new
// import express from "express";
// const router = express.Router();
// import { login } from "../controllers/admin.js";
// import adminAuth from "../middleware/adminAuth.js";

// router.post("/login", login);

// // module.exports = router;
// export default admin;

// routes/admin.js
import express from "express";
import { login } from "../controllers/admin.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Route to login admin
router.post("/login", login);

// Protected routes for admins (you can add more routes here in the future)
router.use(adminAuth);

export default router;
