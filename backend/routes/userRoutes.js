import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";
import { authLimiter } from "../middleware/rateLimitMiddleware.js";
import validate from "../middleware/validate.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
  updateUserSchema,
} from "../validators/userValidators.js";

const router = express.Router();

router
  .route("/")
  .post(authLimiter, validate(registerSchema), registerUser)
  .get(protect, admin, getUsers);
router.post("/auth", authLimiter, validate(loginSchema), authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, validate(updateProfileSchema), updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, checkObjectId, deleteUser)
  .get(protect, admin, checkObjectId, getUserById)
  .put(protect, admin, checkObjectId, validate(updateUserSchema), updateUser);

export default router;
