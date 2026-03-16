module.exports = (req, res) => {
  const amazonStores = {
    AU: 'https://www.amazon.com.au',
    GB: 'https://www.amazon.co.uk',
    DE: 'https://www.amazon.de',
    FR: 'https://www.amazon.fr',
    CA: 'https://www.amazon.ca',
    JP: 'https://www.amazon.co.jp',
    IN: 'https://www.amazon.in',
    US: 'https://www.amazon.com',
  };

  const url = new URL(req.url, 'https://linkglobe.vercel.app');
  const asin = url.searchParams.get('asin');
  const tag = url.searchParams.get('tag');
  const country = req.headers['x-vercel-ip-country'] || 'US';
  const store = amazonStores[country] || amazonStores['US'];

  if (!asin) {
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
      <h1>🌏 LinkGlobe</h1>
      <p>Smart affiliate links for global audiences.</p>
      <p>Usage: /api/index?asin=PRODUCT_ID&tag=YOUR_AFFILIATE_TAG</p>
    `);
  }

  const redirectUrl = `${store}/dp/${asin}?tag=${tag}`;
  res.writeHead(302, { Location: redirectUrl });
  res.end();
};
