import { Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/SignOutButton";
import UploadForm from "@/components/UploadForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Transcribe — Video Speed Reader",
  description: "Submit a video URL and get a transcript back.",
  robots: { index: false },
};

type JobRow = {
  id: string;
  created_at: string;
  video_source_url: string;
  status: string;
};

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function truncate(value: string, max = 50): string {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function statusClasses(status: string): string {
  if (status === "done") return "bg-green-500/15 text-green-400 border-green-500/30";
  if (status === "transcribe") return "bg-blue-500/15 text-blue-400 border-blue-500/30";
  return "bg-muted text-muted-foreground border-border";
}

export default async function UploadPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  // RLS ("users read own jobs") scopes this to the signed-in user.
  const { data, error } = await supabase
    .from("jobs")
    .select("id, created_at, video_source_url, status")
    .order("created_at", { ascending: false })
    .limit(20);

  const jobs = (data ?? []) as JobRow[];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-base font-bold tracking-tight">
            Video Speed Reader
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="rounded-lg border border-input bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-accent"
            >
              Dashboard
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight">Your transcriptions</h1>

        {error ? (
          <p className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Could not load jobs: {error.message}. If this says the table does not exist, the
            M1 migration has not been applied to Supabase yet.
          </p>
        ) : jobs.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center text-sm text-muted-foreground">
            No transcriptions yet. Submit your first video below.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-card/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">URL</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Transcript</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-border/60 last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {relativeTime(job.created_at)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {truncate(job.video_source_url)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClasses(job.status)}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {job.status === "done" ? (
                        <a
                          href={`/api/jobs/${job.id}/transcript`}
                          download={`transcript-${job.id.slice(0, 8)}.txt`}
                          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                        >
                          <Download className="h-3.5 w-3.5" />
                          .txt
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <UploadForm />
      </main>
    </div>
  );
}
