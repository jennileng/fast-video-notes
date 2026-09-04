"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="rounded-lg border border-input bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-accent"
    >
      Sign out
    </button>
  );
}
