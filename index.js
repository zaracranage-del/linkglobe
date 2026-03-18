// index.js — LinkGlobe global geo-redirect API
// Works for creators from ANY country, not just the US.
//
// Amazon redirect:
//   /api?asin=B08XYZ1234&au_tag=x&us_tag=x&uk_tag=x&ca_tag=x&de_tag=x&jp_tag=x
//
// Brand redirect:
//   /api/brand?us=https://...&au=https://...&uk=https://...&ca=https://...&tag=?ref=x

module.exports = (req, res) => {
  // All Amazon regional stores
  const amazonStores = {
    AU: 'https://www.amazon.com.au',
    GB: 'https://www.amazon.co.uk',
    DE: 'https://www.amazon.de',
    FR: 'https://www.amazon.fr',
    IT: 'https://www.amazon.it',
    ES: 'https://www.amazon.es',
    CA: 'https://www.amazon.ca',
    JP: 'https://www.amazon.co.jp',
    IN: 'https://www.amazon.in',
    NL: 'https://www.amazon.nl',
    SE: 'https://www.amazon.se',
    PL: 'https://www.amazon.pl',
    TR: 'https://www.amazon.com.tr',
    SA: 'https://www.amazon.sa',
    AE: 'https://www.amazon.ae',
    SG: 'https://www.amazon.sg',
    BR: 'https://www.amazon.com.br',
    MX: 'https://www.amazon.com.mx',
    US: 'https://www.amazon.com',
  };

  // Detect visitor's country from Vercel's header (set automatically on every request)
  const visitorCountry = (req.headers['x-vercel-ip-country'] || 'US').toUpperCase();

  const url = new URL(req.url, `https://${req.headers.host}`);
  const path = url.pathname;

  // ── BRAND REDIRECT (/api/brand) ──────────────────────────────────────────
  if (path.endsWith('/brand')) {
    const urlUS = url.searchParams.get('us');
    const urlAU = url.searchParams.get('au');
    const urlUK = url.searchParams.get('uk');
    const urlCA = url.searchParams.get('ca');
    const urlDE = url.searchParams.get('de');
    const tag   = url.searchParams.get('tag') || '';

    if (!urlUS) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Missing required param: us' }));
    }

    // Pick the best URL for this visitor's country, fall back to US
    const brandMap = { AU: urlAU, GB: urlUK, CA: urlCA, DE: urlDE };
    const dest = brandMap[visitorCountry] || urlUS;
    res.setHeader('Cache-Control', 'no-store');
    res.writeHead(302, { Location: dest + tag });
    return res.end();
  }

  // ── AMAZON REDIRECT (/api) ───────────────────────────────────────────────
  const asin = url.searchParams.get('asin');

  // No ASIN → show API docs page
  if (!asin) {
    res.setHeader('Content-Type', 'text/html');
    return res.end(`<!DOCTYPE html><html><head><title>LinkGlobe API</title>
    <style>body{font-family:sans-serif;max-width:680px;margin:60px auto;padding:0 24px;color:#0c0c14}h1{color:#b8965a}h2{margin-top:28px}pre{background:#f6f4f0;padding:16px;border-radius:6px;font-size:13px;overflow-x:auto}p{color:#7a7570;font-size:14px;margin-top:8px;line-height:1.6}</style>
    </head><body>
    <h1>🌏 LinkGlobe API</h1>
    <p>Geo-aware affiliate redirect. Works for creators in any country.</p>
    <h2>Amazon (any region)</h2>
    <pre>/api?asin=B08XYZ1234&au_tag=autag-21&us_tag=ustag-20&uk_tag=uktag-21&ca_tag=catag-21</pre>
    <p>Visitor is auto-detected by country and sent to their local Amazon with the matching tag.</p>
    <h2>Any brand (Charlotte Tilbury, SKIMS etc.)</h2>
    <pre>/api/brand?us=https://brand.com/us/product&au=https://brand.com/au/product&tag=?ref=you</pre>
    <p>Pass each country's URL. Visitor lands on their local version.</p>
    <p style="margin-top:32px"><a href="/dashboard.html" style="color:#b8965a">← Back to dashboard</a></p>
    </body></html>`);
  }

  // Build per-country tag map from query params
  // Supports both au_tag and au-tag style params
  const getTag = (country) =>
    url.searchParams.get(`${country.toLowerCase()}_tag`) ||
    url.searchParams.get(`${country.toLowerCase()}-tag`) ||
    null;

  const tagMap = {};
  ['AU','US','GB','CA','DE','JP','FR','IT','ES','IN','BR','MX','SG','AE','SA'].forEach(c => {
    const t = getTag(c);
    if (t) tagMap[c] = t;
  });

  // Legacy support: ?tag=xxx means US tag
  if (!tagMap.US && url.searchParams.get('tag')) {
    tagMap.US = url.searchParams.get('tag');
  }

  // Need at least one tag
  const allTags = Object.values(tagMap).filter(Boolean);
  if (!allTags.length) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Missing affiliate tags. Provide at least one: au_tag, us_tag, uk_tag, etc.' }));
  }

  // Pick the right Amazon store for the visitor
  const store = amazonStores[visitorCountry] || amazonStores.US;

  // Pick the right affiliate tag for this visitor's country
  // Falls back: visitor country → US → first available tag
  const affiliateTag = tagMap[visitorCountry] || tagMap.US || allTags[0];

  res.setHeader('Cache-Control', 'no-store');
  res.writeHead(302, { Location: `${store}/dp/${asin}?tag=${affiliateTag}` });
  res.end();
};
