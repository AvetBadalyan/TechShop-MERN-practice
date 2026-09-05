import { z } from "zod";

// Cart items carry full product fields plus `quantity`. The backend re-fetches
// the authoritative price from the DB, so we only strictly validate the fields
// the controller relies on and allow the rest to pass through (passthrough).
const orderItemSchema = z
  .object({
    _id: z.string().min(1, "Order item id is required"),
    quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  })
  .passthrough();

const shippingAddressSchema = z.object({
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  postalCode: z.coerce.string().trim().min(1, "Postal code is required"),
  country: z.string().trim().min(1, "Country is required"),
});

export const createOrderSchema = z.object({
  orderItems: z.array(orderItemSchema).min(1, "No order items"),
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.string().trim().min(1, "Payment method is required"),
});
