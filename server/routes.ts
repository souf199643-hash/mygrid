
import type { Express } from "express";
import { createServer, type Server } from "http";
import Binance from "node-binance-api";

const binance = new Binance().options({
  APIKEY: 'مفتاح_الـ_API_الخاص_بك',
  APISECRET: 'المفتاح_السري_الخاص_بك'
});

export async function registerRoutes(app: Express): Promise<Server> {
  // جلب الرصيد للواجهة الذهبية
  app.get("/api/balances", async (req, res) => {
    binance.balance((error, balances) => {
      if (error) return res.status(500).json(error);
      res.json(balances);
    });
  });

  // تنفيذ استراتيجية الـ 200$ والـ 100$
  app.post("/api/bot/start", async (req, res) => {
    // 1. شراء فوري (Market Order) بـ 200$
    // 2. وضع أوامر شراء (Limit Orders) بـ 100$ كل 20$ هبوط
    console.log("انطلق البوت يا سفيان!");
    res.json({ status: "ACTIVE" });
  });

  return createServer(app);
}
