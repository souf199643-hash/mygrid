import { motion } from "framer-motion";
import { Coins, Lock, Wallet } from "lucide-react";
import type { Balance } from "@shared/schema";

interface BalanceCardProps {
  balance: Balance;
  onSelect?: (asset:string)=>void;
}

export function BalanceCard({ balance,onSelect }: BalanceCardProps) {
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
      onClick={()= onSelect?.
        (balance.asset)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
      }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-white/5 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary text-primary group-hover:scale-110 transition-transform duration-300">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground font-sans uppercase tracking-wider">Asset</p>
              <h3 className="text-2xl font-bold text-foreground font-sans">{balance.asset}</h3>
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-muted-foreground mb-1">الإجمالي</p>
            <p className="text-lg font-bold text-foreground font-sans">{formatValue(total)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium">الرصيد المتوفر</span>
            </div>
            <span className="text-lg font-semibold font-sans text-foreground">{formatValue(free)}</span>
          </div>

          <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">الرصيد المحجوز</span>
            </div>
            <span className="text-lg font-semibold font-sans text-foreground">{formatValue(locked)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
