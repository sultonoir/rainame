import { z } from "zod";

export const postProductInput = z.object({
  title: z
    .string()
    .min(2, {
      message: "Product must have 2 character",
    })
    .refine((value) => value.startsWith("Rainame"), {
      message: "Title must start with Rainame",
    }),
  desc: z.string().min(10, {
    message: "Product must have 10 character",
  }),
  discount: z.number().max(90, {
    message: "Max discount is 90%",
  }),
  price: z.number(),
  stockAdnSize: z
    .array(
      z.object({
        stock: z.string(),
        size: z.string(),
      }),
    )
    .min(1, {
      message: "Stock and size must have 1 item",
    }),
  category: z.object({
    label: z.string(),
    value: z.string(),
  }),
  subcategory: z.object({
    label: z.string(),
    value: z.string(),
  }),
  images: z.array(z.string()),
});

export type PostProductSchema = z.infer<typeof postProductInput>;
