// //controllers/auth.js
// import User from "../models/User.js";
// import { StatusCodes } from "http-status-codes";
// import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
// import jwt from "jsonwebtoken";

// export const auth = async (req, res) => {
//   const { phone, role } = req.body;

//   if (!phone) {
//     throw new BadRequestError("Phone number is required");
//   }

//   if (!role || !["customer", "rider"].includes(role)) {
//     throw new BadRequestError("Valid role is required (customer or rider)");
//   }

//   try {
//     let user = await User.findOne({ phone });

//     if (user) {
//       if (user.role !== role) {
//         throw new BadRequestError("Phone number and role do not match");
//       }

//       const accessToken = user.createAccessToken();
//       const refreshToken = user.createRefreshToken();

//       return res.status(StatusCodes.OK).json({
//         message: "User logged in successfully",
//         user,
//         access_token: accessToken,
//         refresh_token: refreshToken,
//       });
//     }

//     user = new User({
//       phone,
//       role,
//     });

//     await user.save();

//     const accessToken = user.createAccessToken();
//     const refreshToken = user.createRefreshToken();

//     res.status(StatusCodes.CREATED).json({
//       message: "User created successfully",
//       user,
//       access_token: accessToken,
//       refresh_token: refreshToken,
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const refreshToken = async (req, res) => {
//   const { refresh_token } = req.body;
//   if (!refresh_token) {
//     throw new BadRequestError("Refresh token is required");
//   }

//   try {
//     const payload = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
//     const user = await User.findById(payload.id);

//     if (!user) {
//       throw new UnauthenticatedError("Invalid refresh token");
//     }

//     const newAccessToken = user.createAccessToken();
//     const newRefreshToken = user.createRefreshToken();

//     res.status(StatusCodes.OK).json({
//       access_token: newAccessToken,
//       refresh_token: newRefreshToken,
//     });
//   } catch (error) {
//     console.error(error);
//     throw new UnauthenticatedError("Invalid refresh token");
//   }
// };

import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { 
    firstName, 
    lastName, 
    email, 
    phone, 
    birthDate, 
    role,
    vehicleType,
    manufacturer,
    model,
    modelYear,
    licensePlate,
    color
  } = req.body;

  // Validate required fields for all users
  if (!firstName || !lastName || !email || !phone || !birthDate || !role) {
    throw new BadRequestError("Please provide all required fields");
  }

  // Validate role
  if (!["customer", "rider"].includes(role)) {
    throw new BadRequestError("Role must be either 'customer' or 'rider'");
  }

  // Check if user with the same phone or email already exists
  const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
  if (existingUser) {
    throw new BadRequestError("User with this phone number or email already exists");
  }

  // Additional validation for riders
  if (role === "rider") {
    if (!vehicleType || !manufacturer || !model || !modelYear || !licensePlate || !color) {
      throw new BadRequestError("Please provide all vehicle details for rider signup");
    }
    
    if (!["bike", "car"].includes(vehicleType)) {
      throw new BadRequestError("Vehicle type must be either 'bike' or 'car'");
    }
  }

  try {
    // Create the user object with the appropriate structure
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      birthDate: new Date(birthDate),
      role,
      status: "active" // Set default status to active
    };

    // Add vehicle details for riders
    if (role === "rider") {
      userData.vehicleDetails = {
        vehicleType,
        manufacturer,
        model,
        modelYear,
        licensePlate,
        color
      };
    }

    const user = new User(userData);
    await user.save();

    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    // Return user data without sensitive information
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    };

    res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      user: userResponse,
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signin = async (req, res) => {
  const { email, phone } = req.body;

  // User must provide either email or phone
  if (!email && !phone) {
    throw new BadRequestError("Please provide either email or phone number");
  }

  try {
    // Find user by email or phone
    const query = {};
    if (email) query.email = email;
    if (phone) query.phone = phone;

    const user = await User.findOne(query);

    if (!user) {
      throw new UnauthenticatedError("User not found");
    }

    // Check if user account is active
    if (user.status !== "active") {
      throw new UnauthenticatedError("Account is not active. Please contact support.");
    }

    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    // Return user data without sensitive information
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    };

    return res.status(StatusCodes.OK).json({
      message: "User logged in successfully",
      user: userResponse,
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const refreshToken = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    throw new BadRequestError("Refresh token is required");
  }

  try {
    const payload = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);

    if (!user) {
      throw new UnauthenticatedError("Invalid refresh token");
    }

    // Check if user account is active
    if (user.status !== "active") {
      throw new UnauthenticatedError("Account is not active. Please contact support.");
    }

    const newAccessToken = user.createAccessToken();
    const newRefreshToken = user.createRefreshToken();

    res.status(StatusCodes.OK).json({
      access_token: newAccessToken,
      refresh_token: newRefreshToken
    });
  } catch (error) {
    console.error(error);
    throw new UnauthenticatedError("Invalid refresh token");
  }
};

// New endpoint for account deactivation
export const deactivateAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      throw new NotFoundError("User not found");
    }
    
    user.status = "deleted";
    await user.save();
    
    res.status(StatusCodes.OK).json({
      message: "Account deactivated successfully"
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};