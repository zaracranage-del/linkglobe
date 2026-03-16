const express = require('express');
const app = express();

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

app.get('/redirect', (req, res) => {
  const { asin, tag } = req.query;
  const country = req.headers['x-vercel-ip-country'] || 'US';
  const store = amazonStores[country] || amazonStores['US'];
  const redirectUrl = `${store}/dp/${asin}?tag=${tag}`;
  res.redirect(redirectUrl);
});

app.get('/', (req, res) => {
  res.send(`
    <h1>🌏 LinkGlobe</h1>
    <p>Smart affiliate links for global audiences.</p>
    <p>Usage: /redirect?asin=PRODUCT_ID&tag=YOUR_AFFILIATE_TAG</p>
  `);
});

module.exports = app;
