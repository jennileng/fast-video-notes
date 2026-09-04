import { Video } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/SignOutButton";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard — Video Speed Reader",
  description: "Your Video Speed Reader dashboard.",
  robots: { index: false },
};

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-base font-bold tracking-tight">
            Video Speed Reader
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/upload"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90"
            >
              Transcribe a video
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight">Hi {user.email}</h1>

        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-8 py-20 text-center">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Ready when you are.</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Head to{" "}
            <Link href="/upload" className="font-medium text-primary hover:underline">
              Transcribe a video
            </Link>{" "}
            to submit a video URL and get a transcript back.
          </p>
        </div>
      </main>
    </div>
  );
}
