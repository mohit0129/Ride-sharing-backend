//controllers/admin.js-new
const Admin = require("../models/Admin");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = admin.createToken();
  res.status(StatusCodes.OK).json({ token });
};

module.exports = { login };