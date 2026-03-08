import type { Express } from "express";
import { createServer, type Server } from "http";
import Binance from 'node-binance-api';

export async function registerRoutes(app: Express): Promise<Server> {
  
  // رابط استقبال أمر التشغيل من الواجهة
  app.post("/api/bot/launch", async (req, res) => {
    const { apiKey, apiSecret } = req.body;
    
    const binance = new Binance().options({
      APIKEY: apiKey,
      APISECRET: apiSecret,
      family: 4 // لضمان استقرار الاتصال
    });

    try {
      // 1. جلب السعر المباشر الآن
      const ticker = await binance.prices('ETHUSDT');
      const currentPrice = parseFloat(ticker.ETHUSDT);

      // 2. تنفيذ صفقة الأمان (200$) ماركت
      const anchorQty = (200 / currentPrice).toFixed(4);
      await binance.marketBuy("ETHUSDT", anchorQty);

      // 3. حساب أول مستوى شبكة تحت السعر الحالي
      const gridLevel = Math.floor(currentPrice / 20) * 20;
      const gridQty = (100 / gridLevel).toFixed(4);

      // 4. وضع أمر شراء ليميت (100$) عند مستوى الشبكة
      await binance.buy("ETHUSDT", gridQty, gridLevel);
      
      // 5. وضع أمر بيع ليميت (بربح 20$)
      await binance.sell("ETHUSDT", gridQty, (gridLevel + 20));

      res.json({ 
        success: true, 
        message: "تم شراء الأمان ووضع أوامر الشبكة بنجاح",
        data: { anchorQty, gridLevel }
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "فشل في تنفيذ العمليات: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
