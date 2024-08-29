import { Signup } from "@/components/templates/auth/signup";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up",
  description: "Signup Page",
};

export default async function SignupPage() {
  const { user } = await validateRequest();

  if (user?.role === "user") redirect(Paths.Home);
  if (user?.role === "admin") redirect(Paths.Dashboard);
  return <Signup />;
}
