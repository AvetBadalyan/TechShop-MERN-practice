import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin Avet",
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
