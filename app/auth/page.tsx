import { redirect } from "next/navigation";

// M0 shipped a combined /auth route. Keep the URL alive so existing links and
// Supabase redirect URLs don't 404 after the Next.js conversion.
export default function AuthPage() {
  redirect("/sign-in");
}
