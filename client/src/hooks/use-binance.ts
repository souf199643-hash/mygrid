import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { BinanceCredentials, Balance } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useGetBalance() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (credentials: BinanceCredentials): Promise<Balance[]> => {
      const res = await fetch(api.binance.getBalance.path, {
        method: api.binance.getBalance.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        let errorMessage = "حدث خطأ غير متوقع أثناء جلب الرصيد";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Ignore JSON parse error and use default message
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      return api.binance.getBalance.responses[200].parse(data);
    },
    onError: (error) => {
      toast({
        title: "فشل في جلب الرصيد",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "تمت العملية بنجاح",
        description: "تم تحديث الأرصدة بنجاح",
      });
    },
  });
}
