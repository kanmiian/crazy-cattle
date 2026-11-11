import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDir, '..');
const distDir = path.join(projectRoot, 'dist');
const gamesDir = path.join(projectRoot, 'src', 'content', 'games');
const siteDir = path.join(projectRoot, 'src', 'content', 'site');

const BASE_URL = 'https://cattlecrazy3d.com';

// 逃逸 HTML
const escapeHtml = (str = '') => String(str)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

async function runPrerender() {
  console.log('Starting static pre-rendering for all routes...');

  const templateHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');

  // 读取所有热游 json
  const { readdir } = await import('node:fs/promises');
  const gameFiles = (await readdir(gamesDir)).filter(f => f.endsWith('.json'));
  const games = await Promise.all(
    gameFiles.map(async f => JSON.parse(await readFile(path.join(gamesDir, f), 'utf8')))
  );

  const staticSitemap = JSON.parse(await readFile(path.join(siteDir, 'static-sitemap.json'), 'utf8'));

  // 维护全站元数据与预渲染正文的字典
  const routesData = new Map();

  // 1. 首页
  routesData.set('/', {
    title: 'Crazy Cattle 3D Unblocked - Play Online Free (2026) | All 3 Maps',
    description: 'Play Crazy Cattle 3D unblocked online for free in your browser (2026). Master physics-based sheep battle royale across Ireland, Iceland & New Zealand maps with no download needed!',
    canonical: `${BASE_URL}/`,
    h1: '🐄 Crazy Cattle 3D - Sheep Battle Royale',
    contentHtml: `
      <header class="hero">
        <h1>🐄 Crazy Cattle 3D - Sheep Battle Royale</h1>
        <p class="tagline">Experience the wildest sheep and cattle chaos simulator online! Play Crazy Cattle 3D now and join the ultimate physics-based battle royale where sheep and cattle compete for survival across Ireland, Iceland, and New Zealand!</p>
        <div class="button-group">
          <a href="#game" class="btn"><span>🎮</span> Play Now</a>
          <a href="/crazy-cattle-3d-unblocked" class="btn secondary"><span>🔓</span> Unblocked Mode</a>
          <a href="/crazy-cattle-3d-guide" class="btn secondary"><span>📖</span> Strategy Guide</a>
        </div>
      </header>
      <section id="game" class="iframe-section">
        <div class="game-placeholder">
          <img src="/images/crazycattle-preview.webp" alt="Crazy Cattle 3D Preview" class="preview-img" />
          <a href="#game" class="play-button"><span>▶️</span> Click to Play Game</a>
        </div>
      </section>
      <section class="hub-quick-features" style="max-width:1200px;margin:2rem auto;padding:0 1rem;">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px;margin-bottom:1.5rem;color:#1e40af;">
          <strong>💻 Best Desktop Experience:</strong> Crazy Cattle 3D momentum physics are optimized for keyboard (WASD) and mouse. Playing on smartphone? <a href="/crazy-cattle-3d-mobile" style="color:#2563eb;font-weight:700;">Open Mobile Edition &rarr;</a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:1rem;">
          <a href="/crazy-cattle-3d-unblocked" class="feature-card" style="text-decoration:none;color:inherit;padding:16px;">
            <h4 style="color:#2563eb;margin:0 0 6px 0;">🔓 Unblocked Mode</h4>
            <p style="margin:0;font-size:0.88rem;color:#475569;">Play on school Chromebooks and restricted networks without downloads.</p>
          </a>
          <a href="/crazy-cattle-3d-guide" class="feature-card" style="text-decoration:none;color:inherit;padding:16px;">
            <h4 style="color:#2563eb;margin:0 0 6px 0;">📖 Strategy &amp; Maps</h4>
            <p style="margin:0;font-size:0.88rem;color:#475569;">Master Ireland hills, Iceland drop-offs, and New Zealand mountain peaks.</p>
          </a>
          <a href="/crazy-cattle-3d-download" class="feature-card" style="text-decoration:none;color:inherit;padding:16px;">
            <h4 style="color:#2563eb;margin:0 0 6px 0;">⬇️ Official PC Build</h4>
            <p style="margin:0;font-size:0.88rem;color:#475569;">Support creator Anna Mayberry on itch.io for offline PC play.</p>
          </a>
          <a href="/cattle-crazy-3d" class="feature-card" style="text-decoration:none;color:inherit;padding:16px;">
            <h4 style="color:#2563eb;margin:0 0 6px 0;">🐄 Cattle Crazy Hub</h4>
            <p style="margin:0;font-size:0.88rem;color:#475569;">Search term disambiguation, mirror safety, and community guidance.</p>
          </a>
        </div>
      </section>
      <section class="about-section" style="max-width:1200px;margin:0 auto;padding:1rem;">
        <h2>📘 About Crazy Cattle 3D Physics Simulation</h2>
        <p>Crazy Cattle 3D is a physics-driven arena game where players control energetic sheep competing for survival across three distinct maps: the rolling grassy hills of Ireland, the hazardous volcanic cliffs of Iceland, and the vertical ridges of New Zealand. Unlike typical battle royales relying on random loot, victory in Crazy Cattle 3D depends entirely on timing, angular momentum, and utilizing terrain slopes to knock rivals out of bounds.</p>
      </section>
    `
  });

  // 2. 5 个新增核心专题页
  routesData.set('/crazy-cattle-3d-unblocked', {
    title: 'Crazy Cattle 3D Unblocked - Play Free at School & Work (2026)',
    description: 'Play Crazy Cattle 3D unblocked online for free! Enjoy the physics battle royale on school Chromebooks and restricted networks without downloads or installation.',
    canonical: `${BASE_URL}/crazy-cattle-3d-unblocked`,
    contentHtml: `
      <div class="game-page unblocked-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>🔓 Crazy Cattle 3D Unblocked – Play Free at School &amp; Work</h1>
        <p>Welcome to the unblocked edition of Crazy Cattle 3D! Built using pure client-side WebGL canvas technology, this version bypasses firewall restrictions, administrator password requirements, and application download blocks on school Chromebooks and corporate networks.</p>
        <h2>Why Play Crazy Cattle 3D Unblocked?</h2>
        <ul>
          <li><strong>Zero Installation:</strong> Runs instantly inside Chrome, Edge, Safari, and Firefox.</li>
          <li><strong>Chromebook Optimized:</strong> Lightweight 3D geometry runs smoothly on 4GB RAM devices.</li>
          <li><strong>All 3 Maps Included:</strong> Access Ireland, Iceland, and New Zealand arenas with full physics simulation intact.</li>
        </ul>
        <div style="margin-top:2rem;"><a href="/" class="btn primary">Play Crazy Cattle 3D Online Now</a></div>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-online', {
    title: 'Crazy Cattle 3D Online - Play Free Browser Game (2026)',
    description: 'Play Crazy Cattle 3D online directly in your browser. Fast WebGL loading, zero downloads, and responsive physics battle royale action on PC and Mac.',
    canonical: `${BASE_URL}/crazy-cattle-3d-online`,
    contentHtml: `
      <div class="game-page online-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>🌐 Crazy Cattle 3D Online – Free Browser Battle Royale</h1>
        <p>Play Crazy Cattle 3D online without downloading executable files. Experience real-time ragdoll physics, momentum downhill strikes, and intense last-animal-standing competition on modern browsers.</p>
        <h2>Instant WebGL Browser Performance</h2>
        <p>Our online portal compiles the physics calculations client-side into your browser memory, offering responsive 60 FPS sheep collisions with zero netcode latency.</p>
        <p><a href="/" class="btn primary">Launch Online Game</a> <a href="/crazy-cattle-3d-guide" class="btn secondary">View Strategy Guide</a></p>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-download', {
    title: 'Crazy Cattle 3D Download - Official PC & Mac Version (itch.io)',
    description: 'Learn how to download Crazy Cattle 3D for PC. Find the official itch.io page by creator Anna Mayberry, system requirements, and instant browser play alternatives.',
    canonical: `${BASE_URL}/crazy-cattle-3d-download`,
    contentHtml: `
      <div class="game-page download-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>⬇️ Crazy Cattle 3D Download &amp; PC Installation Guide</h1>
        <p>Looking for an offline version of Crazy Cattle 3D? We provide honest directions to the official standalone desktop release created by independent game developer Anna Mayberry on itch.io.</p>
        <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px;margin:1.5rem 0;">
          <strong>Official Source:</strong> The genuine Crazy Cattle 3D desktop files are published on <a href="https://annamayberry.itch.io/crazy-cattle-3d" target="_blank" rel="noopener noreferrer">Anna Mayberry's itch.io page</a>. We do not distribute pirated or modified installers.
        </div>
        <p><a href="/" class="btn primary">Play Free Online Without Downloading</a></p>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-guide', {
    title: 'Crazy Cattle 3D Strategy Guide - Controls, Maps & Pro Tips',
    description: 'Master Crazy Cattle 3D with our comprehensive guide! Detailed breakdown of Ireland, Iceland, and New Zealand maps, physics controls, and winning combat tactics.',
    canonical: `${BASE_URL}/crazy-cattle-3d-guide`,
    contentHtml: `
      <div class="game-page guide-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>📖 Crazy Cattle 3D Strategy Guide: Maps, Controls &amp; Tactics</h1>
        <p>Master the momentum-based physics of Crazy Cattle 3D. Learn how velocity, incline angles, and map hazards can give you the winning edge.</p>
        <h2>Controls &amp; Movement Basics</h2>
        <p>Use WASD or Arrow Keys for steering and building linear speed. Press Spacebar for an explosive forward ram or aerial leap. Use mouse tracking to anticipate AI rush angles.</p>
        <h2>Map Breakdown</h2>
        <ul>
          <li><strong>Ireland:</strong> Gentle rolling hills. Build downhill momentum to launch devastating high-speed impacts.</li>
          <li><strong>Iceland:</strong> Hazardous volcanic rock and deadly perimeter abysses. Sidestep rushing AI sheep to send them tumbling over the edge.</li>
          <li><strong>New Zealand:</strong> Steep mountainous cliffs requiring aerial recovery and careful edge balance.</li>
        </ul>
        <p><a href="/" class="btn primary">Practice in Live Arena</a></p>
      </div>
    `
  });

  routesData.set('/cattle-crazy-3d', {
    title: 'Cattle Crazy 3D - Play Online & Domain Guide (cattlecrazy3d.com)',
    description: 'Searching for Cattle Crazy 3D? Play the viral physics battle royale online free. Understand the differences between cattlecrazy3d.com and other mirror sites.',
    canonical: `${BASE_URL}/cattle-crazy-3d`,
    contentHtml: `
      <div class="game-page cattle-crazy-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>🐄 Cattle Crazy 3D – Play Online &amp; Official Fan Hub</h1>
        <p>Whether you search for "Cattle Crazy 3D" or "Crazy Cattle 3D", enjoy the viral physics sheep battle royale free in your browser. This portal distinguishes genuine fan guides from clone mirror sites.</p>
        <h2>Domain Transparency Notice</h2>
        <p><strong>cattlecrazy3d.com</strong> is an independent fan community providing fast browser play and comprehensive map walkthroughs. The original creator is indie developer Anna Mayberry.</p>
        <p><a href="/" class="btn primary">Play Cattle Crazy 3D Now</a></p>
      </div>
    `
  });

  // 3. 静态信息页
  routesData.set('/about', {
    title: 'About Crazy Cattle 3D | Independent Guide & Gameplay Portal',
    description: 'Discover Crazy Cattle 3D, the physics sheep battle royale by indie developer Anna Mayberry. Learn about our independent fan guide and online play portal.',
    canonical: `${BASE_URL}/about`,
    contentHtml: `
      <div class="about-section" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>About Crazy Cattle 3D</h1>
        <p>Welcome to Crazy Cattle 3D, the ultimate physics-based battle royale where chaotic momentum and sheep collide!</p>
        <div style="background:#f8fafc;border-left:4px solid #3b82f6;padding:16px;margin:1.5rem 0;">
          <h3>Transparency &amp; Attribution Notice</h3>
          <p>cattlecrazy3d.com is an independent fan community and gameplay guide site. The original Crazy Cattle 3D was created by indie developer <strong>Anna Mayberry</strong>. The official standalone desktop build is hosted on <a href="https://annamayberry.itch.io/crazy-cattle-3d" target="_blank" rel="noopener noreferrer">Anna Mayberry on itch.io</a>.</p>
        </div>
      </div>
    `
  });

  routesData.set('/faq', {
    title: 'FAQ | Crazy Cattle 3D Game Help & Information',
    description: 'Get verified answers about Crazy Cattle 3D gameplay, controls, unblocked access, mobile play, and developer attribution.',
    canonical: `${BASE_URL}/faq`,
    contentHtml: `
      <div class="faq-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>Crazy Cattle 3D FAQ &amp; Player Guide</h1>
        <h2>Essential Player Questions</h2>
        <div class="faq-item"><h3>Is Crazy Cattle 3D completely free to play?</h3><p>Yes, 100% free with no microtransactions.</p></div>
        <div class="faq-item"><h3>Can I play Crazy Cattle 3D unblocked at school?</h3><p>Yes, runs in standard WebGL without software installation.</p></div>
        <div class="faq-item"><h3>Do I need to download files to play?</h3><p>No download is required to play online in your browser.</p></div>
        <div class="faq-item"><h3>Can I play Crazy Cattle 3D on mobile?</h3><p>Yes, mobile touch interface is supported on modern phone browsers, though desktop keyboard (WASD) is recommended for best physics control.</p></div>
        <div class="faq-item"><h3>Is Crazy Cattle 3D multiplayer or single-player against AI?</h3><p>Currently single-player battle royale against a herd of simulated AI bots. Real-time multiplayer is in experimental development.</p></div>
      </div>
    `
  });

  routesData.set('/contact', {
    title: 'Contact Us | Crazy Cattle 3D Support Team',
    description: 'Need help with Crazy Cattle 3D? Our support team is here to assist you with technical issues, bug reports, or general inquiries.',
    canonical: `${BASE_URL}/contact`,
    contentHtml: `
      <div style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>Contact Crazy Cattle 3D Community Support</h1>
        <p>Have feedback, bug reports, or partnership inquiries? Reach out to our community team.</p>
      </div>
    `
  });

  routesData.set('/privacy-policy', {
    title: 'Privacy Policy | Crazy Cattle 3D Game',
    description: 'Read how Crazy Cattle 3D protects your privacy and handles game data. Learn about our data collection practices and user rights.',
    canonical: `${BASE_URL}/privacy-policy`,
    contentHtml: `
      <div style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>Privacy Policy</h1>
        <p>This privacy policy explains how cattlecrazy3d.com collects, uses, and safeguards user information when you play browser games on our platform.</p>
      </div>
    `
  });

  routesData.set('/terms-of-service', {
    title: 'Terms of Service | Crazy Cattle 3D Game',
    description: 'Review Crazy Cattle 3D\'s terms of service. Understand the rules and conditions for playing our physics-based battle royale game.',
    canonical: `${BASE_URL}/terms-of-service`,
    contentHtml: `
      <div style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>Terms of Service</h1>
        <p>By accessing cattlecrazy3d.com, you agree to comply with our fair-play rules, community standards, and browser gaming conditions.</p>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-mobile', {
    title: 'Crazy Cattle 3D Mobile - Sheep Battle Royale Mobile Touch Edition',
    description: 'Play Crazy Cattle 3D Mobile free in your smartphone or tablet browser! Touch-screen optimized physics sheep combat adapted from the original PC edition.',
    canonical: `${BASE_URL}/crazy-cattle-3d-mobile`,
    contentHtml: `
      <div class="game-page mobile-edition-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>🐄 Crazy Cattle 3D Mobile – Sheep Battle Royale (Mobile Touch Edition)</h1>
        <p>Crazy Cattle 3D Mobile brings physics-based sheep battle royale to smartphones and tablets. Adapted with touch-screen joystick controls and responsive viewport rendering.</p>
        <p><a href="/" class="btn primary">Switch to Full Desktop PC Edition</a></p>
      </div>
    `
  });

  // 4. 为每个热游生成专属页面内容
  for (const game of games) {
    const route = game.path;
    const stepsHtml = (game.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join('');
    const faqsHtml = (game.faqs || []).map(f => `
      <div class="faq-item" style="margin-bottom:1rem;">
        <h4 style="font-size:1.05rem;color:#1e293b;margin:0 0 4px 0;">${escapeHtml(f.question)}</h4>
        <p style="margin:0;color:#475569;">${escapeHtml(f.answer)}</p>
      </div>
    `).join('');
    const detailsHtml = (game.details || []).map(([k, v]) => `
      <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;"><strong>${escapeHtml(k)}</strong></td><td style="padding:8px 12px;border:1px solid #e2e8f0;">${escapeHtml(v)}</td></tr>
    `).join('');

    routesData.set(route, {
      title: game.seoTitle || `${game.title} - Play Online Free`,
      description: game.seoDescription || game.description,
      canonical: `${BASE_URL}${route}`,
      contentHtml: `
        <div class="game-page hot-game-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
          <header class="game-header">
            <span style="display:inline-block;background:#dbeafe;color:#1e40af;font-size:0.8rem;font-weight:700;padding:4px 10px;border-radius:4px;margin-bottom:8px;">${escapeHtml(game.trendLabel || 'Trending Browser Game')}</span>
            <h1>${escapeHtml(game.pageTitle || game.title)}</h1>
            <p style="font-size:1.1rem;color:#475569;line-height:1.6;">${escapeHtml(game.description)}</p>
            <div style="margin:1rem 0;">
              <a href="${escapeHtml(game.sourceUrl)}" target="_blank" rel="noopener noreferrer nofollow" class="btn primary">Play ${escapeHtml(game.title)} Online</a>
              <a href="/" class="btn secondary" style="margin-left:10px;">Play Crazy Cattle 3D</a>
            </div>
          </header>

          <section class="seo-content-section" style="margin-top:2rem;">
            <h2>${escapeHtml(game.guideTitle || 'Game Guide &amp; Overview')}</h2>
            <p>${escapeHtml(game.intro || '')}</p>
            <p>${escapeHtml(game.guideIntro || '')}</p>

            <h3>How to Play &amp; Winning Route</h3>
            <ol style="line-height:1.8;padding-left:1.5rem;">${stepsHtml}</ol>

            <h3>Game Overview &amp; Specifications</h3>
            <table style="width:100%;border-collapse:collapse;margin:1.5rem 0;">
              <tbody>${detailsHtml}</tbody>
            </table>

            <h3>Frequently Asked Questions</h3>
            <div class="faq-list">${faqsHtml}</div>

            <div class="hub-backlink-card" style="margin-top:2.5rem;padding:1.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;">
              <h3 style="margin:0 0 8px 0;color:#1e40af;">🐄 More Physics &amp; Battle Royale Games: Crazy Cattle 3D</h3>
              <p style="margin:0 0 12px 0;color:#1e3a8a;">Love browser gaming? Check out our flagship game <strong><a href="/" style="color:#2563eb;font-weight:700;">Crazy Cattle 3D</a></strong>! Battle across Ireland, Iceland, and New Zealand with zero download needed.</p>
              <a href="/crazy-cattle-3d-unblocked" class="btn primary" style="padding:6px 14px;font-size:0.85rem;">🔓 Play Unblocked</a>
              <a href="/crazy-cattle-3d-guide" class="btn secondary" style="padding:6px 14px;font-size:0.85rem;margin-left:8px;">📖 Map Guide</a>
            </div>
          </section>
        </div>
      `
    });
  }

  // 5. 遍历 static-sitemap，补齐未在 games 里的 legacy 页面
  for (const item of staticSitemap) {
    if (!routesData.has(item.path)) {
      const cleanName = item.path.replace(/^\//, '').replace(/-/g, ' ');
      const capName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      routesData.set(item.path, {
        title: `${capName} - Play Online Free Game`,
        description: `Play ${capName} online for free in your browser. Enjoy full controls, levels, and instant browser gaming with no downloads.`,
        canonical: `${BASE_URL}${item.path}`,
        contentHtml: `
          <div class="game-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
            <h1>${escapeHtml(capName)} - Free Online Browser Game</h1>
            <p>Welcome to ${escapeHtml(capName)}! Play directly in your web browser with responsive controls, full levels, and no downloads required.</p>
            <div style="margin:1.5rem 0;"><a href="/" class="btn primary">Play Crazy Cattle 3D</a></div>
            <div class="hub-backlink-card" style="margin-top:2rem;padding:1.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;">
              <h3>Featured Game: Crazy Cattle 3D</h3>
              <p>Explore our flagship physics battle royale across Ireland, Iceland, and New Zealand.</p>
              <a href="/crazy-cattle-3d-unblocked" class="btn primary">Play Unblocked</a>
            </div>
          </div>
        `
      });
    }
  }

  console.log(`Prepared pre-rendered data for ${routesData.size} routes.`);

  // 6. 为每个路由写入独立的 index.html 文件！
  for (const [routePath, data] of routesData.entries()) {
    let html = templateHtml;

    // 替换 <title>
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(data.title)}</title>`);

    // 替换 <meta name="description">
    html = html.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(data.description)}" />`);

    // 替换 <link rel="canonical">
    html = html.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i, `<link rel="canonical" href="${data.canonical}" />`);

    // 替换 Open Graph
    html = html.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(data.title)}" />`);
    html = html.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(data.description)}" />`);
    html = html.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:url" content="${data.canonical}" />`);

    // 替换 Twitter Card
    html = html.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(data.title)}" />`);
    html = html.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(data.description)}" />`);

    // 注入预渲染原生内容到 <div id="root">
    const preContent = `<div id="root">${data.contentHtml}</div>`;
    html = html.replace(/<div id="root"><\/div>/i, preContent);

    // 确定目标目录与文件路径
    let targetFilePath;
    if (routePath === '/') {
      targetFilePath = path.join(distDir, 'index.html');
    } else {
      const targetSubDir = path.join(distDir, routePath.replace(/^\//, ''));
      await mkdir(targetSubDir, { recursive: true });
      targetFilePath = path.join(targetSubDir, 'index.html');
    }

    await writeFile(targetFilePath, html, 'utf8');
  }

  console.log(`Successfully pre-rendered ${routesData.size} static HTML pages in dist/!`);
}

runPrerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
