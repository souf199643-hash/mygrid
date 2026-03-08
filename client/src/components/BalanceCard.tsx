import { motion } from "framer-motion";
import { Coins, Lock, Wallet } from "lucide-react";
import type { Balance } from "@shared/schema";

interface BalanceCardProps {
  balance: Balance;
  onSelect?: (asset: string) => void; // إضافة الرابط مع ملف Dashboard
}

export function BalanceCard({ balance, onSelect }: BalanceCardProps) {
  // Parse and format strings to numbers
  const free = parseFloat(balance.free);
  const locked = parseFloat(balance.locked);
  const total = free + locked;

  // Format number beautifully
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(val);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
      }}
      whileHover={{ scale: 1.02 }} // إضافة تأثير بسيط عند الحوم بالماوس
      whileTap={{ scale: 0.98 }}   // إضافة تأثير ضغطة الزر
      onClick={() => onSelect?.(balance.asset)} // تفعيل إرسال اسم العملة عند النقر
      className="group relative overflow-hidden rounded-2xl bg-card border border-white/5 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 text-right"> {/* جعل النص محاذياً لليمين ليتناسب مع لغتك العربية */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-left font-sans">
            <p className="text-sm font-medium text-muted-foreground mb-1">الإجمالي</p>
            <p className="text-lg font-bold text-foreground">{formatValue(total)}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground font-sans uppercase tracking-wider">Asset</p>
              <h3 className="text-2xl font-bold text-foreground font-sans">{balance.asset}</h3>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary text-primary group-hover:scale-110 transition-transform duration-300">
              <Coins className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground justify-end">
              <span className="text-sm font-medium">الرصيد المتوفر</span>
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-lg font-semibold font-sans text-foreground text-left">{formatValue(free)}</span>
          </div>

          <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground justify-end">
              <span className="text-sm font-medium">الرصيد المحجوز</span>
              <Lock className="w-4 h-4 text-destructive" />
            </div>
            <span className="text-lg font-semibold font-sans text-foreground text-left">{formatValue(locked)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
