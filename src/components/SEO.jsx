import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findHotGameByPath } from '../data/gameRegistry';

const SEO = ({ title, description, keywords }) => {
  const location = useLocation();
  const baseUrl = 'https://cattlecrazy3d.com';

  // 根据路径返回对应的 SEO 配置
  const getSEOConfig = () => {
    const hotGameConfig = findHotGameByPath(location.pathname);
    if (hotGameConfig) {
      return {
        title: hotGameConfig.seoTitle,
        description: hotGameConfig.seoDescription,
        keywords: hotGameConfig.keywords,
        image: hotGameConfig.image,
        canonical: `${baseUrl}${hotGameConfig.path}`
      };
    }

    switch (location.pathname) {
      case '/':
        return {
          title: 'Crazy Cattle 3D Unblocked - Play Online Free (2026) | All 3 Maps',
          description: 'Play Crazy Cattle 3D unblocked online for free in your browser (2026). Master physics-based sheep battle royale across Ireland, Iceland & New Zealand maps with no download needed!',
          keywords: 'Crazy Cattle 3D, Crazy Cattle 3D Unblocked, Play Crazy Cattle 3D Free, Sheep Battle Royale, Crazy Cattle Online 2026, Ireland Iceland New Zealand maps',
          canonical: `${baseUrl}/`
        };
      case '/crazy-cattle-3d-unblocked':
        return {
          title: 'Crazy Cattle 3D Unblocked - Play Free at School & Work (2026)',
          description: 'Play Crazy Cattle 3D unblocked online for free! Enjoy the physics battle royale on school Chromebooks and restricted networks without downloads or installation.',
          keywords: 'Crazy Cattle 3D Unblocked, Crazy Cattle Unblocked, Crazy Cattle 3D at school, crazy cattle unblocked 76, crazy cattle unblocked 66, physics battle royale unblocked',
          canonical: `${baseUrl}/crazy-cattle-3d-unblocked`
        };
      case '/crazy-cattle-3d-online':
        return {
          title: 'Crazy Cattle 3D Online - Play Free Browser Game (2026)',
          description: 'Play Crazy Cattle 3D online directly in your browser. Fast WebGL loading, zero downloads, and responsive physics battle royale action on PC and Mac.',
          keywords: 'Crazy Cattle 3D Online, Play Crazy Cattle 3D Online, Crazy Cattle free online, browser battle royale, sheep battle game',
          canonical: `${baseUrl}/crazy-cattle-3d-online`
        };
      case '/crazy-cattle-3d-download':
        return {
          title: 'Crazy Cattle 3D Download - Official PC & Mac Version (itch.io)',
          description: 'Learn how to download Crazy Cattle 3D for PC. Find the official itch.io page by creator Anna Mayberry, system requirements, and instant browser play alternatives.',
          keywords: 'Crazy Cattle 3D Download, Crazy Cattle 3D PC download, Crazy Cattle itch.io, Anna Mayberry Crazy Cattle, Crazy Cattle free download, play without downloading',
          canonical: `${baseUrl}/crazy-cattle-3d-download`
        };
      case '/crazy-cattle-3d-guide':
        return {
          title: 'Crazy Cattle 3D Strategy Guide - Controls, Maps & Pro Tips',
          description: 'Master Crazy Cattle 3D with our comprehensive guide! Detailed breakdown of Ireland, Iceland, and New Zealand maps, physics controls, and winning combat tactics.',
          keywords: 'Crazy Cattle 3D Guide, Crazy Cattle 3D tips, Crazy Cattle controls, Crazy Cattle 3D maps, Ireland map crazy cattle, Iceland map crazy cattle, New Zealand map crazy cattle',
          canonical: `${baseUrl}/crazy-cattle-3d-guide`
        };
      case '/cattle-crazy-3d':
        return {
          title: 'Cattle Crazy 3D - Play Online & Domain Guide (cattlecrazy3d.com)',
          description: 'Searching for Cattle Crazy 3D? Play the viral physics battle royale online free. Understand the differences between cattlecrazy3d.com and other mirror sites.',
          keywords: 'Cattle Crazy 3D, cattle crazy, cattlecrazy3d, crazycattle3d.com, cattle crazy game, sheep physics battle royale',
          canonical: `${baseUrl}/cattle-crazy-3d`
        };
      case '/about':
        return {
          title: 'About Crazy Cattle 3D | Independent Guide & Gameplay Portal',
          description: 'Discover Crazy Cattle 3D, the physics sheep battle royale by indie developer Anna Mayberry. Learn about our independent fan guide and online play portal.',
          canonical: `${baseUrl}/about`
        };
      case '/contact':
        return {
          title: 'Contact Us | Crazy Cattle 3D Support Team',
          description: 'Need help with Crazy Cattle 3D? Our support team is here to assist you with technical issues, bug reports, or general inquiries. Get in touch with us today!',
          canonical: `${baseUrl}/contact`
        };
      case '/faq':
        return {
          title: 'FAQ | Crazy Cattle 3D Game Help & Information',
          description: 'Get verified answers about Crazy Cattle 3D gameplay, controls, unblocked access, mobile play, and developer attribution.',
          canonical: `${baseUrl}/faq`
        };
      case '/privacy-policy':
        return {
          title: 'Privacy Policy | Crazy Cattle 3D Game',
          description: 'Read how Crazy Cattle 3D protects your privacy and handles game data. Learn about our data collection practices, security measures, and your rights as a player.',
          canonical: `${baseUrl}/privacy-policy`
        };
      case '/terms-of-service':
        return {
          title: 'Terms of Service | Crazy Cattle 3D Game',
          description: 'Review Crazy Cattle 3D\'s terms of service. Understand the rules and conditions for playing our physics-based battle royale game and using our services.',
          canonical: `${baseUrl}/terms-of-service`
        };
      case '/crazy-cattle-3d-mobile':
        return {
          title: 'Crazy Cattle 3D Mobile - Sheep Battle Royale Mobile Touch Edition',
          description: 'Play Crazy Cattle 3D Mobile free in your smartphone or tablet browser! Touch-screen optimized physics sheep combat adapted from the original PC edition.',
          keywords: 'Crazy Cattle 3D Mobile, Crazy Cattle mobile version, play crazy cattle on phone, crazy cattle android ios, touch battle royale',
          canonical: `${baseUrl}/crazy-cattle-3d-mobile`
        };
      case '/lovemoney':
        return {
          title: 'LoveMoney - Free Online Money Game | Play LoveMoney Online',
          description: 'Play LoveMoney online for free! Experience the ultimate online money game where you collect, manage, and grow your virtual wealth. Play LoveMoney completely free - no download required!',
          canonical: `${baseUrl}/lovemoney`
        };
      case '/build-a-ring-farm':
        return {
          title: 'Build A Ring Farm - Play Online Farm Incremental Game',
          description: 'Play Build A Ring Farm online for free. Grow crops in circular fields, unlock seeds, upgrade ring farms, and check the latest codes and seed guide.',
          canonical: `${baseUrl}/build-a-ring-farm`
        };
      case '/steal-beanstalk-for-brainrots':
        return {
          title: 'Steal Beanstalk for Brainrots - Play Online',
          description: 'Play Steal Beanstalk for Brainrots online. Grow your beanstalk, capture rare Brainrots, protect your collection, and follow upgrade tips.',
          canonical: `${baseUrl}/steal-beanstalk-for-brainrots`
        };
      case '/cars-arena':
        return {
          title: 'Cars Arena - Play Online Shrinking Platform Car Game',
          description: 'Play Cars Arena online. Drift across a shrinking platform, fight for space, and use survival tips for this hot CrazyGames car arena game.',
          canonical: `${baseUrl}/cars-arena`
        };
      case '/goal-gang':
        return {
          title: 'Goal Gang - Play Online Multiplayer Soccer Game',
          description: 'Play Goal Gang online. Join chaotic multiplayer football matches, use teamwork tips, and follow World Cup 2026 soccer keyword updates.',
          canonical: `${baseUrl}/goal-gang`
        };
      case '/imagine-island':
        return {
          title: 'Imagine Island - Play Online Virtual Island Game',
          description: 'Play Imagine Island online. Explore fishing, fashion, food obby runs, prop hunt, friends, and monthly event update tips.',
          canonical: `${baseUrl}/imagine-island`
        };
      case '/emoji-guess-master':
        return {
          title: 'Emoji Guess Master - Play Online with Answers and Level Hints',
          description: 'Play Emoji Guess Master online. Follow answer hints, level keywords, and quick puzzle tips for the CrazyGames game updated on July 2, 2026.',
          canonical: `${baseUrl}/emoji-guess-master`
        };
      case '/dino-world':
        return {
          title: 'Dino World - Play Online Dinosaur Squad Game',
          description: 'Play Dino World online. Build a dinosaur squad, upgrade ancient creatures, and follow beginner tips for the new CrazyGames dinosaur game.',
          canonical: `${baseUrl}/dino-world`
        };
      case '/captain-blast':
        return {
          title: 'Captain Blast - Play Online with Level Tips',
          description: 'Play Captain Blast online. Explore a level-based puzzle adventure updated June 30, 2026, with tips for obstacles, timing, and stage progression.',
          canonical: `${baseUrl}/captain-blast`
        };
      case '/clues-by-sam':
        return {
          title: 'Clues by Sam - Free Daily Logic Puzzle Game | Play Online',
          description: 'Play Clues by Sam online for free! Solve daily logic puzzles where you figure out who is criminal and who is innocent. New puzzle every day at midnight New York time. Play Clues by Sam completely free - no download required!',
          canonical: `${baseUrl}/clues-by-sam`
        };
      case '/cheese-chompers':
        return {
          title: 'Cheese Chompers - Free Online 3D Mouse Game | Collect Cheese',
          description: 'Play Cheese Chompers online! Guide your mouse through exciting 3D levels, collect cheese, and avoid obstacles in this addictive platformer game. Free to play',
          canonical: `${baseUrl}/cheese-chompers`
        };
      default:
        return {
          title: title || 'Crazy Cattle 3D Unblocked - Play Online Free (2026) | All 3 Maps',
          description: description || 'Play Crazy Cattle 3D, the ultimate physics-based battle royale game! Control explosive sheep and cattle across Ireland, Iceland & New Zealand.',
          keywords,
          canonical: `${baseUrl}${location.pathname}`
        };
    }
  };

  useEffect(() => {
    const seoConfig = getSEOConfig();
    
    // 更新 title
    document.title = seoConfig.title;
    
    // 更新或创建 meta 标签
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 更新或创建 property meta 标签
    const updatePropertyMetaTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 更新 description
    updateMetaTag('description', seoConfig.description);
    if (seoConfig.keywords) {
      updateMetaTag('keywords', seoConfig.keywords);
    }
    
    // 更新 canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seoConfig.canonical;

    // 更新 Open Graph 标签
    updatePropertyMetaTag('og:type', 'website');
    updatePropertyMetaTag('og:url', seoConfig.canonical);
    updatePropertyMetaTag('og:title', seoConfig.title);
    updatePropertyMetaTag('og:description', seoConfig.description);
    updatePropertyMetaTag('og:image', seoConfig.image?.startsWith('http') ? seoConfig.image : `${baseUrl}${seoConfig.image || '/images/crazycattle-preview.webp'}`);

    // 更新 Twitter 标签
    updatePropertyMetaTag('twitter:card', 'summary_large_image');
    updatePropertyMetaTag('twitter:url', seoConfig.canonical);
    updatePropertyMetaTag('twitter:title', seoConfig.title);
    updatePropertyMetaTag('twitter:description', seoConfig.description);
    updatePropertyMetaTag('twitter:image', seoConfig.image?.startsWith('http') ? seoConfig.image : `${baseUrl}${seoConfig.image || '/images/crazycattle-preview.webp'}`);
  }, [location]);

  return null;
};

export default SEO;
