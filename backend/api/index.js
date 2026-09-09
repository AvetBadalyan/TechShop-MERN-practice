// Vercel serverless entry point for the backend service.
//
// Vercel treats files under this service's `api/` directory as functions and
// invokes the default export with (req, res) — an Express app is already that
// shape, so the whole API runs as a single function.
//
// The app deliberately does not call listen(); the platform owns the socket.
import app from "../app.js";

export default app;
