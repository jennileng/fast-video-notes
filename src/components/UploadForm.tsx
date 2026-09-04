"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function UploadForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("zh");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_source_url: videoUrl,
          topic: topic || null,
          language,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload.error ?? `Request failed (${res.status})`);
      setVideoUrl("");
      setTopic("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-primary/5"
    >
      <h2 className="text-xl font-semibold tracking-tight">Transcribe a video</h2>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="video-url" className="mb-1.5 block text-sm font-medium">
            Video URL
          </label>
          <input
            id="video-url"
            type="url"
            required
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Direct mp4 / mp3 URL (e.g. CloudFront, Vimeo, Internet Archive)"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            YouTube URLs need cookie auth from cloud IPs and are not supported yet.
          </p>
        </div>

        <div>
          <label htmlFor="topic" className="mb-1.5 block text-sm font-medium">
            Topic <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Tech podcast — useful context for the model"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div>
          <label htmlFor="language" className="mb-1.5 block text-sm font-medium">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            <option value="zh">中文 (zh)</option>
            <option value="en">English (en)</option>
            <option value="ja">日本語 (ja)</option>
          </select>
        </div>

        {error && (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Transcribe"}
        </button>
      </div>
    </form>
  );
}
