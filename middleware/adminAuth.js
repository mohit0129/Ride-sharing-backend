// // //middleware/adminAuth.js-new
// // const jwt = require("jsonwebtoken");
// // const { UnauthenticatedError } = require("../errors");
// // const Admin = require("../models/Admin");

// // const adminAuth = async (req, res, next) => {
// //   const authHeader = req.headers.authorization;

// //   if (!authHeader || !authHeader.startsWith("Bearer")) {
// //     throw new UnauthenticatedError("Authentication invalid");
// //   }

// //   const token = authHeader.split(" ")[1];

// //   try {
// //     const payload = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
// //     const admin = await Admin.findById(payload.id);

// //     if (!admin) {
// //       throw new UnauthenticatedError("Admin not found");
// //     }

// //     req.admin = { id: payload.id, email: payload.email };
// //     next();
// //   } catch (error) {
// //     throw new UnauthenticatedError("Authentication invalid");
// //   }
// // };

// // export default adminAuth;
// // // module.exports = adminAuth;


// // middleware/adminAuth.js
// import jwt from "jsonwebtoken";
// import { UnauthenticatedError } from "../errors/index.js";
// import Admin from "../models/Admin.js";

// const adminAuth = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     throw new UnauthenticatedError("Authentication invalid");
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const payload = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
    
//     const admin = await Admin.findById(payload.id);

//     if (!admin) {
//       throw new UnauthenticatedError("Admin not found");
//     }

//     req.admin = { id: payload.id, email: payload.email };
//     next();
//   } catch (error) {
//     console.error("Error verifying admin token:", error);
//     throw new UnauthenticatedError("Authentication invalid");
//   }
// };

// export default adminAuth;
