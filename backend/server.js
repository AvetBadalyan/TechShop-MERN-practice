// Local development entry point. On Vercel the app is invoked as a serverless
// function (see api/index.js) and this file is not used.
import app from "./app.js";

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
