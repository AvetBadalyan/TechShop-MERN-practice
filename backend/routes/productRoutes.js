import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getCategories,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";
import demoGuard from "../middleware/demoGuard.js";
import validate from "../middleware/validate.js";
import {
  productSchema,
  reviewSchema,
} from "../validators/productValidators.js";
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, demoGuard, validate(productSchema), createProduct);
router.get("/top", getTopProducts);
router.get("/categories", getCategories);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(
    protect,
    admin,
    demoGuard,
    checkObjectId,
    validate(productSchema),
    updateProduct
  )
  .delete(protect, admin, demoGuard, checkObjectId, deleteProduct);
router
  .route("/:id/reviews")
  .post(protect, checkObjectId, validate(reviewSchema), createProductReview);

export default router;
