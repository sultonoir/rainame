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
  // desc: z.string().min(10, {
  //   message: "Product must have 10 character",
  // }),
  // discount: z.string(),
  // price: z.string(),
  // stockAdnSize: z
  //   .array(
  //     z.object({
  //       stock: z.string(),
  //       size: z.string(),
  //     }),
  //   )
  //   .min(1, {
  //     message: "Stock and size must have 1 item",
  //   }),
  category: z.object({
    label: z.string(),
    value: z.string(),
  }),
  // subcategory: z.object({
  //   label: z.string(),
  //   value: z.string(),
  // }),
});

export type PostProductSchema = z.infer<typeof postProductInput>;
