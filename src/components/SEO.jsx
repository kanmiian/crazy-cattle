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
          title: 'Crazy Cattle 3D - Sheep Battle Royale Game | Play Free Online',
          description: 'Play Crazy Cattle 3D, the ultimate physics-based battle royale game! Control explosive sheep and cattle, master momentum, and become the last animal standing. Free to play online.',
          keywords: 'Crazy Cattle 3D, battle royale game, sheep game, physics game, online game, free game',
          canonical: baseUrl
        };
      case '/about':
        return {
          title: 'About Crazy Cattle 3D - The Ultimate Sheep Battle Royale Game',
          description: 'Learn about Crazy Cattle 3D, the exciting physics-based battle royale game where sheep and cattle compete for survival. Discover the story behind this unique gaming experience.',
          keywords: 'About Crazy Cattle 3D, game development, battle royale, sheep game, game story',
          canonical: `${baseUrl}/about`
        };
      case '/contact':
        return {
          title: 'Contact Crazy Cattle 3D - Get in Touch with Our Team',
          description: 'Contact the Crazy Cattle 3D team for support, feedback, or collaboration opportunities. We\'re here to help and would love to hear from you!',
          keywords: 'Contact Crazy Cattle 3D, game support, feedback, collaboration',
          canonical: `${baseUrl}/contact`
        };
      case '/faq':
        return {
          title: 'FAQ - Crazy Cattle 3D Game Questions & Answers',
          description: 'Find answers to frequently asked questions about Crazy Cattle 3D. Learn about gameplay, controls, system requirements, and more to enhance your gaming experience.',
          keywords: 'Crazy Cattle 3D FAQ, game help, gameplay guide, troubleshooting',
          canonical: `${baseUrl}/faq`
        };
      case '/privacy-policy':
        return {
          title: 'Privacy Policy - Crazy Cattle 3D Game',
          description: 'Read our privacy policy to understand how Crazy Cattle 3D collects, uses, and protects your personal information while you enjoy our battle royale game.',
          keywords: 'Crazy Cattle 3D privacy policy, data protection, user privacy',
          canonical: `${baseUrl}/privacy-policy`
        };
      case '/terms-of-service':
        return {
          title: 'Terms of Service - Crazy Cattle 3D Game',
          description: 'Review the terms of service for Crazy Cattle 3D. Understand the rules, guidelines, and conditions for playing our battle royale game.',
          keywords: 'Crazy Cattle 3D terms, game rules, user agreement',
          canonical: `${baseUrl}/terms-of-service`
        };
      case '/cheese-chompers':
        return {
          title: 'Cheese Chompers - Free Online 3D Mouse Game | Collect Cheese',
          description: 'Play Cheese Chompers online! Guide your mouse through exciting 3D levels, collect cheese, and avoid obstacles in this addictive platformer game. Free to play',
          keywords: 'Cheese Chompers, 3D platformer, mouse game, cheese collecting game, free online game',
          canonical: `${baseUrl}/cheese-chompers`
        };
      default:
        return {
          title: title || 'Crazy Cattle 3D - Sheep Battle Royale Game',
          description: description || 'Play Crazy Cattle 3D, the ultimate physics-based battle royale game! Control explosive sheep and cattle, master momentum, and become the last animal standing.',
          keywords: 'Crazy Cattle 3D, battle royale game, sheep game, physics game',
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
    
    // 更新 keywords
    updateMetaTag('keywords', seoConfig.keywords);
    
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