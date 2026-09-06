import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";
import sanitize from "./middleware/sanitize.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// Connect on module load. connectDB caches the connection so repeated
// serverless invocations reuse the same one instead of reconnecting.
connectDB();

const app = express();

// --- Security middleware ---
// Secure HTTP response headers. crossOriginResourcePolicy is relaxed so
// Cloudinary images can be embedded, and CSP is disabled to avoid blocking
// the PayPal SDK script.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Allow the frontend origin(s) to call the API with credentials (cookies).
// CLIENT_URL can be a comma-separated list of allowed origins.
const allowedOrigins = process.env.CLIENT_URL?.split(",").map((o) => o.trim());
app.use(
  cors({
    origin: allowedOrigins?.length ? allowedOrigins : true,
    credentials: true,
  })
);

// Body parsers (before sanitization so req.body is populated)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Strip keys containing "$" or "." to block NoSQL operator injection.
app.use(sanitize);

// Throttle API traffic as a baseline against abuse.
app.use("/api", apiLimiter);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Simple health check for uptime monitoring / warm-up pings.
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use(notFound);
app.use(errorHandler);

export default app;
