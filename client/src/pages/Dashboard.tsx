import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, KeyRound, Lock, ShieldAlert, Wallet, Zap, Loader2, ArrowLeft } from "lucide-react";

import { binanceCredentialsSchema, type BinanceCredentials } from "@shared/schema";
import { useGetBalance } from "@/hooks/use-binance";
import { BalanceCard } from "@/components/BalanceCard";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { mutate: getBalance, isPending, data: balances } = useGetBalance();
  
  // Only show balances that have actual funds
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[1000px] h-[500px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] bg-primary/5 rounded-[100%] blur-[150px] pointer-events-none translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <header className="mb-12 text-center lg:text-right flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 font-medium text-sm">
              <Zap className="w-4 h-4 fill-primary/50" />
              <span>واجهة متقدمة</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gradient mb-4">
              محفظة <span className="text-gradient-primary">بينانس</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              قم بالاتصال بحسابك عبر مفاتيح API واستعرض أرصدتك المتاحة والمحجوزة بأمان تام وفي الوقت الفعلي.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Section */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">بيانات الاتصال</h2>
                  <p className="text-sm text-muted-foreground">أدخل المفاتيح الخاصة بك</p>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground flex items-center gap-2 mb-2">
                          <KeyRound className="w-4 h-4 text-muted-foreground" />
                          مفتاح API
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="أدخل مفتاح API الخاص بك" 
                            className="bg-background/50 border-white/10 h-12 focus-visible:ring-primary/30 font-sans"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="apiSecret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground flex items-center gap-2 mb-2">
                          <Lock className="w-4 h-4 text-muted-foreground" />
                          الرمز السري (API Secret)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            placeholder="أدخل الرمز السري الخاص بك" 
                            className="bg-background/50 border-white/10 h-12 focus-visible:ring-primary/30 font-sans"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isTestnet"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-xl border border-white/5 bg-background/30 p-4 shadow-sm">
                        <div className="space-y-1.5">
                          <FormLabel className="text-base font-semibold text-foreground">
                            الشبكة التجريبية
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            استخدم شبكة Testnet للتجربة
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-primary"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(243,186,47,0.3)] hover:shadow-[0_0_30px_rgba(243,186,47,0.5)] transition-all rounded-xl mt-4"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                        جاري جلب الرصيد...
                      </>
                    ) : (
                      <>
                        جلب الرصيد
                        <ArrowLeft className="w-5 h-5 mr-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!balances && !isPending && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-white/5 rounded-3xl bg-card/20"
                >
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
                    <Activity className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">لا توجد بيانات للعرض</h3>
                  <p className="text-muted-foreground max-w-sm">
                    قم بإدخال مفاتيح API الخاصة بك في النموذج المجاور والضغط على "جلب الرصيد" لعرض محتويات المحفظة.
                  </p>
                </motion.div>
              )}

              {isPending && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="rounded-2xl bg-card border border-white/5 p-6 animate-pulse">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white/5" />
                          <div className="space-y-2">
                            <div className="w-10 h-3 rounded bg-white/5" />
                            <div className="w-16 h-6 rounded bg-white/10" />
                          </div>
                        </div>
                        <div className="w-20 h-8 rounded bg-white/5" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="w-full h-16 rounded-xl bg-white/5" />
                        <div className="w-full h-16 rounded-xl bg-white/5" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {balances && !isPending && (
                <motion.div 
                  key="results"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">الأرصدة المتوفرة</h2>
                    <div className="px-4 py-1.5 rounded-full bg-secondary text-sm font-medium font-sans">
                      {activeBalances.length} Assets
                    </div>
                  </div>

                  {activeBalances.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeBalances.map((balance) => (
                        <BalanceCard key={balance.asset} balance={balance} onSelect={(asset)=>setSelectedAsset(asset)} />
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center rounded-3xl bg-card border border-white/5">
                      <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                        <Wallet className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">المحفظة فارغة</h3>
                      <p className="text-muted-foreground">
                        لا يوجد رصيد متاح أو محجوز في هذا الحساب.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  );
}
