// index.js — LinkGlobe geo-redirect API
// Handles:
//   /api?asin=B08XYZ1234&tag=us-20&au_tag=au-21&uk_tag=uk-21&ca_tag=ca-21
//   /api/brand?us=https://...&au=https://...&uk=https://...&tag=?ref=x

module.exports = (req, res) => {
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
    US: 'https://www.amazon.com',
  };

  // Vercel sets x-vercel-ip-country on every request automatically
  const country = (req.headers['x-vercel-ip-country'] || 'US').toUpperCase();
  const url = new URL(req.url, `https://${req.headers.host}`);
  const path = url.pathname;

  // ── BRAND REDIRECT (/api/brand) ──────────────────────────
  if (path.endsWith('/brand')) {
    const urlUS = url.searchParams.get('us');
    const urlAU = url.searchParams.get('au');
    const urlUK = url.searchParams.get('uk');
    const urlCA = url.searchParams.get('ca');
    const tag   = url.searchParams.get('tag') || '';

    if (!urlUS) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Missing required param: us' }));
    }

    const dest = { AU: urlAU, GB: urlUK, CA: urlCA }[country] || urlUS;
    res.setHeader('Cache-Control', 'no-store');
    res.writeHead(302, { Location: dest + tag });
    return res.end();
  }

  // ── AMAZON REDIRECT (/api) ───────────────────────────────
  const asin  = url.searchParams.get('asin');
  const tagUS = url.searchParams.get('tag');
  const tagAU = url.searchParams.get('au_tag');
  const tagUK = url.searchParams.get('uk_tag');
  const tagCA = url.searchParams.get('ca_tag');
  const tagDE = url.searchParams.get('de_tag');
  const tagJP = url.searchParams.get('jp_tag');

  // No ASIN → show API docs
  if (!asin) {
    res.setHeader('Content-Type', 'text/html');
    return res.end(`<!DOCTYPE html><html><head><title>LinkGlobe API</title>
    <style>body{font-family:sans-serif;max-width:680px;margin:60px auto;padding:0 24px;color:#0c0c14}h1{color:#b8965a}pre{background:#f6f4f0;padding:16px;border-radius:6px;overflow-x:auto;font-size:13px}</style>
    </head><body>
    <h1>🌏 LinkGlobe API</h1>
    <p>Geo-aware affiliate link redirects.</p>
    <h2>Amazon</h2>
    <pre>/api?asin=B08XYZ1234&tag=ustag-20&au_tag=autag-21&uk_tag=uktag-21&ca_tag=catag-21</pre>
    <h2>Any brand</h2>
    <pre>/api/brand?us=https://brand.com/us/product&au=https://brand.com/au/product&tag=?ref=you</pre>
    <p><a href="/dashboard.html" style="color:#b8965a">← Dashboard</a></p>
    </body></html>`);
  }

  if (!tagUS) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Missing required param: tag (US affiliate tag)' }));
  }

  const store = amazonStores[country] || amazonStores.US;
  const affiliateTag = { AU: tagAU, GB: tagUK, CA: tagCA, DE: tagDE, JP: tagJP }[country] || tagUS;

  res.setHeader('Cache-Control', 'no-store');
  res.writeHead(302, { Location: `${store}/dp/${asin}?tag=${affiliateTag}` });
  res.end();
};
