// index.js — LinkGlobe geo-redirect API
// Handles two endpoints:
//   /api?asin=B08XYZ1234&tag=us-tag&au_tag=au-tag&uk_tag=uk-tag&ca_tag=ca-tag
//   /api/brand?us=https://...&au=https://...&uk=https://...&ca=https://...&tag=?ref=x

module.exports = (req, res) => {
  // ---------- AMAZON STORES ----------
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

  // ---------- DETECT COUNTRY ----------
  // Vercel sets x-vercel-ip-country on all requests automatically
  const country = (req.headers['x-vercel-ip-country'] || 'US').toUpperCase();

  // ---------- PARSE URL ----------
  const url = new URL(req.url, `https://${req.headers.host}`);
  const path = url.pathname;

  // ---------- BRAND REDIRECT (/api/brand) ----------
  if (path.endsWith('/brand')) {
    const urlUS = url.searchParams.get('us');
    const urlAU = url.searchParams.get('au');
    const urlUK = url.searchParams.get('uk');
    const urlCA = url.searchParams.get('ca');
    const tag   = url.searchParams.get('tag') || '';

    if (!urlUS) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Missing required parameter: us' }));
    }

    // Pick the best URL for the visitor's country
    const countryUrlMap = {
      AU: urlAU,
      GB: urlUK,
      CA: urlCA,
    };

    const dest = countryUrlMap[country] || urlUS;
    const redirectTo = dest + tag;

    res.setHeader('Cache-Control', 'no-store');
    res.writeHead(302, { Location: redirectTo });
    return res.end();
  }

  // ---------- AMAZON REDIRECT (/api) ----------
  const asin  = url.searchParams.get('asin');
  const tagUS = url.searchParams.get('tag');
  const tagAU = url.searchParams.get('au_tag');
  const tagUK = url.searchParams.get('uk_tag');
  const tagCA = url.searchParams.get('ca_tag');
  const tagDE = url.searchParams.get('de_tag');
  const tagJP = url.searchParams.get('jp_tag');

  // No ASIN = show API docs
  if (!asin) {
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>LinkGlobe API</title><style>
        body { font-family: sans-serif; max-width: 700px; margin: 60px auto; padding: 0 24px; color: #1a1a2e; }
        h1 { color: #4f46e5; }
        code { background: #f0f4ff; padding: 2px 8px; border-radius: 4px; font-size: 14px; }
        pre { background: #f0f4ff; padding: 16px; border-radius: 8px; overflow-x: auto; }
        .label { color: #6b7280; font-size: 13px; }
      </style></head>
      <body>
        <h1>🌏 LinkGlobe API</h1>
        <p>Geo-aware affiliate link redirects. Detect visitor country and send them to the right store.</p>

        <h2>Amazon redirect</h2>
        <pre>/api?asin=B08XYZ1234&amp;tag=ustag-20&amp;au_tag=autag-21&amp;uk_tag=uktag-21&amp;ca_tag=catag-21</pre>
        <p class="label">Parameters: asin (required), tag/us (required), au_tag, uk_tag, ca_tag, de_tag, jp_tag</p>

        <h2>Brand redirect</h2>
        <pre>/api/brand?us=https://brand.com/us/product&amp;au=https://brand.com/au/product&amp;tag=?ref=you</pre>
        <p class="label">Parameters: us (required), au, uk, ca, tag</p>

        <p style="margin-top:32px"><a href="/dashboard.html" style="color:#4f46e5">← Back to dashboard</a></p>
      </body>
      </html>
    `);
  }

  if (!tagUS) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Missing required parameter: tag (US affiliate tag)' }));
  }

  // Pick the right Amazon store for this country
  const store = amazonStores[country] || amazonStores.US;

  // Pick the right affiliate tag for this country
  const countryTagMap = {
    AU: tagAU,
    GB: tagUK,
    CA: tagCA,
    DE: tagDE,
    JP: tagJP,
  };
  const affiliateTag = countryTagMap[country] || tagUS;

  const redirectTo = `${store}/dp/${asin}?tag=${affiliateTag}`;

  res.setHeader('Cache-Control', 'no-store');
  res.writeHead(302, { Location: redirectTo });
  res.end();
};
