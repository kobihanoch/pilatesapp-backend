import jwt from "jsonwebtoken";
import BlacklistedToken from "../models/blacklistedTokenModel.js";
import User from "../models/userModel.js";

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ message: "Access forbidden: Insufficient role" });
    }
    next();
  };
};
