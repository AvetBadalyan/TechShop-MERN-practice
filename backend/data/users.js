import bcrypt from "bcryptjs";

// Returns the users array at call-time so process.env is read AFTER
// dotenv.config() has run in seeder.js. If this were a top-level constant,
// ES module hoisting would evaluate it before dotenv runs, causing the owner
// credentials to fall back to the placeholder defaults.
const getUsers = () => {
  const ownerEmail = process.env.OWNER_ADMIN_EMAIL || "owner@example.com";
  const ownerPassword = process.env.OWNER_ADMIN_PASSWORD || "changeme";

  return [
    {
      // Full admin for real management (owner account).
      name: "Avet Badalyan",
      email: ownerEmail,
      password: bcrypt.hashSync(ownerPassword, 10),
      isAdmin: true,
    },
    {
      // Read-only demo admin — can view admin screens but not modify data.
      // Blocked from write operations by the demoGuard middleware.
      name: "Demo Admin",
      email: process.env.DEMO_ADMIN_EMAIL || "avet@gmail.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: true,
    },
    {
      name: "user 1",
      email: "user1@email.com",
      password: bcrypt.hashSync("123456", 10),
    },
    {
      name: "user 2",
      email: "user2@email.com",
      password: bcrypt.hashSync("123456", 10),
    },
  ];
};

export default getUsers;
