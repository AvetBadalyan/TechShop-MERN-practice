import { z } from "zod";

// Used for both create and update. z.coerce.number handles values that arrive
// as strings from form inputs.
export const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  description: z.string().trim().min(1, "Description is required"),
  image: z.string().trim().min(1).optional(),
  brand: z.string().trim().min(1, "Brand is required"),
  category: z.string().trim().min(1, "Category is required"),
  countInStock: z.coerce.number().int().min(0, "Stock must be 0 or greater"),
});

export const reviewSchema = z.object({
  rating: z.coerce.number().min(1, "Rating is required").max(5),
  comment: z.string().trim().min(1, "Comment is required"),
});
