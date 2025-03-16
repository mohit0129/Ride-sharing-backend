// //middkeware/authentication.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import NotFoundError from "../errors/not-found.js";
// import UnauthenticatedError from "../errors/unauthenticated.js";

// const auth = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     throw new UnauthenticatedError("Authentication invalid");
//   }
//   const token = authHeader.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = { id: payload.id, phone: payload.phone };
//     req.socket = req.io;

//     const user = await User.findById(payload.id);

//     if (!user) {
//       throw new NotFoundError("User not found");
//     }

//     next();
//   } catch (error) {
//     throw new UnauthenticatedError("Authentication invalid");
//   }
// };

// export default auth;

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import NotFoundError from "../errors/not-found.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Include role and status in the request user object
    req.user = { 
      id: payload.id, 
      phone: payload.phone,
      role: payload.role,
      status: payload.status
    };
    
    if (req.io) {
      req.socket = req.io;
    }

    const user = await User.findById(payload.id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check if user account is active
    if (user.status !== "active") {
      throw new UnauthenticatedError("Account is not active. Access denied.");
    }

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;