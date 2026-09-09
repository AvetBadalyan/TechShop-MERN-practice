import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";

// Single source of truth for token lifetime.
// Used in both jwt.sign (expiresIn) and the cookie maxAge so the two
// never silently drift apart.
const JWT_EXPIRES_MS = 24 * 60 * 60 * 1000; // 1 day

// Cookie options shared by set (generateToken) and clear (logout) so the
// browser treats them as the same cookie.
// In production the frontend and API are on different domains, so the cookie
// must be SameSite=None + Secure to be sent cross-site. Locally we use Lax.
export const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
};

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_MS / 1000, // jwt expects seconds
  });

  res.cookie("jwt", token, {
    ...cookieOptions,
    maxAge: JWT_EXPIRES_MS,
  });
};

export default generateToken;
