import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { Login } from "@/components/templates/auth/login";

export const metadata = {
  title: "Login",
  description: "Login Page",
};

export default async function LoginPage() {
  const { user } = await validateRequest();

  if (user?.role === "user") redirect(Paths.Home);
  if (user?.role === "admin") redirect(Paths.Dashboard);

  return <Login />;
}
