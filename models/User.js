// //models/User.js
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//     role: {
//       type: String,
//       enum: ["customer", "rider"],
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// userSchema.methods.createAccessToken = function () {
//   return jwt.sign(
//     {
//       id: this._id,
//       phone: this.phone,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//   );
// };

// userSchema.methods.createRefreshToken = function () {
//   return jwt.sign(
//     { id: this._id, phone: this.phone },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

// const User = mongoose.model("User", userSchema);
// export default User;

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

// Base schema with common fields for both customer and rider
const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["customer", "rider"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    birthDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active"
    },
    // Rider specific fields
    vehicleDetails: {
      type: {
        vehicleType: {
          type: String,
          enum: ["bike", "car"],
        },
        manufacturer: {
          type: String,
        },
        model: {
          type: String,
        },
        modelYear: {
          type: Number,
        },
        licensePlate: {
          type: String,
        },
        color: {
          type: String,
        }
      },
      required: function() {
        return this.role === "rider";
      }
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.createAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      phone: this.phone,
      role: this.role,
      status: this.status
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.createRefreshToken = function () {
  return jwt.sign(
    { 
      id: this._id, 
      phone: this.phone,
      role: this.role,
      status: this.status
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
export default User;