// // // // //models/User.js
// // // // import mongoose from 'mongoose';
// // // // import jwt from 'jsonwebtoken';

// // // // const { Schema } = mongoose;

// // // // const userSchema = new Schema(
// // // //   {
// // // //     role: {
// // // //       type: String,
// // // //       enum: ["customer", "rider"],
// // // //       required: true,
// // // //     },
// // // //     phone: {
// // // //       type: String,
// // // //       required: true,
// // // //       unique: true,
// // // //     },
// // // //   },
// // // //   {
// // // //     timestamps: true,
// // // //   }
// // // // );

// // // // userSchema.methods.createAccessToken = function () {
// // // //   return jwt.sign(
// // // //     {
// // // //       id: this._id,
// // // //       phone: this.phone,
// // // //     },
// // // //     process.env.ACCESS_TOKEN_SECRET,
// // // //     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
// // // //   );
// // // // };

// // // // userSchema.methods.createRefreshToken = function () {
// // // //   return jwt.sign(
// // // //     { id: this._id, phone: this.phone },
// // // //     process.env.REFRESH_TOKEN_SECRET,
// // // //     {
// // // //       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
// // // //     }
// // // //   );
// // // // };

// // // // const User = mongoose.model("User", userSchema);
// // // // export default User;


// // // //models/User.js
// // // import mongoose from 'mongoose';
// // // import jwt from 'jsonwebtoken';

// // // const { Schema } = mongoose;

// // // // Base schema with common fields for both customer and rider
// // // const userSchema = new Schema(
// // //   {
// // //     role: {
// // //       type: String,
// // //       enum: ["customer", "rider"],
// // //       required: true,
// // //     },
// // //     phone: {
// // //       type: String,
// // //       required: true,
// // //       unique: true,
// // //     },
// // //     firstName: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     lastName: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     email: {
// // //       type: String,
// // //       unique: true,
// // //       match: [
// // //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
// // //         'Please provide a valid email',
// // //       ],
// // //     },
// // //     birthDate: {
// // //       type: Date,
// // //       required: true,
// // //     },
// // //     status: {
// // //       type: String,
// // //       enum: ["active", "deleted"],
// // //       default: "active"
// // //     },
// // //     // Rider specific fields
// // //     vehicleDetails: {
// // //       type: {
// // //         vehicleType: {
// // //           type: String,
// // //           enum: ["bike", "car"],
// // //         },
// // //         manufacturer: {
// // //           type: String,
// // //         },
// // //         model: {
// // //           type: String,
// // //         },
// // //         modelYear: {
// // //           type: Number,
// // //         },
// // //         licensePlate: {
// // //           type: String,
// // //         },
// // //         color: {
// // //           type: String,
// // //         }
// // //       },
// // //       required: function() {
// // //         return this.role === "rider";
// // //       }
// // //     }
// // //   },
// // //   {
// // //     timestamps: true,
// // //   }
// // // );

// // // userSchema.methods.createAccessToken = function () {
// // //   return jwt.sign(
// // //     {
// // //       id: this._id,
// // //       phone: this.phone,
// // //       role: this.role,
// // //       status: this.status
// // //     },
// // //     process.env.ACCESS_TOKEN_SECRET,
// // //     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
// // //   );
// // // };

// // // userSchema.methods.createRefreshToken = function () {
// // //   return jwt.sign(
// // //     { 
// // //       id: this._id, 
// // //       phone: this.phone,
// // //       role: this.role,
// // //       status: this.status
// // //     },
// // //     process.env.REFRESH_TOKEN_SECRET,
// // //     {
// // //       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
// // //     }
// // //   );
// // // };

// // // const User = mongoose.model("User", userSchema);
// // // export default User;


// // //models/User.js
// // import mongoose from 'mongoose';
// // import jwt from 'jsonwebtoken';

// // const { Schema } = mongoose;

// // // Base schema with common fields for all users (customer, rider, and admin)
// // const userSchema = new Schema(
// //   {
// //     role: {
// //       type: String,
// //       enum: ["customer", "rider", "admin"],
// //       required: true,
// //     },
// //     phone: {
// //       type: String,
// //       required: function() {
// //         return this.role === "customer" || this.role === "rider";
// //       },
// //       // Remove the unique: true constraint here
// //     },
// //     firstName: {
// //       type: String,
// //       required: function() {
// //         return this.role === "customer" || this.role === "rider";
// //       },
// //     },
// //     lastName: {
// //       type: String,
// //       required: function() {
// //         return this.role === "customer" || this.role === "rider";
// //       },
// //     },
// //     email: {
// //       type: String,
// //       required: function() {
// //         return this.role === "admin";
// //       },
// //       // Remove the unique: true constraint here and handle uniqueness in compound index
// //       sparse: true,
// //       match: [
// //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
// //         'Please provide a valid email',
// //       ],
// //     },
// //     birthDate: {
// //       type: Date,
// //       required: function() {
// //         return this.role === "customer" || this.role === "rider";
// //       },
// //     },
// //     status: {
// //       type: String,
// //       enum: ["active", "deleted"],
// //       default: "active"
// //     },
// //     // Admin specific fields
// //     username: {
// //       type: String,
// //       required: function() {
// //         return this.role === "admin";
// //       },
// //       // Remove the unique: true constraint here and handle in compound index
// //     },
// //     password: {
// //       type: String,
// //       required: function() {
// //         return this.role === "admin";
// //       },
// //     },
// //     isSuper: {
// //       type: Boolean,
// //       default: false
// //     },
// //     permissions: {
// //       type: [String],
// //       default: ['view']
// //     },
// //     // Rider specific fields
// //     vehicleDetails: {
// //       type: {
// //         vehicleType: {
// //           type: String,
// //           enum: ["bike", "car"],
// //         },
// //         manufacturer: {
// //           type: String,
// //         },
// //         model: {
// //           type: String,
// //         },
// //         modelYear: {
// //           type: Number,
// //         },
// //         licensePlate: {
// //           type: String,
// //         },
// //         color: {
// //           type: String,
// //         }
// //       },
// //       required: function() {
// //         return this.role === "rider";
// //       }
// //     }
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // // Create compound indexes for uniqueness that are role-specific
// // userSchema.index({ phone: 1, role: 1 }, { 
// //   unique: true, 
// //   // Only apply unique constraint when role is customer or rider and phone exists
// //   partialFilterExpression: { 
// //     role: { $in: ["customer", "rider"] }, 
// //     phone: { $exists: true }
// //   }
// // });

// // userSchema.index({ email: 1, role: 1 }, { 
// //   unique: true, 
// //   sparse: true, // Allow null/undefined values
// //   partialFilterExpression: { email: { $exists: true } }
// // });

// // userSchema.index({ username: 1 }, { 
// //   unique: true, 
// //   // Only apply unique constraint when role is admin and username exists
// //   partialFilterExpression: { 
// //     role: "admin", 
// //     username: { $exists: true }
// //   }
// // });

// // // Hash password before saving for admin users
// // userSchema.pre('save', async function() {
// //   if (this.role === 'admin' && this.isModified('password')) {
// //     const bcrypt = await import('bcryptjs');
// //     this.password = await bcrypt.hash(this.password, 10);
// //   }
// // });

// // userSchema.methods.createAccessToken = function () {
// //   const payload = {
// //     id: this._id,
// //     role: this.role,
// //     status: this.status
// //   };
  
// //   // Add role-specific fields to token payload
// //   if (this.role === 'admin') {
// //     payload.username = this.username;
// //     payload.isAdmin = true;
// //     payload.isSuper = this.isSuper;
// //     return jwt.sign(
// //       payload,
// //       process.env.ADMIN_TOKEN_SECRET,
// //       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
// //     );
// //   } else {
// //     payload.phone = this.phone;
// //     return jwt.sign(
// //       payload,
// //       process.env.ACCESS_TOKEN_SECRET,
// //       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
// //     );
// //   }
// // };

// // userSchema.methods.createRefreshToken = function () {
// //   const payload = {
// //     id: this._id,
// //     role: this.role,
// //     status: this.status
// //   };
  
// //   // Add role-specific fields to token payload
// //   if (this.role === 'admin') {
// //     payload.username = this.username;
// //     payload.isAdmin = true;
// //     return jwt.sign(
// //       payload,
// //       process.env.ADMIN_TOKEN_SECRET,
// //       { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
// //     );
// //   } else {
// //     payload.phone = this.phone;
// //     return jwt.sign(
// //       payload,
// //       process.env.REFRESH_TOKEN_SECRET,
// //       { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
// //     );
// //   }
// // };

// // userSchema.methods.comparePassword = async function(candidatePassword) {
// //   if (this.role === 'admin' && this.password) {
// //     const bcrypt = await import('bcryptjs');
// //     return await bcrypt.compare(candidatePassword, this.password);
// //   }
// //   return false;
// // };

// // const User = mongoose.model("User", userSchema);
// // export default User;

// //models/User.js
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// const { Schema } = mongoose;

// // User schema for customers and riders
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
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       sparse: true,
//       match: [
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//         'Please provide a valid email',
//       ],
//     },
//     birthDate: {
//       type: Date,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["active", "deleted"],
//       default: "active"
//     },
//     // Rider specific fields
//     vehicleDetails: {
//       type: {
//         vehicleType: {
//           type: String,
//           enum: ["bike", "car"],
//         },
//         manufacturer: {
//           type: String,
//         },
//         model: {
//           type: String,
//         },
//         modelYear: {
//           type: Number,
//         },
//         licensePlate: {
//           type: String,
//         },
//         color: {
//           type: String,
//         }
//       },
//       required: function() {
//         return this.role === "rider";
//       }
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// // Create index for phone uniqueness
// userSchema.index({ phone: 1 }, { unique: true });

// userSchema.methods.createAccessToken = function () {
//   return jwt.sign(
//     {
//       id: this._id,
//       phone: this.phone,
//       role: this.role,
//       status: this.status
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//   );
// };

// userSchema.methods.createRefreshToken = function () {
//   return jwt.sign(
//     {
//       id: this._id,
//       phone: this.phone,
//       role: this.role,
//       status: this.status
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//   );
// };

// const User = mongoose.model("User", userSchema);
// export default User;

//models/User.js
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

// Unified User schema for all user types (customers, riders, and admins)
const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["customer", "rider", "admin"],
      required: true,
    },
    // Fields used conditionally based on role
    phone: {
      type: String,
      required: true, // Now required for all user types
      sparse: true,
    },
    firstName: {
      type: String,
      required: function() {
        return this.role === "customer" || this.role === "rider";
      },
    },
    lastName: {
      type: String,
      required: function() {
        return this.role === "customer" || this.role === "rider";
      },
    },
    birthDate: {
      type: Date,
      required: function() {
        return this.role === "customer" || this.role === "rider";
      },
    },
    // Admin-specific fields
    username: {
      type: String,
      required: function() {
        return this.role === "admin";
      },
      sparse: true,
    },
    password: {
      type: String,
      required: function() {
        return this.role === "admin";
      },
    },
    isSuper: {
      type: Boolean,
      default: false,
    },
    permissions: {
      type: [String],
      default: ['view'],
    },
    // Common fields
    email: {
      type: String,
      required: false, // Now optional for all users including admins
      sparse: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active"
    },
    // Rider-specific fields
    vehicleDetails: {
      type: {
        vehicleType: {
          type: String,
          enum: ["bike", "car", "cab economy", "auto"],
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

// Create role-specific unique indexes
userSchema.index(
  { phone: 1 }, 
  { 
    unique: true, 
    sparse: true,
    partialFilterExpression: { 
      phone: { $exists: true }
    }
  }
);

userSchema.index(
  { username: 1 }, 
  { 
    unique: true,
    sparse: true,
    partialFilterExpression: { 
      role: "admin",
      username: { $exists: true }
    }
  }
);

userSchema.index(
  { email: 1, role: 1 }, 
  { 
    unique: true,
    sparse: true,
    partialFilterExpression: { 
      email: { $exists: true }
    }
  }
);

// Hash password before saving for admin users
userSchema.pre('save', async function() {
  if (this.role === 'admin' && this.isModified('password')) {
    const bcrypt = await import('bcryptjs');
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.createAccessToken = function () {
  const payload = {
    id: this._id,
    role: this.role,
    status: this.status,
    phone: this.phone // Always include phone in token payload
  };
  
  if (this.role === 'admin') {
    payload.username = this.username;
    payload.isAdmin = true;
    payload.isSuper = this.isSuper;
    
    return jwt.sign(
      payload,
      process.env.ADMIN_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
  } else {
    return jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
  }
};

userSchema.methods.createRefreshToken = function () {
  const payload = {
    id: this._id,
    role: this.role,
    status: this.status,
    phone: this.phone // Always include phone in refresh token payload
  };
  
  if (this.role === 'admin') {
    payload.username = this.username;
    payload.isAdmin = true;
    
    return jwt.sign(
      payload,
      process.env.ADMIN_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
  } else {
    return jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
  }
};

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.role === 'admin' && this.password) {
    const bcrypt = await import('bcryptjs');
    return await bcrypt.compare(candidatePassword, this.password);
  }
  return false;
};

const User = mongoose.model("User", userSchema);
export default User;