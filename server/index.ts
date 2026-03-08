import express from "express";
import { registerRoutes } from "./routes"; // تأكد من وجود ملف routes.ts بجانبه
import { setupVite, serveStatic } from "./vite";
import path from "path";

const app = express();
app.use(express.json());

(async () => {
  // تسجيل مسارات البوت (الخوارزمية)
  const server = await registerRoutes(app);

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = Number(process.env.PORT) || 5000;
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`المحرك يعمل على المنفذ ${PORT}`);
  });
})();
