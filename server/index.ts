import express from "express";
import { registerRoutes } from "./routes"; 
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  // تسجيل المسارات (أوامر البيع والشراء)
  const server = await registerRoutes(app);

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`البوت انطلق بنجاح يا سفيان على المنفذ ${PORT}`);
  });
})();
