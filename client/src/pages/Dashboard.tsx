import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Play, Square, ShieldCheck, Wallet, ArrowDownCircle, Activity, Settings, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function SoufianeDashboard() {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [ethPrice, setEthPrice] = useState(3850.20); // سعر تجريبي
  
  // تأثير بصري لتحديث السعر (Simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setEthPrice(prev => prev + (Math.random() * 2 - 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050608] text-white font-sans selection:bg-yellow-500/30 p-4 md:p-8" dir="rtl">
      
      {/* 1. الهيدر (العنوان والحالة) */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Zap className="text-black w-7 h-7 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase">SOUFIANE <span className="text-yellow-500">QUANT</span></h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em]">TRADING INTERFACE</p>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase">ETH/USDT</p>
            <p className="text-lg font-mono font-bold text-yellow-500">${ethPrice.toFixed(2)}</p>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs font-bold uppercase">{isRunning ? 'Active' : 'Offline'}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 2. لوحة التحكم (Control Center) */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-[#0b0d11] border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[50px] rounded-full" />
            
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-yellow-500" /> إعدادات البوت
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 mr-2">Binance API Key</label>
                <Input className="bg-black/40 border-white/10 h-12 text-center font-mono text-sm focus:border-yellow-500/50 transition-all" placeholder="****************" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 mr-2">Secret Key</label>
                <Input type="password" className="bg-black/40 border-white/10 h-12 text-center font-mono text-sm focus:border-yellow-500/50 transition-all" placeholder="****************" />
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => {setIsRunning(true); toast({title: "تم البدء", description: "جاري تنفيذ خوارزمية 200/100$"})}}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-black h-14 rounded-2xl shadow-lg shadow-yellow-500/10"
                >
                  <Play className="ml-2 w-4 h-4 fill-current" /> تشغيل
                </Button>
                <Button 
                  onClick={() => setIsRunning(false)}
                  variant="outline"
                  className="border-white/10 h-14 rounded-2xl font-bold hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  <Square className="ml-2 w-4 h-4 fill-current" /> إيقاف
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* 3. لوحة البيانات (Stats & Grid Display) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* بطاقة الأرباح */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 p-8 rounded-[2rem]">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm italic">الربح الصافي المحقق</p>
                <TrendingUp className="text-yellow-500 w-6 h-6 opacity-40" />
              </div>
              <h3 className="text-5xl font-black text-white font-mono">$0.00</h3>
              <p className="text-[10px] text-green-400 mt-2 font-bold tracking-widest">+0.00% اليوم</p>
            </div>

            {/* بطاقة حالة المحفظة */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm italic">المحفظة النشطة</p>
                <Wallet className="text-blue-400 w-6 h-6 opacity-40" />
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500 text-xs">صفقة الأمان:</span>
                   <span className="font-bold">$200.00</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500 text-xs">عقد الشبكة:</span>
                   <span className="font-bold text-yellow-500">$100.00</span>
                 </div>
              </div>
            </div>
          </div>

          {/* عرض مستويات الشبكة (The Grid Display) */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem] relative overflow-hidden">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-yellow-500" /> مستويات الشبكة (20$)
            </h3>
            
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <ArrowDownCircle className="text-gray-600 w-5 h-5" />
                    <span className="text-sm text-gray-400 font-mono italic">مستوى الشراء -{i*20}$</span>
                  </div>
                  <span className="font-mono font-bold text-gray-500">
                    ${(Math.floor(ethPrice / 20) * 20 - (i-1)*20).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/10 text-center">
               <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest leading-loose">
                 البوت مبرمج لشراء كمية ثابتة بقيمة 100$ عند كل مستوى وبيعها عند الارتفاع بـ 20$
               </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
