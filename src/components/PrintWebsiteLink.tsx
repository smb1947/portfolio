"use client";

import { useEffect, useState } from "react";

export function PrintWebsiteLink() {
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    setWebsiteUrl(window.location.href.split("#")[0]);
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
