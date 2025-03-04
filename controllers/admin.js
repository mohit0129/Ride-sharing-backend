// //controllers/admin.js-new
// import Admin from "../models/Admin.js";
// import { StatusCodes } from "http-status-codes";
// import { BadRequestError, UnauthenticatedError } from "../errors";

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     throw new BadRequestError("Please provide email and password");
//   }

//   const admin = await Admin.findOne({ email });
//   if (!admin) {
//     throw new UnauthenticatedError("Invalid credentials");
//   }

//   const isPasswordCorrect = await admin.comparePassword(password);
//   if (!isPasswordCorrect) {
//     throw new UnauthenticatedError("Invalid credentials");
//   }

//   const token = admin.createToken();
//   res.status(StatusCodes.OK).json({ token });
// };

// module.exports = { login };

// controllers/admin.js
import Admin from "../models/Admin.js";
import { StatusCodes } from "http-status-codes";
// import { BadRequestError, UnauthenticatedError } from "../errors";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await admin.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const token = admin.createToken();

    res.status(StatusCodes.OK).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    throw new BadRequestError("Failed to login");
  }
};
