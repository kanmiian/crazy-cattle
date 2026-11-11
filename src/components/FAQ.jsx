import React, { useEffect } from 'react';
import './FAQ.css';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: 'Essential Player Questions',
    items: [
      {
        q: 'Is Crazy Cattle 3D completely free to play?',
        a: 'Yes, Crazy Cattle 3D is 100% free to play in your web browser. There are no pay-to-win microtransactions, paywalls, or mandatory subscriptions required to access any of the three maps (Ireland, Iceland, New Zealand).'
      },
      {
        q: 'Can I play Crazy Cattle 3D unblocked at school or work?',
        a: 'Yes! The browser version runs on standard client-side WebGL/HTML5 without requiring administrator installation, desktop executables, or third-party plugins. It runs seamlessly on school Chromebooks, library laptops, and managed office networks where app downloads are restricted.'
      },
      {
        q: 'Do I need to download or install files to play Crazy Cattle 3D?',
        a: 'No download is required to play online. You can play directly inside modern browsers (Chrome, Edge, Firefox, Safari). However, if you prefer an offline standalone PC version with raw local performance, the original creator Anna Mayberry provides an official download on itch.io.'
      },
      {
        q: 'Can I play Crazy Cattle 3D on mobile devices (Android & iPhone)?',
        a: 'Crazy Cattle 3D is primarily built for desktop computers using keyboard (WASD) and mouse controls for optimal physics precision. While modern mobile browsers with WebGL support can load our mobile-adapted touch interface, please note that intense ragdoll physics simulations require substantial mobile processing power and physical keys remain recommended for competitive play.'
      },
      {
        q: 'Is Crazy Cattle 3D multiplayer or single-player against AI?',
        a: 'Crazy Cattle 3D currently features fast-paced single-player battle royale matches against a herd of simulated AI bots. We are completely honest with our community: there is currently no true peer-to-peer or server-authoritative live multiplayer PvP matchmaking. A synchronized online multiplayer mode is in community development and experimental stages, but today\'s core gameplay is an offline-capable AI survival arena.'
      }
    ]
  },
  {
    category: 'Maps, Controls & Tactics',
    items: [
      {
        q: 'What are the three maps in Crazy Cattle 3D?',
        a: 'The game features three distinct battlegrounds: 1) Ireland — rolling grassy hills ideal for downhill momentum strikes; 2) Iceland — volcanic rock terrain with high-risk perimeter drop-offs and narrow footholds; 3) New Zealand — mountainous vertical cliffs that challenge your recovery bounces.'
      },
      {
        q: 'What are the controls for Crazy Cattle 3D?',
        a: 'Use WASD or Arrow Keys for movement and directional steering. Press Spacebar to activate your explosive charge/jump collision. Move your mouse to orient your camera and line up devastating angled rams into rival sheep.'
      },
      {
        q: 'How do I fix WebGL lag or black screen issues?',
        a: 'Ensure Hardware Acceleration is toggled ON in your browser settings (Settings > System > Use graphics acceleration when available). Updating your graphics drivers and closing background memory-heavy tabs will noticeably improve physics framerates.'
      }
    ]
  }
];

const FAQ = () => {
  useEffect(() => {
    // 注入 FAQPage 结构化数据 (JSON-LD)
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.flatMap(cat => cat.items).map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('faq-jsonld');
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  return (
    <div className="faq-page">
      <h1>
        <span role="img" aria-label="question mark">❓</span>
        Crazy Cattle 3D FAQ &amp; Player Guide
      </h1>
      <p className="faq-subtitle" style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>
        Honest, verified answers about gameplay, unblocked access, controls, and developer attribution.
      </p>

      <div className="faq-content">
        {faqData.map(category => (
          <section className="faq-section" key={category.category}>
            <h2>{category.category}</h2>
            {category.items.map(item => (
              <div className="faq-item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </section>
        ))}

        {/* 内部推荐导航 */}
        <div className="faq-related-links" style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: '#f1f5f9',
          borderRadius: '8px'
        }}>
          <h3 style={{ marginTop: 0 }}>Explore More Guides</h3>
          <p>Want deeper game tactics, unblocked mirrors, or download links?</p>
          <ul style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
            <li><Link to="/crazy-cattle-3d-unblocked" style={{ color: '#2563eb', fontWeight: 600 }}>Play Unblocked</Link></li>
            <li><Link to="/crazy-cattle-3d-guide" style={{ color: '#2563eb', fontWeight: 600 }}>Complete Map Guide</Link></li>
            <li><Link to="/crazy-cattle-3d-download" style={{ color: '#2563eb', fontWeight: 600 }}>Download PC Version</Link></li>
            <li><Link to="/crazy-cattle-3d-online" style={{ color: '#2563eb', fontWeight: 600 }}>Play Online Free</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
