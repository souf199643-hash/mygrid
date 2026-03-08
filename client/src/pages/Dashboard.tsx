import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square, TrendingUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [price, setPrice] = useState("3857.58"); // السعر الذي ظهر في صورتك
  const [status, setStatus] = useState("OFFLINE");

  const startBot = async () => {
    const res = await fetch("/api/bot/start", { method: "POST" });
    if (res.ok) setStatus("ACTIVE");
  };

  return (
    <div className="min-h-screen bg-black text-yellow-500 p-6 font-sans">
      <header className="flex justify-between items-center mb-8 border-b border-yellow-900 pb-4">
        <h1 className="text-3xl font-bold tracking-tighter text-yellow-400">SOUFIANE QUANT</h1>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${status === "ACTIVE" ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
          <span className="text-sm font-mono">{status}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* بطاقة السعر المباشر */}
        <Card className="bg-zinc-900 border-yellow-600 shadow-lg shadow-yellow-900/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <TrendingUp className="text-yellow-400" />
              <span className="text-xs text-zinc-500 font-mono italic">ETH/USDT</span>
            </div>
            <div className="mt-4 text-4xl font-black text-white">${price}</div>
          </CardContent>
        </Card>

        {/* لوحة التحكم */}
        <Card className="bg-zinc-900 border-yellow-600">
          <CardContent className="p-6 flex gap-4">
            <Button 
              onClick={startBot}
              className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-6"
            >
              <Play className="mr-2 fill-current" /> تشغيل (Grid 200/100)
            </Button>
            <Button 
              onClick={() => setStatus("OFFLINE")}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-yellow-500 font-bold py-6 border border-yellow-900"
            >
              <Square className="mr-2 fill-current" /> إيقاف
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
