import { v2 as cloudinary } from "cloudinary";

// Configure lazily on first use. ES module imports run before server.js calls
// dotenv.config(), so reading process.env at import time would be undefined.
let configured = false;

const getCloudinary = () => {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    configured = true;
  }
  return cloudinary;
};

export default getCloudinary;
