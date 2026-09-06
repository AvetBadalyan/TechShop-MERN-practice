import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";

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
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    ...cookieOptions,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default generateToken;
