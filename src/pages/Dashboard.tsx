import { Video } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function AppPage() {
  usePageMeta({
    title: "Dashboard — Video Speed Reader",
    description: "Your Video Speed Reader dashboard.",
    robots: "noindex",
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-base font-bold tracking-tight">
            Video Speed Reader
          </Link>
          <button
            onClick={handleSignOut}
            className="rounded-lg border border-input bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-accent"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight">Hi {user?.email}</h1>

        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-8 py-20 text-center">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Your dashboard is coming soon.</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Upload functionality will be added in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
