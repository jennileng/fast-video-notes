import type { Metadata } from "next";

import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign up — Video Speed Reader",
  description: "Create your Video Speed Reader account.",
};

export default function SignUpPage() {
  return <AuthForm initialMode="signup" />;
}
