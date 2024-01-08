import { type Promo } from "@prisma/client";

export type PromoBlur = Promo & {
  base64: string;
};
