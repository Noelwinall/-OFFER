/**
 * Scrape primary and secondary school emails from schooland.hk
 */

import * as fs from "fs";
import * as path from "path";

const CONCURRENT_REQUESTS = 5;
const DELAY_MS = 200;

// Skip category/district pages
const SKIP_PATTERNS = [
  "admission", "register", "search", "back", "index", "government",
  "private", "aided", "dss", "direct-subsidy", "district", "boys", "girls",
  "catholic", "protestant", "buddhist", "christian", "muslim", "taoist",
  "central-west", "eastern", "wan-chai", "southern", "islands",
  "kowloon-city", "wong-tai-sin", "kwun-tong", "yau-tsim-mong", "sham-shui-po",
  "kwai-tsing", "tsuen-wan", "sha-tin", "tai-po", "sai-kung",
  "tuen-mun", "yuen-long", "north", "traditional-elite", "band1"
];

async function fetchPage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) return null;
    return response.text();
  } catch {
    return null;
  }
}

function extractSchoolInfo(html: string): { name: string; email?: string } | null {
  // Extract school name from title
  const titleMatch = /<title>([^<]+)<\/title>/i.exec(html);
  if (!titleMatch) return null;

  let name = titleMatch[1].split(/[-–|]/)[0].trim();
  name = name.replace(/\s*升學天地.*$/, "").trim();

  // Extract email
  let email: string | undefined;

  // Pattern 1: mailto links
  const mailtoMatch = /mailto:([a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i.exec(html);
  if (mailtoMatch) {
    email = mailtoMatch[1].toLowerCase();
  }

  // Pattern 2: email with label
  if (!email) {
    const labelMatch = /(?:電郵|Email|E-mail)[：:\s]*([a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i.exec(html);
    if (labelMatch) {
      email = labelMatch[1].toLowerCase();
    }
  }

  // Pattern 3: .edu.hk or .gov.hk email
  if (!email) {
    const eduMatch = /([a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.(?:edu|gov)\.hk)/i.exec(html);
    if (eduMatch) {
      email = eduMatch[1].toLowerCase();
    }
  }

  if (!name) return null;
  return { name, email };
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processBatch(slugs: string[], type: "ps" | "ss"): Promise<Map<string, string>> {
  const results = new Map<string, string>();

  const promises = slugs.map(async (slug) => {
    const url = `https://www.schooland.hk/${type}/${slug}`;
    const html = await fetchPage(url);

    if (html) {
      const info = extractSchoolInfo(html);
      if (info && info.name && info.email) {
        return { name: info.name, email: info.email };
      }
    }
    return null;
  });

  const resolved = await Promise.all(promises);
  resolved.forEach(r => {
    if (r) results.set(r.name, r.email);
  });

  return results;
}

async function scrapeType(type: "ps" | "ss", label: string): Promise<Record<string, string>> {
  console.log(`\n=== SCRAPING ${label.toUpperCase()} ===\n`);

  // Read sitemap and extract slugs
  const sitemapPath = path.join(__dirname, "../data/schooland-sitemap.xml");
  const sitemap = fs.readFileSync(sitemapPath, "utf-8");

  const slugPattern = new RegExp(`/${type}/([a-z0-9-]+)`, "gi");
  const allSlugs = new Set<string>();
  let match;

  while ((match = slugPattern.exec(sitemap)) !== null) {
    const slug = match[1].toLowerCase();
    if (!SKIP_PATTERNS.some(p => slug.includes(p)) && slug.length > 1) {
      allSlugs.add(slug);
    }
  }

  const slugArray = [...allSlugs];
  console.log(`Total slugs to process: ${slugArray.length}`);

  const results: Record<string, string> = {};
  let processed = 0;
  let withEmail = 0;

  for (let i = 0; i < slugArray.length; i += CONCURRENT_REQUESTS) {
    const batch = slugArray.slice(i, i + CONCURRENT_REQUESTS);
    const batchResults = await processBatch(batch, type);

    batchResults.forEach((email, name) => {
      results[name] = email;
      withEmail++;
      console.log(`  ${name}: ${email}`);
    });

    processed += batch.length;

    if (processed % 100 === 0) {
      console.log(`\n--- Progress: ${processed}/${slugArray.length} (${withEmail} emails found) ---\n`);
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n${label} Results: ${withEmail} emails found`);
  return results;
}

async function main() {
  console.log("=== SCRAPING PS/SS EMAILS FROM SCHOOLAND ===");

  // Scrape primary schools
  const psEmails = await scrapeType("ps", "Primary Schools");

  // Scrape secondary schools
  const ssEmails = await scrapeType("ss", "Secondary Schools");

  // Combine results
  const allEmails = { ...psEmails, ...ssEmails };

  console.log(`\n=== TOTAL RESULTS ===`);
  console.log(`Primary schools: ${Object.keys(psEmails).length}`);
  console.log(`Secondary schools: ${Object.keys(ssEmails).length}`);
  console.log(`Total: ${Object.keys(allEmails).length}`);

  // Save results
  const outputPath = path.join(__dirname, "../data/schooland-ps-ss-emails.json");
  fs.writeFileSync(outputPath, JSON.stringify(allEmails, null, 2));
  console.log(`\nSaved to: ${outputPath}`);
}

main().catch(console.error);
