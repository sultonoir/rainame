import { z } from "zod";

export const createProductSchema = z.object({
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
  discount: z.number(),
  price: z.number(),
  stockAdnSize : z.array(z.object({
    stock : z.string(),
  }))
});
