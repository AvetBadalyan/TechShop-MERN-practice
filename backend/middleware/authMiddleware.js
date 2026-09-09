import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  // Read JWT from the 'jwt' cookie
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // Only token verification failures (expired / tampered / bad signature)
    // are reported as "token failed" — this keeps the log message accurate.
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }

  req.user = await User.findById(decoded.userId).select("-password");

  // The token was valid but the user no longer exists (e.g. deleted, or the
  // database was reseeded). Treat this as unauthorized so the client logs out
  // cleanly instead of crashing on a null req.user downstream.
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, user not found");
  }

  next();
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { admin, protect };
