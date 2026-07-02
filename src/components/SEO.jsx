import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description }) => {
  const location = useLocation();
  const baseUrl = 'https://cattlecrazy3d.com';

  // 根据路径返回对应的 SEO 配置
  const getSEOConfig = () => {
    switch (location.pathname) {
      case '/':
        return {
          title: 'Crazy Cattle 3D - Sheep Battle Royale Game',
          description: 'Join the ultimate physics battle royale where explosive sheep compete for victory! Master physics mechanics, battle in chaotic arenas, and become the champion.',
          canonical: baseUrl
        };
      case '/about':
        return {
          title: 'About Crazy Cattle 3D | Physics Battle Royale Game',
          description: 'Discover Crazy Cattle 3D, where explosive sheep create chaos in physics-based battles. Learn about our unique game design and the team behind the mayhem!',
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
           description: 'Get answers about Crazy Cattle 3D gameplay, controls, multiplayer features, and technical requirements. Find tips and solutions to common questions.',
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
      case '/crazy-cattle-3d-mobile':
        return {
          title: 'Crazy Cattle 3D Mobile - Sheep Battle Royale Mobile Game | Play Free',
          description: 'Play Crazy Cattle 3D Mobile free! The mobile version of Crazy Cattle 3D, adapted from the PC version. Physics-based sheep and cattle battle royale for phones and tablets. No download required.',
          canonical: `${baseUrl}/crazy-cattle-3d-mobile`
        };
      default:
        return {
          title: title || 'Crazy Cattle 3D - Sheep Battle Royale Game',
          description: description || 'Play Crazy Cattle 3D, the ultimate physics-based battle royale game! Control explosive sheep and cattle, master momentum, and become the last animal standing.',
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
    updatePropertyMetaTag('og:image', `${baseUrl}/images/crazycattle-preview.webp`);

    // 更新 Twitter 标签
    updatePropertyMetaTag('twitter:card', 'summary_large_image');
    updatePropertyMetaTag('twitter:url', seoConfig.canonical);
    updatePropertyMetaTag('twitter:title', seoConfig.title);
    updatePropertyMetaTag('twitter:description', seoConfig.description);
    updatePropertyMetaTag('twitter:image', `${baseUrl}/images/crazycattle-preview.webp`);
  }, [location]);

  return null;
};

export default SEO;
