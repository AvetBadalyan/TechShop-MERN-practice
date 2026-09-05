// Fallback image shown when a product image is missing or fails to load
// (e.g. an uploaded file that no longer exists on the server).
export const FALLBACK_IMAGE = "/images/sample.jpg";

// Attach to an <img>/<Image> onError to swap in the placeholder once.
// The guard prevents an infinite loop if the fallback itself fails.
export const handleImageError = (e) => {
  if (e.target.src.endsWith(FALLBACK_IMAGE)) return;
  e.target.src = FALLBACK_IMAGE;
};
