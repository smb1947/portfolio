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
    <a className="print-first-page-link" href={websiteUrl}>
      <span aria-hidden="true">🔗</span>
      <span>{websiteUrl}</span>
    </a>
  );
}
