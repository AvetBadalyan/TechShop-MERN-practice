import rateLimit from "express-rate-limit";

// General limiter for all API routes: guards against abuse / scraping.
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // generous enough for normal browsing, still blocks abuse
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

// Stricter limiter for authentication endpoints (login / register) to slow
// down brute-force and credential-stuffing attempts.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 auth attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again later." },
});
