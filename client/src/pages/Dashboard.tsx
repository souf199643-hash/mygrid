import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, KeyRound, Lock, ShieldAlert, Wallet, Zap, Loader2, ArrowLeft } from "lucide-react";

import { binanceCredentialsSchema, type BinanceCredentials } from "@shared/schema";
import { useGetBalance } from "@/hooks/use-binance";
import { BalanceCard } from "@/components/BalanceCard";
import { useToast } from "@/hooks/use-toast"; // أضفنا التنبيهات

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { toast } = useToast();
  const { mutate: getBalance, isPending, data: balances } = useGetBalance();
  
  // 1. إضافة متغير لحفظ العملة المختارة
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  
  const activeBalances = balances?.filter(b => parseFloat(b.free) > 0 || parseFloat(b.locked) > 0) || [];

  const form = useForm<BinanceCredentials>({
    resolver: zodResolver(binanceCredentialsSchema),
    defaultValues: {
      apiKey: "TVzTM0ITQYQHS7winUWBSSX1TSM91SDOmwKH5YXB8I2sYlyN52A4LJahajPTXc3C",
      apiSecret: "apNROw9k54ERO9s6s4XfYMGzfldP5MFKt2nmTRuuCrFr9scqThIFLNUR1aQG0DYt",
      isTestnet: true,
    },
  });

  function onSubmit(data: BinanceCredentials) {
    getBalance(data);
  }

  // 2. دالة التعامل مع الضغط على العملة
  const handleSelectAsset = (asset: string) => {
    setSelectedAsset(asset);
    toast({
      title: "تم اختيار العملة",
      description: `لقد اخترت تداول عملة ${asset} مقابل USDT`,
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/20">
      <div className="absolute top-0 left-1/4 w-[1000px] h-[500px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] bg-primary/5 rounded-[100%] blur-[150px] pointer-events-none translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 text-right"> 
        <header className="mb-12 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 font-medium text-sm">
              <Zap className="w-4 h-4 fill-primary/50" />
              <span>واجهة متقدمة</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gradient mb-4">
               {selectedAsset ? `تداول ${selectedAsset}` : "محفظة بينانس"}
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* قسم النموذج */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5 justify-end">
                <div className="text-right">
                  <h2 className="text-xl font-bold">بيانات الاتصال</h2>
                  <p className="text-sm text-muted-foreground">أدخل المفاتيح الخاصة بك</p>
                </div>
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <ShieldAlert className="w-6 h-6" />
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* ... (نفس حقول الـ Input التي في كودك الأصلي) ... */}
                  <FormField control={form.control} name="apiKey" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 mb-2 justify-end">
                        مفتاح API
                        <KeyRound className="w-4 h-4" />
                      </FormLabel>
                      <FormControl><Input className="text-right font-sans" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  {/* ... (بقية الحقول) ... */}
                  <Button type="submit" className="w-full h-14 rounded-xl font-bold" disabled={isPending}>
                    {isPending ? "جاري جلب الرصيد..." : "جلب الرصيد"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>

          {/* قسم النتائج */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {balances && !isPending && (
                <motion.div key="results" initial="hidden" animate="show" className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-4 py-1.5 rounded-full bg-secondary text-sm font-medium">
                      {activeBalances.length} Assets
                    </div>
                    <h2 className="text-2xl font-bold">الأرصدة المتوفرة</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeBalances.map((balance) => (
                      <BalanceCard 
                        key={balance.asset} 
                        balance={balance} 
                        onSelect={handleSelectAsset} // 3. هنا يتم تمرير وظيفة النقر
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
