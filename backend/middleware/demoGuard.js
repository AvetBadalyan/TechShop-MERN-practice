// Blocks write operations for the read-only demo admin account, so anyone
// can explore the admin area in the live demo without changing the database.
// The real owner admin is unaffected.
const DEMO_EMAIL = process.env.DEMO_ADMIN_EMAIL || "avet@gmail.com";

const demoGuard = (req, res, next) => {
  if (req.user?.email === DEMO_EMAIL) {
    res.status(403);
    throw new Error("This is a read-only demo account. Changes are disabled.");
  }
  next();
};

export default demoGuard;
