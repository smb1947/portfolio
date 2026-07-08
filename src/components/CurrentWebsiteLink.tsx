"use client";

import { useEffect, useState } from "react";

function formatPortfolioUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function getCurrentPortfolioUrl() {
  const url = new URL(window.location.href);
  const printUrl = url.searchParams.get("printWebsiteUrl");

  if (printUrl) {
    return printUrl;
  }

  url.hash = "";
  url.searchParams.delete("theme");
  url.searchParams.delete("themePicker");
  url.searchParams.delete("printWebsiteUrl");

  return url.toString();
}

export function CurrentWebsiteLink() {
  const [portfolioUrl, setPortfolioUrl] = useState("");

  useEffect(() => {
    setPortfolioUrl(getCurrentPortfolioUrl());
  }, []);

  if (!portfolioUrl) {
    return null;
  }

  return (
    <>
      Portfolio website -{" "}
      <a className="text-teal underline-offset-4" href={portfolioUrl}>
        {formatPortfolioUrl(portfolioUrl)}
      </a>
    </>
  );
}
