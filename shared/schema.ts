import { z } from "zod";

export const binanceCredentialsSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
  apiSecret: z.string().min(1, "API Secret is required"),
  isTestnet: z.boolean().default(true),
});

export type BinanceCredentials = z.infer<typeof binanceCredentialsSchema>;

export const balanceSchema = z.object({
  asset: z.string(),
  free: z.string(),
  locked: z.string(),
});

export type Balance = z.infer<typeof balanceSchema>;