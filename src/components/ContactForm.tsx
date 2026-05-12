import { ExternalLink } from "lucide-react";

type ContactFormProps = {
  title: string;
  embedUrl: string;
  linkUrl?: string;
};

function toGoogleFormEmbedUrl(url: string) {
  const source = url.match(/\bsrc=["']([^"']+)["']/i)?.[1] ?? url;

  if (!source) {
    return "";
  }

  try {
    const formUrl = new URL(source);
    formUrl.searchParams.set("embedded", "true");
    return formUrl.toString();
  } catch {
    return source;
  }
}

export function ContactForm({ title, embedUrl, linkUrl }: ContactFormProps) {
  const normalizedEmbedUrl = toGoogleFormEmbedUrl(embedUrl);
  const openUrl = linkUrl || embedUrl;
  return (
    <article className="overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-soft transition duration-200 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lift">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-6 md:p-7">
        <h3 className="font-serif text-2xl font-semibold text-navy">{title}</h3>
        {openUrl ? (
          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line bg-background px-4 text-xs font-bold text-navy transition hover:border-teal/40 hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20"
          >
            Open form
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
      <iframe
        src={normalizedEmbedUrl}
        title={title}
        className="h-[44rem] w-full bg-background"
        loading="lazy"
      >
        Loading...
      </iframe>
    </article>
  );
}
