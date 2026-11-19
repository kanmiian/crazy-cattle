import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      maxWidth: '750px',
      margin: '4rem auto',
      padding: '3.5rem 1.5rem',
      textAlign: 'center',
      background: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ fontSize: '4.5rem', marginBottom: '1rem', lineHeight: 1 }}>🐄💥</div>
      <h1 style={{ fontSize: '2.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
        404 - Pasture Not Found
      </h1>
      <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2rem', maxWidth: '540px', margin: '0 auto 2rem' }}>
        Looks like this sheep wandered off the map! The URL you requested doesn't exist, has been moved, or was mistyped.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn" style={{ padding: '12px 24px', background: '#16a34a', color: '#ffffff', textDecoration: 'none', borderRadius: '8px', fontWeight: 700 }}>
          🎮 Back to Home Arena
        </Link>
        <Link to="/crazy-cattle-3d-unblocked" className="btn secondary" style={{ padding: '12px 24px', background: '#2563eb', color: '#ffffff', textDecoration: 'none', borderRadius: '8px', fontWeight: 700 }}>
          🔓 Play Unblocked Mode
        </Link>
      </div>
      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.95rem' }}>
        <span>Explore Strategy Guides: </span>
        <Link to="/crazy-cattle-3d-how-to-play" style={{ color: '#2563eb', margin: '0 8px', fontWeight: 600 }}>How to Play</Link> •
        <Link to="/crazy-cattle-3d-how-to-win" style={{ color: '#2563eb', margin: '0 8px', fontWeight: 600 }}>How to Win</Link> •
        <Link to="/crazy-cattle-3d-guide" style={{ color: '#2563eb', margin: '0 8px', fontWeight: 600 }}>Map Breakdown</Link> •
        <Link to="/krillion" style={{ color: '#2563eb', margin: '0 8px', fontWeight: 600 }}>Krillion Daily Dive</Link>
      </div>
    </div>
  );
};

export default NotFound;
