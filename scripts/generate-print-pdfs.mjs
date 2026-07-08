import { createServer } from "node:http";
import { copyFile, mkdir, stat } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";

const rootDir = resolve(new URL("..", import.meta.url).pathname);
const outDir = join(rootDir, "out");
const publicDir = join(rootDir, "public");
const tempDir = join(rootDir, ".temp", "build-print-pdfs");
const port = Number(process.env.PRINT_PDF_PORT ?? 4173);
const chromePath = findChromeExecutable();
const puppeteer = await loadPuppeteer();

const printTargets = [
  {
    theme: "light",
    fileName: "portfolio-print.pdf",
    url: `http://127.0.0.1:${port}/?theme=light`
  },
  {
    theme: "dark",
    fileName: "portfolio-print-dark.pdf",
    url: `http://127.0.0.1:${port}/?theme=dark&themePicker=1`
  }
];

if (process.env.SKIP_PRINT_PDF_BUILD === "1") {
  console.log("Skipping print PDF generation because SKIP_PRINT_PDF_BUILD=1.");
  process.exit(0);
}

if (!existsSync(outDir)) {
  throw new Error("Missing out/ directory. Run next build before generating print PDFs.");
}

if (!chromePath && !puppeteer) {
  const message =
    "Could not find Chrome/Chromium or Puppeteer for print PDF generation. Using the committed print PDFs already copied into out/. Set CHROME_BIN or install puppeteer to regenerate during build.";

  if (process.env.REQUIRE_PRINT_PDF_BUILD === "1") {
    throw new Error(`${message} REQUIRE_PRINT_PDF_BUILD=1 was set, so this build cannot continue.`);
  }

  console.warn(message);
  await ensureExistingPrintPdfs();
  process.exit(0);
}

await mkdir(tempDir, { recursive: true });

const server = await startStaticServer(outDir, port);

try {
  for (const target of printTargets) {
    const tempPdfPath = join(tempDir, target.fileName);
    await printPdf(target.url, tempPdfPath, target.theme);
    await copyFile(tempPdfPath, join(publicDir, target.fileName));
    await copyFile(tempPdfPath, join(outDir, target.fileName));
    const { size } = await stat(tempPdfPath);
    console.log(`Generated ${target.fileName} (${Math.round(size / 1024)} KB)`);
  }
} finally {
  await new Promise((resolveClose) => server.close(resolveClose));
}

function findChromeExecutable() {
  if (process.env.DISABLE_SYSTEM_CHROME_PRINT_PDF === "1") {
    return null;
  }

  const candidates = [
    process.env.CHROME_BIN,
    process.env.CHROMIUM_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "/snap/bin/chromium"
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

async function loadPuppeteer() {
  if (process.env.DISABLE_PUPPETEER_PRINT_PDF === "1") {
    return null;
  }

  try {
    const puppeteerModule = await import("puppeteer");
    return puppeteerModule.default ?? puppeteerModule;
  } catch {
    return null;
  }
}

async function ensureExistingPrintPdfs() {
  for (const target of printTargets) {
    const publicPdfPath = join(publicDir, target.fileName);
    const outPdfPath = join(outDir, target.fileName);

    if (existsSync(outPdfPath)) {
      continue;
    }

    if (!existsSync(publicPdfPath)) {
      throw new Error(`Missing fallback print PDF: ${publicPdfPath}`);
    }

    await copyFile(publicPdfPath, outPdfPath);
  }
}

function startStaticServer(root, serverPort) {
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? "/", `http://127.0.0.1:${serverPort}`);
      const pathname = decodeURIComponent(requestUrl.pathname);
      const safePath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const filePath = resolve(root, `.${safePath}`);

      if (!filePath.startsWith(root)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const fileStats = await stat(filePath);

      if (!fileStats.isFile()) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const file = createReadStream(filePath);
      response.writeHead(200, { "content-type": getContentType(filePath) });
      file.pipe(response);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  return new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(serverPort, "127.0.0.1", () => {
      server.off("error", rejectListen);
      resolveListen(server);
    });
  });
}

async function printPdf(url, outputPath, theme) {
  if (puppeteer) {
    await printPdfWithPuppeteer(url, outputPath, theme);
    return;
  }

  await printPdfWithChrome(url, outputPath);
}

async function printPdfWithPuppeteer(url, outputPath, theme) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath ?? undefined,
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");
    await page.pdf({
      path: outputPath,
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false
    });
    console.log(`Generated ${theme} PDF with Puppeteer.`);
  } finally {
    await browser.close();
  }
}

function printPdfWithChrome(url, outputPath) {
  const args = [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--virtual-time-budget=5000",
    `--print-to-pdf=${outputPath}`,
    "--print-to-pdf-no-header",
    url
  ];

  return new Promise((resolvePrint, rejectPrint) => {
    const child = spawn(chromePath, args, { stdio: "inherit" });
    child.on("error", rejectPrint);
    child.on("exit", (code) => {
      if (code === 0) {
        resolvePrint();
        return;
      }

      rejectPrint(new Error(`Chrome PDF generation failed with exit code ${code}.`));
    });
  });
}

function getContentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".woff2")) return "font/woff2";
  if (filePath.endsWith(".pdf")) return "application/pdf";
  return "application/octet-stream";
}
