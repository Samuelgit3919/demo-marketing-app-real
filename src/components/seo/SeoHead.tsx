import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
}

export function SeoHead({ title, description, jsonLd }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);

  useEffect(() => {
    if (!jsonLd) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [jsonLd]);

  return null;
}
