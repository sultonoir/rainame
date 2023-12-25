"use server";
import { cookies } from "next/headers";

type TCookie = {
  name: string;
  value: string;
};

export const setCookies = async ({ name, value }: TCookie) => {
  cookies().set({
    name,
    value,
    httpOnly: true,
    path: "/",
  });
};
