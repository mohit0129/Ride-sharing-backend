import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { UnauthenticatedError, ForbiddenError } from "../errors/index.js";

export const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Admin authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
    
    if (!payload.isAdmin) {
      throw new UnauthenticatedError("Admin authentication invalid");
    }
    
    const admin = await Admin.findById(payload.id);
    
    if (!admin) {
      throw new UnauthenticatedError("Admin not found");
    }
    
    // Add admin data to request
    req.admin = {
      id: admin._id,
      username: admin.username,
      isSuper: admin.isSuper,
      permissions: admin.permissions,
    };
    
    req.socket = req.io;
    
    next();
  } catch (error) {
    throw new UnauthenticatedError("Admin authentication invalid");
  }
};

// Middleware to check if admin has specific permission
export const hasPermission = (requiredPermission) => {
  return (req, res, next) => {
    const { permissions, isSuper } = req.admin;
    
    // Super admin has all permissions
    if (isSuper || permissions.includes('all') || permissions.includes(requiredPermission)) {
      return next();
    }
    
    throw new ForbiddenError(`Admin does not have permission: ${requiredPermission}`);
  };
};

export default adminAuth;