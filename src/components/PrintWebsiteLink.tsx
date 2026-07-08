"use client";

import { useEffect, useState } from "react";
import { basePath } from "@/lib/assets";

export function PrintWebsiteLink() {
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    setWebsiteUrl(`${window.location.origin}${basePath}/`);
  }, []);

  if (!websiteUrl) {
    return null;
  }

  return (
    <a className="print-footer-link" href={websiteUrl}>
      <span className="print-footer-link-icon" aria-hidden="true">🔗</span>
      <span className="print-footer-link-url">{websiteUrl}</span>
    </a>
  );
}
