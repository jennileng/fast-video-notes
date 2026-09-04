import type { Metadata } from "next";

import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign in — Video Speed Reader",
  description: "Sign in to your Video Speed Reader account.",
};

export default function SignInPage() {
  return <AuthForm initialMode="signin" />;
}
