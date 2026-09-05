import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import path from "path";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";
import sanitize from "./middleware/sanitize.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// --- Security middleware ---
// Set secure HTTP response headers. crossOriginResourcePolicy is relaxed so
// Cloudinary images can be embedded, and CSP is left to the platform to
// avoid blocking the PayPal SDK script.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Allow the frontend origin to call the API with credentials (cookies).
// In production the frontend is served from the same origin, so CLIENT_URL
// is optional; it matters when the client is hosted separately.
app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);

// Body parsers (must run before sanitization so req.body is populated)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Strip keys containing "$" or "." from req.body/params/query to block
// NoSQL (MongoDB operator) injection, e.g. in the product keyword search.
app.use(sanitize);

// Throttle all API traffic as a baseline against abuse.
app.use("/api", apiLimiter);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Express 5 uses path-to-regexp v8: a bare "*" is invalid, so we use a
  // named wildcard to serve the SPA for any non-API route.
  app.get("/*splat", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
