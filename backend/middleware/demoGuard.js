// Blocks write operations for the read-only demo admin account, so anyone
// can explore the admin area in the live demo without changing the database.
// The real owner admin is unaffected.
const demoGuard = (req, res, next) => {
  // Read inside the function so .env has already been loaded.
  const demoEmail = process.env.DEMO_ADMIN_EMAIL || "avet@gmail.com";
  if (req.user?.email === demoEmail) {
    res.status(403);
    throw new Error("This is a read-only demo account. Changes are disabled.");
  }
  next();
};

export default demoGuard;
