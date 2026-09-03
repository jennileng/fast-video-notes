import { useEffect } from "react";

type PageMeta = {
  title: string;
  description?: string;
  robots?: string;
};

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Per-route document metadata. Replaces TanStack Router's `head()` option,
 * which is unavailable in a plain client-rendered SPA.
 */
export function usePageMeta({ title, description, robots }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[property="og:title"]', "property", "og:title", title);

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
    }

    if (robots) {
      setMeta('meta[name="robots"]', "name", "robots", robots);
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }
  }, [title, description, robots]);
}
