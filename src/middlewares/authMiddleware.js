import jwt from "jsonwebtoken";
import BlacklistedToken from "../Models/blacklistedTokenModel.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const blacklisted = await BlacklistedToken.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: "Token has been revoked" });
    }

    req.user = {
      barberId: decoded.barberId,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const blacklisted = await BlacklistedToken.findOne({ token });
      if (blacklisted) {
        return res.status(401).json({ message: "Token has been revoked" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
      }

      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Access forbidden: Admins only" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
