import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";
import validate from "../middleware/validate.js";
import {
  productSchema,
  reviewSchema,
} from "../validators/productValidators.js";
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, validate(productSchema), createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, validate(productSchema), updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
router
  .route("/:id/reviews")
  .post(protect, checkObjectId, validate(reviewSchema), createProductReview);

export default router;
