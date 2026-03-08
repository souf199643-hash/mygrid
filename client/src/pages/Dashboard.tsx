import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ShieldAlert, Activity, Loader2, Play, Square, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [isBotRunning, setIsBotRunning] = useState(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [profit, setProfit] = useState(0.00);

  // محاكاة جلب السعر المباشر (سنربطه ببايننس لاحقاً)
  useEffect(() => {
    const interval = setInterval(() => {
      setEthPrice(4000 + Math.random() * 50); // سعر افتراضي للتجربة
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // وظيفة تشغيل بوت سفيان (200$ + 100$)
  const handleStartBot = () => {
    setIsBotRunning(true);
    toast({
      title: "تم تفعيل خوارزمية سفيان",
      description: "جاري شراء الأمان بـ 200$ وتجهيز شبكة الـ 100$",
      variant: "default",
    });
    // هنا نرسل الأمر للسيرفر للتداول الحقيقي
  };

  const handleStopBot = () => {
    setIsBotRunning(false);
    toast({
      title: "تم إيقاف البوت",
      description: "تم تعليق كافة العمليات الآلية",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white p-4 md:p-8 font-sans" dir="rtl">
      {/* الهيدر */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-yellow-500/20 rounded-2xl">
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black">بوت سفيان للتداول الآلي</h1>
            <p className="text-gray-400 text-xs uppercase tracking-widest">Binance Smart Engine</p>
          </div>
        </div>
        
        <div className="bg-gray-800/50 px-6 py-3 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-[10px] mb-1">سعر ETH الحالي</p>
          <p className="text-xl font-mono font-bold text-yellow-500">${ethPrice.toFixed(2)}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* لوحة التحكم الجانبية */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-gray-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-yellow-500" />
              حالة البوت
            </h2>
            
            <div className="space-y-4">
              <Button 
                onClick={handleStartBot}
                disabled={isBotRunning}
                className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-black rounded-2xl gap-2 shadow-lg shadow-yellow-500/10"
              >
                <Play className="w-5 h-5 fill-current" />
                تشغيل الخوارزمية
              </Button>
              
              <Button 
                onClick={handleStopBot}
                disabled={!isBotRunning}
                variant="outline"
                className="w-full h-14 border-white/10 hover:bg-red-500/10 hover:text-red-500 font-bold rounded-2xl gap-2"
              >
                <Square className="w-5 h-5 fill-current" />
                إيقاف مؤقت
              </Button>
            </div>
          </section>
        </div>

        {/* لوحة الأرباح والشبكة */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-gray-400 text-sm mb-2">إجمالي الأرباح (Realized)</p>
                 <h3 className="text-4xl font-black text-green-400">${profit.toFixed(2)}</h3>
               </div>
               <TrendingUp className="absolute -bottom-4 -left-4 w-32 h-32 text-green-500/5" />
            </div>

            <div className="bg-gray-900/50 p-8 rounded-3xl border border-white/5">
               <p className="text-gray-400 text-sm mb-2">توزيع المحفظة</p>
               <div className="space-y-4">
                 <div className="flex justify-between items-center">
                   <span className="text-sm">صفقة الأمان</span>
                   <span className="font-bold">$200.00</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-yellow-500/80">مستوى الشبكة الحالي</span>
                   <span className="font-bold text-yellow-500">$100.00</span>
                 </div>
               </div>
            </div>
          </div>

          <section className="bg-gray-900/50 border border-white/5 rounded-3xl p-8 min-h-[300px]">
            <h3 className="text-xl font-bold mb-6">سجل العمليات الآلية</h3>
            {!isBotRunning ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                <Activity className="w-12 h-12 mb-4 opacity-20" />
                <p>البوت في حالة انتظار.. اضغط تشغيل للبدء</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center animate-pulse">
                  <span className="text-green-500 font-bold text-sm">شراء (أمان)</span>
                  <span className="text-xs font-mono">ETH @ {ethPrice.toFixed(2)} | $200</span>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
