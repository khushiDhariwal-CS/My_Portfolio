import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

console.log("\n==================================================");
console.log("   Khushi Dhariwal Portfolio — Link Verification  ");
console.log("==================================================\n");

async function checkUrl(url) {
  if (url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("/")) {
    return { ok: true, status: "Local/Protocol valid", code: 200 };
  }
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioLinkChecker/1.0)" },
    });
    clearTimeout(timeout);
    return { ok: res.status < 400, status: res.statusText || "OK", code: res.status };
  } catch (err) {
    // Some sites block HEAD, try GET with range
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioLinkChecker/1.0)" },
      });
      clearTimeout(timeout);
      return { ok: res.status < 400, status: res.statusText || "OK", code: res.status };
    } catch (err2) {
      return { ok: false, status: err2.message, code: 0 };
    }
  }
}

async function run() {
  const linksFile = fs.readFileSync(path.join(rootDir, "src/data/links.ts"), "utf-8");
  const projectsFile = fs.readFileSync(path.join(rootDir, "src/data/projects.ts"), "utf-8");

  // Parse links object key-values
  const linkMatches = [...linksFile.matchAll(/(\w+):\s*"([^"]+)"/g)];
  
  const placeholders = [];
  const activeLinks = [];

  for (const match of linkMatches) {
    const [, key, url] = match;
    if (url.toUpperCase().includes("[PLACEHOLDER") || url.toUpperCase().includes("[CONFIRM")) {
      placeholders.push({ key, url });
    } else {
      activeLinks.push({ key, url });
    }
  }

  console.log(`🔍 Found ${activeLinks.length} active links and ${placeholders.length} placeholder slots in links.ts\n`);

  console.log("--- 1. Checking Active Links ---");
  for (const { key, url } of activeLinks) {
    process.stdout.write(`Checking [${key}]: ${url} ... `);
    const result = await checkUrl(url);
    if (result.ok) {
      console.log(`✓ reachable (${result.code})`);
    } else {
      console.log(`⚠ warning: (${result.status} / ${result.code})`);
    }
  }

  console.log("\n--- 2. Pending Placeholders to Fill ---");
  if (placeholders.length === 0) {
    console.log("No placeholder links found. All links are configured!");
  } else {
    placeholders.forEach(({ key, url }, idx) => {
      console.log(` [${idx + 1}] links.${key} -> ${url}`);
    });
  }

  console.log("\nLink verification complete.\n");
}

run();
