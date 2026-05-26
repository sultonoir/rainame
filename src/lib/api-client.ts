import { app } from "@/server";
import { treaty } from "@elysiajs/eden";
import { getBaseUrl } from "./base-url";

export const api =
  typeof process !== "undefined"
    ? treaty(app).api.v2
    : treaty<typeof app>(getBaseUrl()).api.v2;
