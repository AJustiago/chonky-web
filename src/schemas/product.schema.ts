import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  colorways: z.array(z.string()),
  description: z.string().optional(),
  images: z.array(z.string()),
  price: z.number().min(0),
  quantity: z.number().int().min(0),
  functionEnabled: z.boolean().default(false),
});

export type Product = z.infer<typeof productSchema>;
