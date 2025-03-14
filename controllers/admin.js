import Admin from "../models/Admin.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new BadRequestError("Please provide username, password and email");
  }

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
  if (existingAdmin) {
    throw new BadRequestError("Admin with this username or email already exists");
  }

  try {
    // Create first admin as superadmin
    const adminCount = await Admin.countDocuments({});
    const isSuper = adminCount === 0;

    const admin = new Admin({
      username,
      password,
      email,
      isSuper,
      permissions: isSuper ? ['all'] : ['view'],
    });

    await admin.save();

    const accessToken = admin.createAccessToken();
    const refreshToken = admin.createRefreshToken();

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(StatusCodes.CREATED).json({
      message: "Admin created successfully",
      admin: adminResponse,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const accessToken = admin.createAccessToken();
    const refreshToken = admin.createRefreshToken();

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(StatusCodes.OK).json({
      message: "Admin logged in successfully",
      admin: adminResponse,
      access_token: accessToken,
      refresh_token: refreshToken,
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
    const payload = jwt.verify(refresh_token, process.env.ADMIN_TOKEN_SECRET);
    
    if (!payload.isAdmin) {
      throw new UnauthenticatedError("Invalid admin token");
    }
    
    const admin = await Admin.findById(payload.id);

    if (!admin) {
      throw new UnauthenticatedError("Invalid refresh token");
    }

    const newAccessToken = admin.createAccessToken();
    const newRefreshToken = admin.createRefreshToken();

    res.status(StatusCodes.OK).json({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });
  } catch (error) {
    console.error(error);
    throw new UnauthenticatedError("Invalid refresh token");
  }
};