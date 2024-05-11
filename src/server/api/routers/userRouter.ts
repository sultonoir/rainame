import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      function emailToString(email: string): string {
        // Pisahkan alamat email menggunakan '@' sebagai pemisah
        const potongan = email.split("@");

        // Ambil nama depan (bagian pertama setelah pemisah '@')
        const namaDepan = potongan[0];

        return namaDepan!;
      }

      const exist = await ctx.db.query.users.findFirst({
        where: (s, { eq }) => eq(s.email, input.email),
      });

      if (exist) {
        return exist.email;
      }

      const name = emailToString(input.email);
      const user = await ctx.db
        .insert(users)
        .values({ email: input.email, name })
        .returning({ email: users.email });
      return user[0]?.email;
    }),
});
