/**
 * Scrape kindergarten emails from schooland.hk using sitemap
 */

import * as fs from "fs";
import * as path from "path";

const CONCURRENT_REQUESTS = 5; // Concurrent requests
const DELAY_MS = 200; // Delay between batches

// Skip these slugs (not school pages)
const SKIP_PATTERNS = [
  "admission", "register", "search", "back", "index", "government",
  "private", "non-profit", "buddhist", "cannan", "caritas", "ccc",
  "creative", "district", "international", "salvation", "twghs",
  "plk", "pok", "ych", "ywca", "ymca"
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

function extractSchoolInfo(html: string): { name: string; email?: string; phone?: string; fax?: string } | null {
  // Extract school name from title
  const titleMatch = /<title>([^<]+)<\/title>/i.exec(html);
  if (!titleMatch) return null;

  let name = titleMatch[1].split(/[-–|]/)[0].trim();
  // Remove "升學天地" suffix if present
  name = name.replace(/\s*升學天地.*$/, "").trim();

  // Extract email - look for various patterns
  let email: string | undefined;

  // Pattern 1: mailto links
  const mailtoMatch = /mailto:([a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i.exec(html);
  if (mailtoMatch) {
    email = mailtoMatch[1].toLowerCase();
  }

  // Pattern 2: email in text with label
  if (!email) {
    const labelMatch = /(?:電郵|Email|E-mail)[：:\s]*([a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i.exec(html);
    if (labelMatch) {
      email = labelMatch[1].toLowerCase();
    }
  }

  // Pattern 3: .edu.hk email anywhere
  if (!email) {
    const eduMatch = /([a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.edu\.hk)/i.exec(html);
    if (eduMatch) {
      email = eduMatch[1].toLowerCase();
    }
  }

  // Extract phone
  let phone: string | undefined;
  const phoneMatch = /(?:電話|Tel)[：:\s]*(\d{8})/i.exec(html);
  if (phoneMatch) phone = phoneMatch[1];

  // Extract fax
  let fax: string | undefined;
  const faxMatch = /(?:傳真|Fax)[：:\s]*(\d{8})/i.exec(html);
  if (faxMatch) fax = faxMatch[1];

  if (!name) return null;

  return { name, email, phone, fax };
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processBatch(slugs: string[]): Promise<Map<string, any>> {
  const results = new Map();

  const promises = slugs.map(async (slug) => {
    const url = `https://www.schooland.hk/kg/${slug}`;
    const html = await fetchPage(url);

    if (html) {
      const info = extractSchoolInfo(html);
      if (info && info.name && (info.email || info.phone || info.fax)) {
        return { name: info.name, data: { email: info.email, phone: info.phone, fax: info.fax } };
      }
    }
    return null;
  });

  const resolved = await Promise.all(promises);
  resolved.forEach(r => {
    if (r) results.set(r.name, r.data);
  });

  return results;
}

async function main() {
  console.log("=== SCRAPING KINDERGARTEN EMAILS FROM SCHOOLAND V2 ===\n");

  // Read sitemap and extract slugs
  const sitemapPath = path.join(__dirname, "../data/schooland-sitemap.xml");
  const sitemap = fs.readFileSync(sitemapPath, "utf-8");

  const slugPattern = /\/kg\/([a-z0-9-]+)/gi;
  const allSlugs = new Set<string>();
  let match;

  while ((match = slugPattern.exec(sitemap)) !== null) {
    const slug = match[1].toLowerCase();
    // Skip non-school pages
    if (!SKIP_PATTERNS.some(p => slug.includes(p)) && slug.length > 1) {
      allSlugs.add(slug);
    }
  }

  const slugArray = [...allSlugs];
  console.log(`Total slugs to process: ${slugArray.length}`);

  // Process in batches
  const results: Record<string, any> = {};
  let processed = 0;
  let withEmail = 0;

  for (let i = 0; i < slugArray.length; i += CONCURRENT_REQUESTS) {
    const batch = slugArray.slice(i, i + CONCURRENT_REQUESTS);
    const batchResults = await processBatch(batch);

    batchResults.forEach((data, name) => {
      results[name] = data;
      if (data.email) {
        withEmail++;
        console.log(`  ${name}: ${data.email}`);
      }
    });

    processed += batch.length;

    if (processed % 100 === 0) {
      console.log(`\n--- Progress: ${processed}/${slugArray.length} (${withEmail} emails found) ---\n`);
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Total processed: ${processed}`);
  console.log(`Schools found: ${Object.keys(results).length}`);
  console.log(`With email: ${withEmail}`);

  // Save results
  const outputPath = path.join(__dirname, "../data/schooland-kg-emails.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nSaved to: ${outputPath}`);
}

main().catch(console.error);
