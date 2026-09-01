import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, FileText, BadgeCheck } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Speed Reader — Video to Transcript in 3 Minutes" },
      {
        name: "description",
        content:
          "Upload your video, get a clean, high-accuracy transcript in three minutes. Repurpose long-form video into blog posts, course notes, and searchable archives.",
      },
      { property: "og:title", content: "Video Speed Reader" },
      {
        property: "og:description",
        content: "Upload your video, get a clean transcript in three minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: FileText,
    title: "High-accuracy transcripts",
    description:
      "Powered by OpenAI Whisper, the industry-leading speech recognition model, for transcripts you can trust.",
  },
  {
    icon: Zap,
    title: "Three-minute turnaround",
    description:
      "Your video is processed in the background. We email you the moment your transcript is ready.",
  },
  {
    icon: BadgeCheck,
    title: "Commercial-use ready",
    description:
      "You own the output. Repurpose it into blog posts, course notes, or archives — however you like.",
  },
];

function LandingPage() {
  const featuresRef = useReveal<HTMLElement>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <span className="text-base font-bold tracking-tight">
            Video Speed Reader
          </span>
          <Link
            to="/auth"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-glow relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 text-center sm:pt-32">
          <p className="mx-auto mb-6 inline-block rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
            For creators, educators & engineers
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Video Speed Reader
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            Upload your video, get a clean transcript in three minutes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/auth"
              className="rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:bg-primary/90"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Everything you need to repurpose video
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Turn long-form recordings into text you can actually use — fast.
        </p>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="fade-in-up rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-muted-foreground">
          © 2026 Video Speed Reader
        </div>
      </footer>
    </div>
  );
}
