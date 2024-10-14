import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "@/env";
import { withPulse } from "@prisma/extension-pulse/node";

const createPrismaClient = () =>
  new PrismaClient()
    .$extends(withPulse({ apiKey: env.PULSE_API_KEY }))
    .$extends(withAccelerate());

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
