import bcrypt from "bcryptjs";

// Owner (full admin) credentials come from env so the real password isn't
// committed. Falls back to placeholders if the vars aren't set.
const ownerEmail = process.env.OWNER_ADMIN_EMAIL || "owner@example.com";
const ownerPassword = process.env.OWNER_ADMIN_PASSWORD || "changeme";

const users = [
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
    email: "avet@gmail.com",
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

export default users;
