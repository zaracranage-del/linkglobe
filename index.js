<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LinkGlobe – Every fan. Every country. Full commission.</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink: #0c0c14;
      --soft: #f6f4f0;
      --cream: #fdfbf8;
      --gold: #b8965a;
      --gold-light: #e8d9be;
      --gold-pale: #faf5ec;
      --muted: #7a7570;
      --border: #e5e0d8;
      --white: #ffffff;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Outfit', sans-serif; background: var(--cream); color: var(--ink); }

    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      display: flex; justify-content: space-between; align-items: center;
      padding: 0 60px; height: 68px;
      background: rgba(253,251,248,0.92); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: var(--ink); text-decoration: none; letter-spacing: -0.5px; }
    .logo em { color: var(--gold); font-style: italic; }
    .nav-links { display: flex; align-items: center; gap: 36px; }
    .nav-links a { color: var(--muted); text-decoration: none; font-size: 14px; transition: color 0.2s; }
    .nav-links a:hover { color: var(--ink); }
    .nav-cta { background: var(--ink); color: white !important; padding: 10px 24px; border-radius: 4px; font-size: 14px; font-weight: 500; }
    .nav-cta:hover { background: #1c1c2c !important; }

    .hero {
      min-height: 100vh; display: flex; flex-direction: column;
      justify-content: center; align-items: center; text-align: center;
      padding: 120px 40px 80px; position: relative; overflow: hidden;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse 60% 40% at 50% 20%, rgba(184,150,90,0.1) 0%, transparent 60%);
    }
    .hero::after {
      content: ''; position: absolute; inset: 0; opacity: 0.035;
      background-image: repeating-linear-gradient(90deg, var(--ink) 0px, var(--ink) 1px, transparent 1px, transparent 80px);
    }
    .hero-content { position: relative; z-index: 1; max-width: 860px; }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      border: 1px solid var(--gold-light); background: var(--gold-pale);
      color: var(--gold); font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
      padding: 7px 18px; border-radius: 2px; margin-bottom: 36px;
    }
    .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); }
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(52px, 8vw, 96px); font-weight: 700;
      line-height: 0.95; color: var(--ink); margin-bottom: 32px; letter-spacing: -2px;
    }
    h1 em { color: var(--gold); font-style: italic; }
    .hero-sub { font-size: 18px; color: var(--muted); max-width: 500px; margin: 0 auto 52px; line-height: 1.75; font-weight: 300; }
    .hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .btn-dark { background: var(--ink); color: white; text-decoration: none; padding: 17px 40px; border-radius: 4px; font-size: 15px; font-weight: 500; letter-spacing: 0.3px; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 2px 20px rgba(12,12,20,0.2); }
    .btn-dark:hover { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(12,12,20,0.25); }
    .btn-outline { background: transparent; color: var(--ink); text-decoration: none; padding: 17px 40px; border-radius: 4px; font-size: 15px; border: 1px solid var(--border); transition: border-color 0.2s; }
    .btn-outline:hover { border-color: var(--ink); }

    .marquee-wrap { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--white); padding: 16px 0; overflow: hidden; }
    .marquee-track { display: flex; gap: 48px; white-space: nowrap; animation: marquee 24s linear infinite; }
    .marquee-track span { font-size: 13px; color: var(--muted); letter-spacing: 0.5px; flex-shrink: 0; }
    .marquee-track span strong { color: var(--ink); font-weight: 500; }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    .s { padding: 100px 60px; max-width: 1200px; margin: 0 auto; }
    .stag { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
    .stitle { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 54px); font-weight: 700; line-height: 1.05; letter-spacing: -1px; margin-bottom: 20px; }
    .stitle em { color: var(--gold); font-style: italic; }
    .ssub { font-size: 17px; color: var(--muted); max-width: 480px; line-height: 1.7; font-weight: 300; }

    /* HOW IT WORKS */
    .hiw-bg { background: var(--ink); }
    .hiw-inner { max-width: 1200px; margin: 0 auto; padding: 100px 60px; }
    .hiw-inner .stitle { color: white; }
    .hiw-inner .ssub { color: rgba(255,255,255,0.45); }
    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 60px; }
    .step { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); padding: 40px; position: relative; }
    .step:first-child { border-radius: 4px 0 0 4px; }
    .step:last-child { border-radius: 0 4px 4px 0; }
    .stepn { font-family: 'Cormorant Garamond', serif; font-size: 64px; font-weight: 700; color: rgba(184,150,90,0.18); line-height: 1; margin-bottom: 20px; }
    .step h3 { font-size: 17px; font-weight: 600; color: white; margin-bottom: 10px; }
    .step p { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.7; }
    .sarr { position: absolute; right: -14px; top: 50%; transform: translateY(-50%); width: 28px; height: 28px; border-radius: 50%; background: var(--ink); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 13px; z-index: 1; }

    /* FEATURES */
    .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 60px; }
    .feat { background: var(--white); border: 1px solid var(--border); border-radius: 4px; padding: 36px; transition: transform 0.2s, box-shadow 0.2s; }
    .feat:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.07); }
    .feat-icon { font-size: 22px; margin-bottom: 16px; }
    .feat h3 { font-size: 16px; font-weight: 600; margin-bottom: 10px; }
    .feat p { font-size: 14px; color: var(--muted); line-height: 1.7; }

    /* PRICING */
    .pricing-bg { background: var(--soft); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 60px; }
    .pc { background: var(--white); border: 1px solid var(--border); border-radius: 4px; padding: 40px; position: relative; transition: transform 0.2s; }
    .pc:hover { transform: translateY(-3px); }
    .pc.hot { background: var(--ink); border-color: var(--ink); transform: scale(1.03); }
    .pc.hot:hover { transform: scale(1.03) translateY(-3px); }
    .pc-badge { position: absolute; top: -13px; left: 50%; transform: translateX(-50%); background: var(--gold); color: white; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 14px; border-radius: 2px; white-space: nowrap; }
    .pc-name { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
    .pc.hot .pc-name { color: rgba(255,255,255,0.45); }
    .pc-price { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 700; line-height: 1; color: var(--ink); margin-bottom: 4px; letter-spacing: -1px; }
    .pc.hot .pc-price { color: white; }
    .pc-price sup { font-size: 22px; vertical-align: top; margin-top: 12px; display: inline-block; }
    .pc-price sub { font-size: 15px; font-family: 'Outfit', sans-serif; font-weight: 400; color: var(--muted); }
    .pc.hot .pc-price sub { color: rgba(255,255,255,0.35); }
    .pc-desc { font-size: 13px; color: var(--muted); margin-bottom: 28px; line-height: 1.5; }
    .pc.hot .pc-desc { color: rgba(255,255,255,0.4); }
    .pc-feats { list-style: none; margin-bottom: 32px; display: flex; flex-direction: column; gap: 11px; }
    .pc-feats li { font-size: 14px; color: var(--ink); display: flex; align-items: flex-start; gap: 10px; line-height: 1.4; }
    .pc.hot .pc-feats li { color: rgba(255,255,255,0.75); }
    .pc-feats li::before { content: '✓'; color: var(--gold); font-weight: 700; flex-shrink: 0; }
    .pc-feats li.off { color: var(--muted); }
    .pc-feats li.off::before { content: '–'; color: var(--border); }
    .pc.hot .pc-feats li.off { color: rgba(255,255,255,0.2); }
    .pc.hot .pc-feats li.off::before { color: rgba(255,255,255,0.1); }
    .btn-plan { display: block; text-align: center; text-decoration: none; padding: 14px; border-radius: 4px; font-size: 14px; font-weight: 500; transition: all 0.2s; border: 1px solid var(--border); color: var(--ink); background: var(--soft); }
    .btn-plan:hover { background: var(--ink); color: white; border-color: var(--ink); }
    .btn-plan.gold { background: var(--gold); color: white; border-color: var(--gold); }
    .btn-plan.gold:hover { background: #a0804a; }

    /* TESTIMONIALS */
    .proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 60px; }
    .proof { background: var(--white); border: 1px solid var(--border); border-radius: 4px; padding: 32px; }
    .proof-stars { color: var(--gold); font-size: 13px; margin-bottom: 14px; letter-spacing: 2px; }
    .proof-text { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; line-height: 1.55; color: var(--ink); margin-bottom: 22px; }
    .proof-author { display: flex; align-items: center; gap: 12px; }
    .proof-av { width: 36px; height: 36px; border-radius: 50%; background: var(--gold-pale); border: 1px solid var(--gold-light); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: var(--gold); }
    .proof-nm { font-size: 13px; font-weight: 500; }
    .proof-hn { font-size: 12px; color: var(--muted); }

    /* CTA BANNER */
    .cta-bg { background: var(--ink); text-align: center; padding: 120px 60px; position: relative; overflow: hidden; }
    .cta-bg::before { content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 600px; height: 400px; background: radial-gradient(ellipse, rgba(184,150,90,0.15) 0%, transparent 70%); }
    .cta-bg h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 5vw, 64px); font-weight: 700; color: white; line-height: 1.05; letter-spacing: -1.5px; margin-bottom: 20px; position: relative; }
    .cta-bg h2 em { color: var(--gold); font-style: italic; }
    .cta-bg p { font-size: 17px; color: rgba(255,255,255,0.4); margin-bottom: 44px; position: relative; }
    .btn-gold { background: var(--gold); color: white; text-decoration: none; padding: 18px 44px; border-radius: 4px; font-size: 15px; font-weight: 500; display: inline-block; transition: background 0.2s, transform 0.15s; position: relative; }
    .btn-gold:hover { background: #a0804a; transform: translateY(-2px); }

    footer { background: var(--ink); border-top: 1px solid rgba(255,255,255,0.06); padding: 40px 60px; display: flex; justify-content: space-between; align-items: center; }
    footer .logo { color: rgba(255,255,255,0.55); font-size: 20px; }
    footer p { font-size: 13px; color: rgba(255,255,255,0.25); }
    footer nav a { color: rgba(255,255,255,0.35); text-decoration: none; font-size: 13px; margin-left: 24px; transition: color 0.2s; }
    footer nav a:hover { color: rgba(255,255,255,0.75); }

    @media (max-width: 900px) {
      nav { padding: 0 24px; }
      .nav-links a:not(.nav-cta) { display: none; }
      .s, .hiw-inner { padding: 72px 24px; }
      .steps, .feat-grid, .price-grid, .proof-grid { grid-template-columns: 1fr; }
      .step { border-radius: 4px !important; }
      .sarr { display: none; }
      .pc.hot { transform: scale(1); }
      .cta-bg { padding: 80px 24px; }
      footer { flex-direction: column; gap: 16px; text-align: center; padding: 40px 24px; }
      footer nav a { margin: 0 10px; }
    }
  </style>
</head>
<body>

<nav>
  <a href="/" class="logo">Link<em>Globe</em></a>
  <div class="nav-links">
    <a href="#how-it-works">How it works</a>
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a href="/onboarding.html" class="nav-cta">Get started free</a>
  </div>
</nav>

<section class="hero">
  <div class="hero-content">
    <div class="eyebrow"><span class="eyebrow-dot"></span>For influencers & content creators</div>
    <h1>Every fan.<br><em>Every country.</em><br>Full commission.</h1>
    <p class="hero-sub">Stop losing sales when your followers click US affiliate links from Australia, the UK, or Canada. One link. Every country. Automatically.</p>
    <div class="hero-actions">
      <a href="/onboarding.html" class="btn-dark">Start for free →</a>
      <a href="#how-it-works" class="btn-outline">See how it works</a>
    </div>
  </div>
</section>

<div class="marquee-wrap">
  <div class="marquee-track">
    <span>✦ <strong>Amazon</strong> all regions</span><span>✦ <strong>Charlotte Tilbury</strong></span><span>✦ <strong>SKIMS</strong></span><span>✦ <strong>Sephora</strong></span><span>✦ <strong>ASOS</strong></span><span>✦ <strong>Revolve</strong></span><span>✦ <strong>Net-A-Porter</strong></span><span>✦ Auto geo-redirect</span>
    <span>✦ <strong>Amazon</strong> all regions</span><span>✦ <strong>Charlotte Tilbury</strong></span><span>✦ <strong>SKIMS</strong></span><span>✦ <strong>Sephora</strong></span><span>✦ <strong>ASOS</strong></span><span>✦ <strong>Revolve</strong></span><span>✦ <strong>Net-A-Porter</strong></span><span>✦ Auto geo-redirect</span>
  </div>
</div>

<div class="hiw-bg" id="how-it-works">
  <div class="hiw-inner">
    <p class="stag">How it works</p>
    <h2 class="stitle" style="color:white">Three steps to never<br><em>lose a commission</em> again.</h2>
    <p class="ssub">No tech knowledge needed. You just paste links — we handle everything else.</p>
    <div class="steps">
      <div class="step">
        <div class="stepn">01</div>
        <h3>Create your storefront</h3>
        <p>Sign up in 2 minutes. Add your name, photo, and Amazon affiliate tags once. You never touch the settings again.</p>
        <div class="sarr">→</div>
      </div>
      <div class="step">
        <div class="stepn">02</div>
        <h3>Paste any product link</h3>
        <p>Just paste the URL of any product you love — Amazon, Charlotte Tilbury, SKIMS, anything. We add it to your store instantly.</p>
        <div class="sarr">→</div>
      </div>
      <div class="step">
        <div class="stepn">03</div>
        <h3>Share one link everywhere</h3>
        <p>Share your page in your bio. Australian fans land on amazon.com.au with your AU tag. UK fans get amazon.co.uk. Full commission, every time.</p>
      </div>
    </div>
  </div>
</div>

<section class="s" id="features">
  <p class="stag">Features</p>
  <h2 class="stitle">Built for creators<br>who sell <em>globally.</em></h2>
  <p class="ssub">Everything to monetise a worldwide audience — without any technical knowledge.</p>
  <div class="feat-grid">
    <div class="feat"><div class="feat-icon">🌍</div><h3>Automatic geo-detection</h3><p>We detect each fan's country via their IP and redirect to the correct store in milliseconds. Completely invisible to them.</p></div>
    <div class="feat"><div class="feat-icon">💰</div><h3>Per-country affiliate tags</h3><p>Amazon AU, UK, CA, and US are separate affiliate programs. LinkGlobe applies the right tag per country so you earn every commission.</p></div>
    <div class="feat"><div class="feat-icon">🛍️</div><h3>Beautiful storefront</h3><p>Your fans see a stunning product shop with your photo, bio, and curated picks — not a boring list of links.</p></div>
    <div class="feat"><div class="feat-icon">⚡</div><h3>Instant setup</h3><p>Paste a product URL and it's live on your store in seconds. No ASINs, no spreadsheets, no tech headaches.</p></div>
    <div class="feat"><div class="feat-icon">📊</div><h3>Click analytics</h3><p>See which products get the most clicks, which countries your audience is in, and how commissions are trending. (Creator & Pro plans)</p></div>
    <div class="feat"><div class="feat-icon">🔗</div><h3>Custom domain</h3><p>Use your own domain — yourname.com — instead of linkglobe.app/you. Makes your brand look polished and professional. (Pro plan)</p></div>
  </div>
</section>

<div class="pricing-bg" id="pricing">
  <div class="s">
    <p class="stag">Pricing</p>
    <h2 class="stitle">Simple pricing.<br>Keep what you <em>earn.</em></h2>
    <p class="ssub">Start free. Upgrade when you're ready. No hidden fees, no commission cuts — ever.</p>
    <div class="price-grid">
      <div class="pc">
        <div class="pc-name">Free</div>
        <div class="pc-price"><sup>$</sup>0<sub>/mo</sub></div>
        <p class="pc-desc">Get started and test with your first followers.</p>
        <ul class="pc-feats">
          <li>Up to 5 products</li>
          <li>Geo-redirect for Amazon</li>
          <li>Basic storefront page</li>
          <li>All countries supported</li>
          <li class="off">Click analytics</li>
          <li class="off">Custom colours & branding</li>
          <li class="off">Custom domain</li>
        </ul>
        <a href="/onboarding.html" class="btn-plan">Get started free</a>
      </div>
      <div class="pc hot">
        <div class="pc-badge">Most popular</div>
        <div class="pc-name">Creator</div>
        <div class="pc-price"><sup>$</sup>12<sub>/mo</sub></div>
        <p class="pc-desc">For active creators maximising their global commissions.</p>
        <ul class="pc-feats">
          <li>Unlimited products</li>
          <li>Geo-redirect for all brands</li>
          <li>Storefront + custom colours</li>
          <li>All countries supported</li>
          <li>Click analytics dashboard</li>
          <li>Priority email support</li>
          <li class="off">Custom domain</li>
        </ul>
        <a href="/onboarding.html?plan=creator" class="btn-plan gold">Start 14-day free trial →</a>
      </div>
      <div class="pc">
        <div class="pc-name">Pro</div>
        <div class="pc-price"><sup>$</sup>29<sub>/mo</sub></div>
        <p class="pc-desc">For full-time creators and agencies managing multiple stores.</p>
        <ul class="pc-feats">
          <li>Everything in Creator</li>
          <li>Custom domain (yourname.com)</li>
          <li>Advanced analytics & exports</li>
          <li>Multiple storefronts</li>
          <li>Remove LinkGlobe branding</li>
          <li>API access</li>
          <li>Dedicated support</li>
        </ul>
        <a href="/onboarding.html?plan=pro" class="btn-plan">Get Pro</a>
      </div>
    </div>
  </div>
</div>

<section class="s">
  <p class="stag">What creators say</p>
  <h2 class="stitle">Loved by creators<br>all over the <em>world.</em></h2>
  <div class="proof-grid">
    <div class="proof">
      <div class="proof-stars">★★★★★</div>
      <p class="proof-text">"I was losing half my Amazon commissions because my AU followers couldn't buy from my US links. LinkGlobe fixed it in 5 minutes."</p>
      <div class="proof-author"><div class="proof-av">S</div><div><div class="proof-nm">Sophie R.</div><div class="proof-hn">Beauty creator · 180K followers</div></div></div>
    </div>
    <div class="proof">
      <div class="proof-stars">★★★★★</div>
      <p class="proof-text">"My UK fans finally land on the right Charlotte Tilbury page. My commission went up 40% in the first month."</p>
      <div class="proof-author"><div class="proof-av">M</div><div><div class="proof-nm">Mia T.</div><div class="proof-hn">Lifestyle creator · 92K followers</div></div></div>
    </div>
    <div class="proof">
      <div class="proof-stars">★★★★★</div>
      <p class="proof-text">"I never understood affiliate links. LinkGlobe does it all — I just paste the product and it works everywhere."</p>
      <div class="proof-author"><div class="proof-av">J</div><div><div class="proof-nm">Jade K.</div><div class="proof-hn">Fashion creator · 340K followers</div></div></div>
    </div>
  </div>
</section>

<div class="cta-bg">
  <h2>Ready to stop losing<br><em>commissions?</em></h2>
  <p>Free to start. Takes 2 minutes. No credit card needed.</p>
  <a href="/onboarding.html" class="btn-gold">Create your storefront →</a>
</div>

<footer>
  <a href="/" class="logo">Link<em>Globe</em></a>
  <p>© 2025 LinkGlobe · Built for creators</p>
  <nav>
    <a href="#pricing">Pricing</a>
    <a href="/onboarding.html">Sign up</a>
    <a href="/dashboard.html">Dashboard</a>
  </nav>
</footer>

</body>
</html>
