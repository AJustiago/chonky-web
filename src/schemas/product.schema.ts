import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  productName: z.string().min(1, "Product name is required"),
  productDetail: z.string().optional(),
  photo: z.string().refine((val) => val.startsWith("/") || val.startsWith("http"), {
    message: "Image path must start with '/' or be a valid URL",
  }),
  price: z.number().min(0, "Price must be a positive number"),
  qty: z.number().int().min(0, "Quantity must be a non-negative integer"),
  functionEnabled: z.boolean().default(false),
});

export type Product = z.infer<typeof productSchema>;
