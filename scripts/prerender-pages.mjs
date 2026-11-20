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
    title: 'Crazy Cattle 3D – Play Free Online, All 3 Maps & Controls',
    description: 'Play free online: Crazy Cattle 3D is a browser physics battle royale across Ireland, Iceland, and New Zealand with responsive controls and zero downloads.',
    canonical: `${BASE_URL}/`,
    h1: 'Crazy Cattle 3D',
    contentHtml: `
      <header class="hero">
        <h1>Crazy Cattle 3D</h1>
        <h2 style="font-size:1.25rem;font-weight:600;color:#475569;margin:0.5rem 0 1rem;">Sheep Battle Royale Across Ireland, Iceland &amp; New Zealand</h2>
        <p class="tagline">Experience the wildest sheep and cattle chaos simulator online! Play Crazy Cattle 3D now and join the ultimate physics-based battle royale where sheep and cattle compete for survival across Ireland, Iceland, and New Zealand!</p>
        <div class="button-group">
          <a href="#game" class="btn"><span>🎮</span> Play Now</a>
          <a href="/crazy-cattle-3d-unblocked" class="btn secondary"><span>🔓</span> Unblocked Mode</a>
          <a href="/crazy-cattle-3d-guide" class="btn secondary"><span>📖</span> Strategy Guide</a>
        </div>
      </header>
      <section id="game" class="iframe-section">
        <div class="game-container">
          <iframe
            title="Crazy Cattle 3D - Sheep Battle Royale Game"
            src="/game/index.html"
            allowfullscreen=""
            frameborder="0"
            allow="cross-origin-isolated; fullscreen; autoplay"
            style="display:block;width:100%;height:100%;border:0;"
          ></iframe>
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
        <p>Welcome to the dedicated unblocked portal for <strong>Crazy Cattle 3D</strong>. Designed specifically for students on school Chromebooks, library computers, and casual gamers on restricted office networks, this version bypasses third-party software installation requirements by utilizing pure client-side WebGL canvas technology. Jump directly into physics-driven sheep battle royale matches with zero downloads, zero account registration, and zero administrative privilege requests.</p>

        <h2>Why Is Crazy Cattle 3D Unblocked So Popular on Restricted Networks?</h2>
        <p>Students, library visitors, and casual gamers in managed academic environments often face strict administrative restrictions, institutional firewalls, and application locks that prevent executing standalone software (.exe, .dmg, or .msi installers). Crazy Cattle 3D Unblocked resolves this barrier by executing the entire 3D momentum simulation directly inside standard web browser canvas memory via WebGL and WebAssembly. As long as your browser supports HTML5 graphics rendering, you can launch immediately into chaotic sheep battle royale matches without leaving traces on local storage.</p>

        <h3>Key Advantages of the WebGL Unblocked Edition</h3>
        <ul>
          <li><strong>Firewall &amp; Chromebook Friendly:</strong> Runs cleanly via standard HTTPS (Port 443) protocol, making it accessible on school Wi-Fi, classroom Chromebooks, and campus networks without triggering proxy blocks or domain filters.</li>
          <li><strong>Zero Download, Zero Setup:</strong> No extensions, Flash emulators, or .zip extracts necessary. Just open the page, press Play, and battle inside your browser window.</li>
          <li><strong>Complete 3-Map Roster:</strong> Access Ireland, Iceland, and New Zealand with all ragdoll collision physics, dynamic hills, and hazard zones completely intact from the original engine.</li>
        </ul>

        <h2>Technical WebGL Architecture: Why It Bypasses School Firewalls Safely</h2>
        <p>Enterprise campus filtering tools like GoGuardian, Securly, Lightspeed Systems, and Fortinet monitor network traffic for suspicious executable transfers, peer-to-peer protocols, and unauthorized port bindings. Crazy Cattle 3D Unblocked communicates strictly over transport layer security (TLS 1.3) using identical protocols to educational portals like Google Classroom, Canvas, or Khan Academy.</p>
        <p>When you launch a session, your browser retrieves pre-compiled WebAssembly binaries and 3D mesh geometry into a secure client-side sandbox. The code executes exclusively within the ephemeral memory space allocated to your active browser tab. Once the tab is closed, all allocated memory buffers are instantly released. The game never writes executable files to the host operating system, reads local documents, or requires elevated system permissions.</p>

        <h2>Complete 3-Map Geography Breakdown for Unblocked Sessions</h2>
        <p>Unlike stripped-down clone mirrors that only offer a single flat arena, this unblocked edition delivers the authentic three-environment geographic roster created by indie developer Anna Mayberry:</p>
        <h3>1. Ireland – Rolling Grassy Slopes &amp; Kinetic Downhill Rushes</h3>
        <p>The Ireland arena features gentle rolling pastures, lush emerald grass, and an open perimeter cliff without protective fencing. Ireland serves as the premier training ground for mastering momentum-based collision mechanics. Because gravity multiplies your forward velocity while running downhill, a lightweight sheep descending a slope can easily overpower a stationary or uphill rival. However, excessive downhill speed near the outer ring will frequently carry your own momentum straight into the ocean. Always tap the reverse brake (S key) just prior to impact to arrest your forward vector while sending your opponent flying.</p>
        <h3>2. Iceland – Slippery Basalt Cliffs &amp; Volcanic Drop-Offs</h3>
        <p>Iceland introduces treacherous volcanic rock formations, low-friction icy plateaus, and lethal vertical drop-offs. The reduced surface friction on Iceland roughly doubles your braking distance, punishing erratic steering. Winning on Iceland revolves around the 'Matador Sidestep' maneuver: position yourself near a perimeter ledge, wait for an aggressive AI competitor to charge you at full speed, and execute a sharp 90-degree lateral dodge (A or D key) during the final fraction of a second. The rushing bot will carry its unguided kinetic energy directly over the cliff.</p>
        <h3>3. New Zealand – High-Altitude Ridges &amp; Vertical Recovery</h3>
        <p>The New Zealand arena is the most challenging battlefield in the rotation, dominated by steep alpine ridges, narrow mountain crests, and jagged lower rock shelves. In New Zealand, anchoring the central high plateau is critical for survival. Animals knocked from the upper tier plunge violently down multi-layered cliff shelves. If your sheep is launched airborne, immediately turn your camera toward the mountain spine and pulse your forward key to attempt an emergency friction catch against lower rock ledges before dropping out of bounds.</p>

        <h2>Controls &amp; Collision Physics Meta: PC Keyboard vs. Chromebook Touchpad</h2>
        <ul>
          <li><strong>W or Up Arrow:</strong> Accelerate forward and build linear speed. Essential for generating collision knockback.</li>
          <li><strong>S or Down Arrow:</strong> Apply immediate friction braking and reverse gear. Crucial for stopping safely near cliff perimeters.</li>
          <li><strong>A or Left Arrow:</strong> Steer left and bank into turns. Combine with forward momentum for sweeping flank maneuvers.</li>
          <li><strong>D or Right Arrow:</strong> Steer right and bank into turns.</li>
          <li><strong>Spacebar:</strong> Deliver an explosive forward ram or jump-recover when bumped into the air.</li>
          <li><strong>Mouse Movement:</strong> Pan the 360-degree orbital camera to track incoming rushes from peripheral blind spots.</li>
        </ul>
        <p><strong>The 45-Degree Flank Striking Rule:</strong> Avoid head-on impacts against oncoming competitors. Symmetrical head-on collisions cause reciprocal recoil, launching both animals backward with equal force. Instead, strike opponents at an oblique 45-degree angle against their rear flank. Oblique collisions introduce sudden rotational torque, spinning the rival model onto its side and completely breaking its wheel traction.</p>

        <h2>Chromebook &amp; Low-End Laptop Performance Optimization Guide</h2>
        <ol>
          <li><strong>Close Resource-Heavy Background Tabs:</strong> Cloud applications such as Google Classroom, Google Docs, and YouTube stream data continually in the background. Close non-essential tabs prior to launching the 3D canvas.</li>
          <li><strong>Verify Hardware Acceleration:</strong> Navigate to your browser settings, search for 'Hardware Acceleration', and verify that 'Use graphics acceleration when available' is switched ON. This delegates 3D vertex processing to your GPU.</li>
          <li><strong>Utilize Fullscreen Display:</strong> Click the browser fullscreen button (⛶) or press F11. Dedicated fullscreen mode bypasses browser window compositing pipelines, significantly improving frame stability and locking mouse tracking inside the arena.</li>
          <li><strong>Clear Memory Buffer:</strong> If you notice intermittent stutter after extended gameplay sessions, simply refresh the browser tab to clear the WebGL texture cache.</li>
        </ol>

        <h2>Frequently Asked Questions About Crazy Cattle 3D Unblocked</h2>
        <div class="faq-item">
          <h4>Is Crazy Cattle 3D Unblocked completely free to play?</h4>
          <p>Yes. The browser edition is 100% free with no microtransactions, paywalls, or premium subscriptions. All maps, physics features, and gameplay mechanics are accessible immediately upon page load.</p>
        </div>
        <div class="faq-item">
          <h4>Can I play Crazy Cattle 3D on school Wi-Fi without a VPN?</h4>
          <p>Yes. Because the game is hosted on standard web protocols using HTTPS and WebGL without peer-to-peer torrent connections or external proxy redirects, it connects seamlessly through standard classroom, campus, and public Wi-Fi networks.</p>
        </div>
        <div class="faq-item">
          <h4>What is the difference between this unblocked edition and the itch.io version?</h4>
          <p>The original Crazy Cattle 3D was created by independent developer Anna Mayberry and distributed as an offline downloadable desktop executable on itch.io. This unblocked edition provides an instant in-browser WebGL port enabling players on restricted machines (such as Chromebooks, library PCs, and mobile devices) to enjoy the identical physics experience without needing file extractors or admin rights.</p>
        </div>
        <div class="faq-item">
          <h4>How do I win when the arena circle gets very small?</h4>
          <p>When the arena boundary compresses to its final radius, avoid sprinting erratically. Drop to low speed, anchor yourself on the exact center of the remaining terrain, and watch the AI bots. Let the remaining bots knock each other out, and deliver a clean side ram to the final surviving rival as they recover from their previous collision.</p>
        </div>

        <div style="margin-top:2rem;"><a href="/" class="btn primary">Play Crazy Cattle 3D Home Arena</a> <a href="/crazy-cattle-3d-how-to-play" class="btn secondary">How to Play Guide</a> <a href="/crazy-cattle-3d-how-to-win" class="btn secondary">Winning Tactics</a></div>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-online', {
    title: 'Crazy Cattle 3D Online – Play in Browser, No Download',
    description: 'Play Crazy Cattle 3D online directly in your browser with no download required. Experience 60 FPS WebGL sheep battle royale combat across 3 massive terrains.',
    canonical: `${BASE_URL}/crazy-cattle-3d-online`,
    contentHtml: `
      <div class="game-page online-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>🌐 Crazy Cattle 3D Online – Play in Browser, No Download</h1>
        <p>Play Crazy Cattle 3D online without downloading executable files. Experience real-time ragdoll physics, momentum downhill strikes, and intense last-animal-standing competition on modern browsers.</p>
        <h2>Instant WebGL Browser Performance</h2>
        <p>Our online portal compiles the physics calculations client-side into your browser memory, offering responsive 60 FPS sheep collisions with zero netcode latency.</p>
        <p><a href="/" class="btn primary">Launch Online Game</a> <a href="/crazy-cattle-3d-guide" class="btn secondary">View Strategy Guide</a></p>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-online-free', {
    title: 'Crazy Cattle 3D Online Free - Instant Browser Play',
    description: 'Play Crazy Cattle 3D online free in your browser with zero installation. Experience full physics sheep combat across all 3 maps.',
    canonical: `${BASE_URL}/crazy-cattle-3d-online`,
    contentHtml: `
      <div class="game-page online-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>🌐 Crazy Cattle 3D Online Free</h1>
        <p>Instant free browser access to Crazy Cattle 3D. Play with full WebGL 60 FPS performance without downloading files.</p>
        <p><a href="/" class="btn primary">Play Free Online Now</a> <a href="/crazy-cattle-3d-guide" class="btn secondary">Strategy Guide</a></p>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-download', {
    title: 'Crazy Cattle 3D Download – PC, Mobile & Web Version Guide',
    description: 'Looking to download Crazy Cattle 3D for PC? Find the official itch.io desktop release by indie creator Anna Mayberry, system requirements, and instant browser play alternatives.',
    canonical: `${BASE_URL}/crazy-cattle-3d-download`,
    contentHtml: `
      <div class="game-page download-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>⬇️ Crazy Cattle 3D Download – PC, Mobile &amp; Web Guide</h1>
        <p>Looking for an offline version of Crazy Cattle 3D? We provide honest directions to the official standalone desktop release created by independent game developer Anna Mayberry on itch.io.</p>
        <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px;margin:1.5rem 0;">
          <strong>Official Source:</strong> The genuine Crazy Cattle 3D desktop files are published on <a href="https://annamayberry.itch.io/crazy-cattle-3d" target="_blank" rel="noopener noreferrer">Anna Mayberry's itch.io page</a>. We do not distribute pirated or modified installers.
        </div>
        <p><a href="/" class="btn primary">Play Free Online Without Downloading</a></p>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-guide', {
    title: 'Crazy Cattle 3D Guide – Maps, Controls & Winning Strategy',
    description: 'Complete strategy guide for Crazy Cattle 3D. Master keyboard controls, collision physics, and map-specific survival tactics across Ireland, Iceland, and New Zealand.',
    canonical: `${BASE_URL}/crazy-cattle-3d-guide`,
    contentHtml: `
      <div class="game-page guide-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>📖 Crazy Cattle 3D Guide – Maps, Controls &amp; Strategy</h1>
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
    title: 'Cattle Crazy 3D – Same Game as Crazy Cattle 3D',
    description: 'Wondering if Cattle Crazy 3D is different from Crazy Cattle 3D? Both refer to the identical physics battle royale by creator Anna Mayberry. Learn more and play free online.',
    canonical: `${BASE_URL}/cattle-crazy-3d`,
    contentHtml: `
      <div class="game-page cattle-crazy-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>🐄 Cattle Crazy 3D – Same Game as Crazy Cattle 3D</h1>
        <p>Searching for "Cattle Crazy 3D" instead of "Crazy Cattle 3D"? Both terms refer to the exact same viral physics sheep battle royale game created by indie developer Anna Mayberry. There is no separate or altered game under this name—it is simply a natural spelling variant of the original title.</p>
        <h2>Same Physics, Same Maps, Same Chaotic Action</h2>
        <p>Whether you typed Cattle Crazy or Crazy Cattle, you get the identical momentum mechanics across all 3 maps: Ireland's rolling slopes, Iceland's volcanic cliffs, and New Zealand's alpine ridges. You can jump directly into the full arena right on our main homepage.</p>
        <div style="margin:1.5rem 0;"><a href="/" class="btn primary">Play Crazy Cattle 3D on Homepage &rarr;</a></div>
        <h2>Domain Transparency Notice</h2>
        <p><strong>cattlecrazy3d.com</strong> is an independent fan community providing fast browser play and comprehensive walkthroughs. Original developer attribution belongs to Anna Mayberry on itch.io.</p>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-how-to-play', {
    title: 'How to Play Crazy Cattle 3D – Controls & First Match Walkthrough',
    description: 'Learn how to play Crazy Cattle 3D! Step-by-step beginner walkthrough covering PC & mobile controls, the 4-phase match loop, and crucial first 60 seconds survival.',
    canonical: `${BASE_URL}/crazy-cattle-3d-how-to-play`,
    contentHtml: `
      <div class="game-page how-to-play-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <span style="color:#2563eb;font-weight:700;font-size:0.85rem;text-transform:uppercase;">Beginner Mastery Guide &bull; Updated 2026</span>
        <h1>🎮 How to Play Crazy Cattle 3D – Controls &amp; First Match Walkthrough</h1>
        <p><strong>The Objective in One Sentence:</strong> Be the last sheep standing by knocking rival animals off the edge before the shrinking arena boundary claims you.</p>

        <h2>1. Core Controls: PC &amp; Mobile</h2>
        <ul>
          <li><strong>Steer &amp; Move:</strong> WASD or Arrow Keys on desktop; Virtual joystick on mobile.</li>
          <li><strong>Explosive Ram:</strong> Spacebar on desktop; Right action charge button on mobile.</li>
          <li><strong>Camera Orientation:</strong> Mouse movement on desktop; Right-screen swipe on mobile.</li>
          <li><strong>Braking &amp; Edge Stop:</strong> S key on desktop; Pull thumbstick back on mobile.</li>
        </ul>

        <h2>2. A Full Match in 4 Stages</h2>
        <ol>
          <li><strong>Stage 1: Spawn &amp; Dispersal (0-15s):</strong> 12-16 sheep spawn together. Turn 90 degrees outward and escape the initial pile-up.</li>
          <li><strong>Stage 2: Momentum Farming (15-60s):</strong> Use downhill slopes to build speed while aggressive bots eliminate each other.</li>
          <li><strong>Stage 3: Ring Compression (60-120s):</strong> The boundary shrinks. Move toward the central high ground early.</li>
          <li><strong>Stage 4: Sudden-Death Showdown (120s+):</strong> Only 2-3 sheep remain. Wait for the rival to charge, dodge sideways, and counter-strike!</li>
        </ol>

        <h2>3. Beginner Checklist: First 60 Seconds</h2>
        <ul>
          <li>Avoid the center brawl immediately.</li>
          <li>Locate downhill angles to maximize momentum collision force.</li>
          <li>Keep your camera locked on rivals to avoid blindside attacks.</li>
          <li>Pick off isolated or recovering bots on perimeter edges.</li>
        </ul>

        <div style="margin-top:2rem;padding:1.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;">
          <h3>Ready for Championship Tactics?</h3>
          <p>Read our advanced companion guide on <a href="/crazy-cattle-3d-how-to-win" style="color:#2563eb;font-weight:700;">how to win Crazy Cattle 3D</a> with pro 45-degree flank collisions.</p>
          <a href="/" class="btn primary">Play Crazy Cattle 3D Now</a>
          <a href="/crazy-cattle-3d-unblocked" class="btn secondary" style="margin-left:8px;">Play Unblocked</a>
        </div>
      </div>
    `
  });

  routesData.set('/crazy-cattle-3d-how-to-win', {
    title: 'How to Win Crazy Cattle 3D – 7 Tactics That Actually Work',
    description: 'Discover 7 proven tactics to win in Crazy Cattle 3D. Master 45-degree flank collisions, downhill momentum scaling, final circle positioning, and survival meta.',
    canonical: `${BASE_URL}/crazy-cattle-3d-how-to-win`,
    contentHtml: `
      <div class="game-page how-to-win-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <span style="color:#16a34a;font-weight:700;font-size:0.85rem;text-transform:uppercase;">Pro Strategy &bull; Tactics &bull; Updated 2026</span>
        <h1>🏆 How to Win Crazy Cattle 3D: 7 Proven Tactics</h1>
        <p>Winning Crazy Cattle 3D is about angular momentum, timing, and terrain awareness. Learn how to consistently place 1st across Ireland, Iceland, and New Zealand.</p>

        <h2>1. The Physics Meta: Collision Angles &amp; Timing</h2>
        <ul>
          <li><strong>The 45-Degree Flank Strike:</strong> Avoid direct head-on impacts. Striking a target at a 45-degree angle spins their model and guarantees high knockback.</li>
          <li><strong>Slope Momentum Multiplier:</strong> Gravity converts downhill potential energy into massive kinetic force. Never fight uphill.</li>
          <li><strong>The Sudden Brake Tap:</strong> Tap S key just before impact when a rival is near an edge so your momentum stops while they fly off.</li>
        </ul>

        <h2>2. Phased Game Plan</h2>
        <p><strong>Early Game:</strong> Play the observer from an elevated ridge. Let bot packs eliminate each other.</p>
        <p><strong>Mid Game:</strong> Flank isolated targets from behind using downhill momentum.</p>
        <p><strong>Late Game / Final Circle:</strong> Anchor the dead center. Sidestep incoming charges with A or D so enemies plunge off the cliff.</p>

        <h2>3. Top 3 Fatal Mistakes to Avoid</h2>
        <ul>
          <li><strong>Getting Sandwiched:</strong> Never fight in between two active competitors.</li>
          <li><strong>Overcharging Off the Edge:</strong> The #1 cause of death. Maintain braking distance near cliffs.</li>
          <li><strong>Greedy Chasing:</strong> Never plunge down steep ravines to chase a single runaway sheep.</li>
        </ul>

        <div style="margin-top:2rem;padding:1.5rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;">
          <h3>Need a Refresher on Controls?</h3>
          <p>Review basic keybinds and the 4-phase match loop in our <a href="/crazy-cattle-3d-how-to-play" style="color:#16a34a;font-weight:700;">how to play Crazy Cattle 3D</a> walkthrough.</p>
          <a href="/" class="btn primary" style="background:#16a34a;">Play Crazy Cattle 3D</a>
          <a href="/crazy-cattle-3d-guide" class="btn secondary" style="margin-left:8px;">All 3 Maps Guide</a>
        </div>
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
    title: 'Crazy Cattle 3D Mobile – Play on iPhone & Android Browser',
    description: 'Play Crazy Cattle 3D Mobile directly on your iPhone, iPad, or Android browser. Touch-screen optimized controls, virtual joystick steering, and fast physics action.',
    canonical: `${BASE_URL}/crazy-cattle-3d-mobile`,
    contentHtml: `
      <div class="game-page mobile-edition-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <h1>🐄 Crazy Cattle 3D Mobile – Play on iPhone &amp; Android Browser</h1>
        <p>Crazy Cattle 3D Mobile brings physics-based sheep battle royale to smartphones and tablets. Adapted with touch-screen joystick controls and responsive viewport rendering.</p>
        <p><a href="/" class="btn primary">Switch to Full Desktop PC Edition</a></p>
      </div>
    `
  });

  routesData.set('/clues-by-sam', {
    title: 'Clues by Sam – Play Free Online + Full Answers & Walkthrough',
    description: 'Play Clues by Sam online for free! Daily logic deduction walkthrough, clue puzzle answers, rules, and strategies to identify criminals and innocents without guessing.',
    canonical: `${BASE_URL}/clues-by-sam`,
    contentHtml: `
      <div class="game-page clues-by-sam-page" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <header class="game-header" style="margin-bottom:1.5rem;">
          <h1 style="font-size:2.2rem;color:#1e293b;margin-bottom:0.5rem;">Clues by Sam</h1>
          <p style="font-size:1.1rem;color:#475569;line-height:1.6;">Play <strong>Clues by Sam online</strong> for free! Solve daily logic deduction grids where you determine who is criminal and who is innocent. Master positional clues, row and column quotas, and corner tagging to solve every daily puzzle without guessing.</p>
          <div style="margin:1rem 0;">
            <a href="https://cluesbysam.com/" target="_blank" rel="noopener noreferrer nofollow" class="btn primary">Play Clues by Sam Online Now</a>
          </div>
        </header>

        <div class="game-container" style="width:100%;max-width:1200px;margin:0 auto 2rem;box-sizing:border-box;">
          <iframe
            title="Clues by Sam - Daily Deductive Logic Puzzle"
            src="https://cluesbysam.com/"
            allowfullscreen
            frameborder="0"
            allow="fullscreen; autoplay; clipboard-read; clipboard-write; payment"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-presentation allow-modals allow-top-navigation allow-top-navigation-by-user-activation allow-pointer-lock"
            referrerpolicy="no-referrer-when-downgrade"
            style="display:block;width:100%;height:600px;min-height:600px;border:none;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.1);"
          ></iframe>
        </div>

        <article class="seo-content-section" style="line-height:1.75;color:#334155;">
          <section style="margin-bottom:2rem;">
            <h2 style="font-size:1.6rem;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:0.4rem;margin-bottom:1rem;">
              What is Clues by Sam? Daily Logic Puzzle &amp; Deductive Rules
            </h2>
            <p>
              <strong>Clues by Sam</strong> is an engaging daily deductive logic puzzle game created by independent developer Sam under Ad Artis Oy. Released every day precisely at midnight Eastern Time (00:00 New York time), the game presents players worldwide with a fresh, handcrafted grid of suspects, each featuring an illustrated portrait, full name, profession, and unique grid position.
            </p>
            <p>
              The overarching objective is both simple to grasp and deeply intellectual: you must evaluate all available testimonies to determine which suspects are <strong>Criminal</strong> and which are <strong>Innocent</strong>. Unlike casual word games or trivia quizzes that rely on guesswork, trial-and-error, or vocabulary breadth, Clues by Sam is governed entirely by mathematical and formal logic determinism. Every single daily puzzle is procedurally and manually verified to ensure that a continuous, non-branching deduction path exists from the very first clue to the fully solved board. Zero guesswork or leap of faith is ever required to solve the grid.
            </p>
          </section>

          <section style="margin-bottom:2rem;">
            <h2 style="font-size:1.6rem;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:0.4rem;margin-bottom:1rem;">
              How to Play: Interface Layout, Input Controls &amp; Color Feedback
            </h2>
            <p>
              The playfield consists of twenty suspect portrait cards arranged across a structured grid—typically four columns lettered A through D and five rows numbered 1 through 5, giving each character a distinct coordinate like A1, B3, or D5.
            </p>
            <ul style="padding-left:1.5rem;margin-bottom:1rem;">
              <li><strong>Marking Suspects:</strong> Click or tap a suspect card to toggle their status between <em>Innocent</em> (marked with a clean green badge) and <em>Criminal</em> (marked with a prominent red badge). When you accurately deduce and lock in a suspect, that person's testimony card flips open to reveal crucial new evidence regarding other suspects on the board.</li>
              <li><strong>Corner Color Tagging System:</strong> Right-click on any card on desktop or tap the top-right corner tag icon on touchscreens to cycle through helper colors (yellow, blue, purple, orange). These non-permanent notes let you test hypothetical chains (such as 'Assume suspect B2 is guilty—what happens to Row 2?').</li>
              <li><strong>Error Prevention &amp; Logic Guards:</strong> If an action directly contradicts an established clue or violates mathematical parity, the interface prevents contradictory locks, preserving the integrity of your deduction path.</li>
              <li><strong>Daily Reset Schedule:</strong> Puzzles update every calendar day at 00:00 EST / EDT (midnight New York time). Your current solving progress is automatically cached in your browser's local storage, allowing you to pause, step away, and resume your deduction anytime without losing your place.</li>
            </ul>
          </section>

          <section style="margin-bottom:2rem;">
            <h2 style="font-size:1.6rem;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:0.4rem;margin-bottom:1rem;">
              Common Puzzle Types &amp; Core Deductive Patterns
            </h2>
            <p>
              Mastering Clues by Sam requires understanding the exact language and spatial terminology used in the clues:
            </p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;margin-top:1rem;">
              <div style="background:#f8fafc;padding:1.25rem;border-radius:8px;border:1px solid #e2e8f0;">
                <h3 style="font-size:1.15rem;color:#1e293b;margin-top:0;">1. Positional &amp; Spatial Clues</h3>
                <p style="margin:0;font-size:0.95rem;color:#475569;">
                  <strong>Neighbors:</strong> Crucially, 'neighbors' always includes horizontal, vertical, AND diagonal adjacent cards. Corner cells have 3 neighbors, edges have 5, and center cards have 8. <strong>In Between:</strong> Suspects situated directly between two targets along the same row or column, excluding the endpoints. <strong>Connected:</strong> Continuous chains linked strictly by orthogonal adjacency (horizontal or vertical).
                </p>
              </div>
              <div style="background:#f8fafc;padding:1.25rem;border-radius:8px;border:1px solid #e2e8f0;">
                <h3 style="font-size:1.15rem;color:#1e293b;margin-top:0;">2. Numerical &amp; Row/Column Quotas</h3>
                <p style="margin:0;font-size:0.95rem;color:#475569;">
                  Clues stating 'Row 3 contains exactly 2 criminals' or 'Column B has more innocents than Column D' establish rigid boundaries. Cross-referencing these totals against confirmed cards lets you apply the Pigeonhole Principle to resolve remaining slots immediately.
                </p>
              </div>
              <div style="background:#f8fafc;padding:1.25rem;border-radius:8px;border:1px solid #e2e8f0;">
                <h3 style="font-size:1.15rem;color:#1e293b;margin-top:0;">3. Suspect Attributes &amp; Names</h3>
                <p style="margin:0;font-size:0.95rem;color:#475569;">
                  Testimonies frequently refer to name spelling patterns ('All suspects whose names start with M are innocent'), occupational roles ('Both doctors are criminals'), or visual traits (glasses, hats). Always scan character labels carefully.
                </p>
              </div>
              <div style="background:#f8fafc;padding:1.25rem;border-radius:8px;border:1px solid #e2e8f0;">
                <h3 style="font-size:1.15rem;color:#1e293b;margin-top:0;">4. Logical Elimination (Indirect Proof)</h3>
                <p style="margin:0;font-size:0.95rem;color:#475569;">
                  When direct deductions stall, apply <em>reductio ad absurdum</em>: assume a suspect is Innocent. If that hypothesis forces a row to exceed its allowed criminal quota, the assumption is false and the suspect must be Criminal.
                </p>
              </div>
            </div>
          </section>

          <section style="margin-bottom:2rem;">
            <h2 style="font-size:1.6rem;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:0.4rem;margin-bottom:1rem;">
              Daily Walkthrough Strategy: 5 Proven Solving Tips
            </h2>
            <p>
              Experienced players rely on five systematic principles to solve daily boards smoothly without ever getting stuck:
            </p>
            <ol style="padding-left:1.5rem;line-height:1.8;">
              <li>
                <strong>Prioritize Boundary Edges and Corners:</strong> Center cards have 8 neighbors, creating high complexity. Corners have only 3 neighbors and edges have 5. Any clue stating 'All neighbors of corner card A1 are innocent' immediately locks down 3 suspects with zero ambiguity.
              </li>
              <li>
                <strong>Lock Down Row and Column Quotas:</strong> Always audit row and column totals after every confirmed card. If Row 2 requires exactly 2 criminals and you have confirmed 2, every other suspect in Row 2 must instantly be marked Innocent.
              </li>
              <li>
                <strong>Deploy Corner Tags for Binary Bifurcations:</strong> When a clue states 'Exactly one of Alice and Bob is guilty,' tag Alice yellow and Bob orange. Trace the deductive ripple effects; frequently, one branch triggers an instant quota contradiction, proving the alternative branch immediately.
              </li>
              <li>
                <strong>Respect Strict Mathematical Quantifiers:</strong> Remember that 'All' implies at least one subject exists, 'In between' never includes the boundaries, and 'At most one' includes zero. Reading quantifiers with absolute literal precision avoids fatal false assumptions.
              </li>
              <li>
                <strong>Trace Newly Unlocked Testimonies Immediately:</strong> Each correctly identified suspect reveals their hidden testimony. Novice players often stall because they keep re-reading old static clues. Always check newly revealed testimonies first—they provide the intended next link in the deduction chain.
              </li>
            </ol>
          </section>

          <section style="margin-bottom:2rem;">
            <h2 style="font-size:1.6rem;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:0.4rem;margin-bottom:1rem;">
              Frequently Asked Questions (FAQ)
            </h2>
            <div class="faq-list">
              <div style="margin-bottom:1.25rem;background:#f8fafc;padding:1.25rem;border-radius:8px;">
                <h3 style="font-size:1.15rem;color:#1e293b;margin-top:0;">Can I play past daily puzzles or archive levels?</h3>
                <p style="margin:0;color:#475569;">
                  Yes! Clues by Sam features an integrated archive calendar accessible directly within the game interface. You can access and solve previous daily puzzles from past weeks and months, allowing newcomers to practice and regular players to catch up on missed days.
                </p>
              </div>
              <div style="margin-bottom:1.25rem;background:#f8fafc;padding:1.25rem;border-radius:8px;">
                <h3 style="font-size:1.15rem;color:#1e293b;margin-top:0;">Is there a hint limit or score penalty?</h3>
                <p style="margin:0;color:#475569;">
                  The game includes a progressive two-stage hint system: Stage 1 highlights the specific clue or testimony you should focus on, and Stage 2 reveals the exact suspect you can deduce next. Hints are designed as friendly educational aids and do not lock you out of puzzle completion.
                </p>
              </div>
              <div style="margin-bottom:1.25rem;background:#f8fafc;padding:1.25rem;border-radius:8px;">
                <h3 style="font-size:1.15rem;color:#1e293b;margin-top:0;">How does Clues by Sam run on mobile devices?</h3>
                <p style="margin:0;color:#475569;">
                  Clues by Sam is natively optimized for mobile touchscreens (iOS Safari, Android Chrome). Simply tap cards to mark status, tap the card corner to access note tags, and pinch to zoom on smaller screens. No app store download or installation is required.
                </p>
              </div>
              <div style="margin-bottom:1.25rem;background:#f8fafc;padding:1.25rem;border-radius:8px;">
                <h3 style="font-size:1.15rem;color:#1e293b;margin-top:0;">How is Clues by Sam different from Wordle or NYT Connections?</h3>
                <p style="margin:0;color:#475569;">
                  While Wordle tests vocabulary through 5-letter frequency guessing and Connections tests categorical associations, Clues by Sam is a pure spatial-deduction logic grid game (comparable to Minesweeper logic meets classic Einstein riddle grids). It requires logical deduction, quantifier analysis, and spatial reasoning rather than vocabulary trivia.
                </p>
              </div>
            </div>
          </section>

          <section style="margin-bottom:2rem;">
            <h2 style="font-size:1.6rem;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:0.4rem;margin-bottom:1rem;">
              Version Updates &amp; Active Community Culture
            </h2>
            <p>
              Since its launch, Clues by Sam has received notable community-focused improvements:
            </p>
            <ul style="padding-left:1.5rem;line-height:1.8;">
              <li><strong>Archive &amp; Historical Calendar:</strong> Full calendar integration allows players to browse and replay any past daily puzzle with comprehensive local save preservation.</li>
              <li><strong>High-Contrast Dark Mode &amp; Mobile Hitboxes:</strong> Designed to prevent eye strain during late-night solving sessions and provide larger, responsive touch targets on mobile devices.</li>
              <li><strong>Spoiler-Free Share Grids &amp; Reddit Community:</strong> Players can export emoji deduction matrices to share completion times without spoiling solutions. An active solver community on Reddit (<code>r/CluesBySamHelp</code>) and Bluesky exchanges daily walkthrough strategies and hints.</li>
            </ul>
          </section>

          <footer style="margin-top:3rem;padding-top:1.5rem;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="color:#64748b;font-size:0.95rem;margin:0;">
              Looking for more browser fun? Try <a href="/" style="color:#2563eb;font-weight:600;text-decoration:underline;">Crazy Cattle 3D</a> – our free physics battle royale.
            </p>
          </footer>
        </article>
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

  // 7. 确保生成 404.html，彻底根治软 404 漏洞
  try {
    const public404Path = path.join(projectRoot, 'public', '404.html');
    const notFoundHtml = await readFile(public404Path, 'utf8');
    await writeFile(path.join(distDir, '404.html'), notFoundHtml, 'utf8');
    console.log('Successfully generated dist/404.html for hard 404 responses!');
  } catch (err) {
    console.warn('Could not copy 404.html:', err.message);
  }

  console.log(`Successfully pre-rendered ${routesData.size} static HTML pages in dist/!`);
}

runPrerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
