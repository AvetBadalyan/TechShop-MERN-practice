import express from "express";
import multer from "multer";
import path from "path";
import streamifier from "streamifier";
import getCloudinary from "../config/cloudinary.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import demoGuard from "../middleware/demoGuard.js";

const router = express.Router();

// Keep the file in memory (no disk) so it works on serverless hosts, then
// stream the buffer straight to Cloudinary.
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});
const uploadSingleImage = upload.single("image");

// Upload a buffer to Cloudinary and resolve with the secure URL.
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = getCloudinary().uploader.upload_stream(
      { folder: "techshop" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

router.post("/", protect, admin, demoGuard, (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      const message =
        err.code === "LIMIT_FILE_SIZE"
          ? "Image must be less than 5 MB"
          : err.message;
      return res.status(400).send({ message });
    }

    if (!req.file) {
      return res.status(400).send({ message: "No image uploaded" });
    }

    try {
      const result = await uploadToCloudinary(req.file.buffer);
      res.status(200).send({
        message: "Image uploaded successfully",
        image: result.secure_url,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: `Image upload failed: ${error.message}` });
    }
  });
});

export default router;
