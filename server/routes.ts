// import { HttpsProxyAgent } from 'https-proxy-agent'; //
import type { Express } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import fetch from "node-fetch";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.binance.getBalance.path, async (req, res) => {
    try {
      const { apiKey, apiSecret, isTestnet } = api.binance.getBalance.input.parse(req.body);
      
      const baseUrl = isTestnet 
        ? "https://testnet.binance.vision" 
        : "https://api.binance.com";
        
      const endpoint = "/api/v3/account";
      const timestamp = Date.now();
      const queryString = `timestamp=${timestamp}`;
      
      // Calculate HMAC SHA256 signature
      const signature = crypto
        .createHmac("sha256", apiSecret)
        .update(queryString)
        .digest("hex");
        
      const url = `${baseUrl}${endpoint}?${queryString}&signature=${signature}`;
      
      // أضف تعريف الوكيل قبل الـ fetch مباشرة
     // const agent = new HttpsProxyAgent('http://161.35.70.242:8080'); //

      const response = await fetch(url, {
          method: "GET",
          headers: {
              "X-MBX-APIKEY": apiKey,
              "Content-Type": "application/json"
          },
          // هذا هو السطر الأهم الذي سيحل مشكلة الموقع المحظور
      });

      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.msg || "Failed to fetch balance from Binance");
      }
      
      // Filter out only assets with balance > 0
      const balances = (data.balances || []).filter((b: any) => 
        parseFloat(b.free) > 0 || parseFloat(b.locked) > 0
      );
      
      res.status(200).json(balances);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      
      console.error("Binance API Error:", err);
      res.status(500).json({
        message: err instanceof Error ? err.message : "Internal Server Error"
      });
    }
  });

  return httpServer;
}
