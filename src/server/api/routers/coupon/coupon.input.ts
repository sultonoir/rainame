import { z } from "zod";

export const createCouponInput = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  code: z.string().optional(),
  amount: z.number().optional(),
  minOrder: z.number().min(0, {
    message: "Minimum order must be greater than or equal to 0",
  }),
  tac: z.string().min(1, {
    message: "Terms and Conditions are required",
  }),
  expiresAt: z
    .date({
      required_error: "Expiration date is required",
    })
    .min(new Date(), {
      message: "Expiration date must be later than today",
    }),
  discount: z.number().min(0, {
    message: "Discount must be greater than or equal to 0",
  }),
});

export type CreateCouponSchema = z.infer<typeof createCouponInput>;
