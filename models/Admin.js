import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isSuper: {
      type: Boolean,
      default: false,
    },
    permissions: {
      type: [String],
      default: ['view'],
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const bcrypt = await import('bcryptjs');
    this.password = await bcrypt.hash(this.password, 10);
  }
});

adminSchema.methods.createAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      isAdmin: true,
    },
    process.env.ADMIN_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

adminSchema.methods.createRefreshToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username, isAdmin: true },
    process.env.ADMIN_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

adminSchema.methods.comparePassword = async function(candidatePassword) {
  const bcrypt = await import('bcryptjs');
  return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;