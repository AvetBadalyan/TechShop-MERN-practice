import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";
import validate from "../middleware/validate.js";
import { createOrderSchema } from "../validators/orderValidators.js";
const router = express.Router();

router
  .route("/")
  .post(protect, validate(createOrderSchema), addOrderItems)
  .get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, checkObjectId, getOrderById);
router.route("/:id/pay").put(protect, checkObjectId, updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(protect, admin, checkObjectId, updateOrderToDelivered);

export default router;
