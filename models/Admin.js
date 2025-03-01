//models/Admin.js-new
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  }
}, {
  timestamps: true
});

adminSchema.pre("save", async function() {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

adminSchema.methods.createToken = function() {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.ADMIN_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};

adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;