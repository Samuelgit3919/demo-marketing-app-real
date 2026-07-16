import React from "react";

/**
 * Tiny, dependency-free Markdown-lite renderer.
 * Supports: # / ## / ### headings, - and * bullet lists, 1. numbered lists,
 * > blockquotes, blank-line paragraphs, and inline **bold**, *italic*, and
 * [links](url). Everything is emitted as React elements (no dangerouslySet-
 * InnerHTML), so author text can't inject markup.
 */

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Order matters: links first, then bold, then italic.
  const pattern = /(\[([^\]]+)\]\(([^)\s]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1]) {
      nodes.push(
        <a key={`${keyBase}-a${i}`} href={m[3]} target="_blank" rel="noopener noreferrer" className="text-brand-copper underline">
          {m[2]}
        </a>,
      );
    } else if (m[4]) {
      nodes.push(<strong key={`${keyBase}-b${i}`}>{m[5]}</strong>);
    } else if (m[6]) {
      nodes.push(<em key={`${keyBase}-i${i}`}>{m[7]}</em>);
    }
    last = pattern.lastIndex;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function renderMarkdown(src: string): React.ReactNode[] {
  const lines = (src || "").replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    let line = lines[i];

    // blank line
    if (line.trim() === "") { i++; continue; }

    // headings
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const content = renderInline(h[2], `h${key}`);
      if (level === 1) blocks.push(<h1 key={key} className="text-3xl md:text-4xl font-light text-brand-espresso mt-8 mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{content}</h1>);
      else if (level === 2) blocks.push(<h2 key={key} className="text-2xl md:text-3xl font-light text-brand-espresso mt-8 mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{content}</h2>);
      else blocks.push(<h3 key={key} className="text-xl font-semibold text-brand-espresso mt-6 mb-2">{content}</h3>);
      key++; i++; continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
      blocks.push(
        <blockquote key={key} className="border-l-4 border-brand-copper pl-4 italic text-brand-muted my-5">
          {renderInline(buf.join(" "), `q${key}`)}
        </blockquote>,
      );
      key++; continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^[-*]\s+/, "")); i++; }
      blocks.push(
        <ul key={key} className="list-disc pl-6 space-y-1 my-4 text-brand-espresso/90">
          {items.map((it, idx) => <li key={idx}>{renderInline(it, `ul${key}-${idx}`)}</li>)}
        </ul>,
      );
      key++; continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s+/, "")); i++; }
      blocks.push(
        <ol key={key} className="list-decimal pl-6 space-y-1 my-4 text-brand-espresso/90">
          {items.map((it, idx) => <li key={idx}>{renderInline(it, `ol${key}-${idx}`)}</li>)}
        </ol>,
      );
      key++; continue;
    }

    // paragraph (gather consecutive non-blank, non-special lines)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !/^>\s?/.test(lines[i])
    ) {
      para.push(lines[i]); i++;
    }
    blocks.push(
      <p key={key} className="text-brand-espresso/90 leading-relaxed my-4">
        {renderInline(para.join(" "), `p${key}`)}
      </p>,
    );
    key++;
  }

  return blocks;
}
