import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = () => {
  const location = useLocation();

  // 定义每个页面的 SEO 配置
  const seoConfig = {
    '/': {
      title: 'Crazy Cattle 3D - Physics Battle Royale Game',
      description: 'Join the ultimate physics battle royale where explosive sheep compete for victory! Master physics mechanics, battle in chaotic arenas, and become the champion.'
    },
    '/about': {
      title: 'About Crazy Cattle 3D | Physics Battle Royale Game',
      description: 'Discover Crazy Cattle 3D, where explosive sheep create chaos in physics-based battles. Learn about our unique game design and the team behind the mayhem!'
    },
    '/contact': {
      title: 'Contact Us | Crazy Cattle 3D Support Team',
      description: 'Need help with Crazy Cattle 3D? Our support team is here to assist you with technical issues, bug reports, or general inquiries. Get in touch with us today!'
    },
    '/faq': {
      title: 'FAQ | Crazy Cattle 3D Game Help & Information',
      description: 'Get answers about Crazy Cattle 3D gameplay, controls, multiplayer features, and technical requirements. Find tips and solutions to common questions.'
    },
    '/privacy-policy': {
      title: 'Privacy Policy | Crazy Cattle 3D Game',
      description: 'Read how Crazy Cattle 3D protects your privacy and handles game data. Learn about our data collection practices, security measures, and your rights as a player.'
    },
    '/terms-of-service': {
      title: 'Terms of Service | Crazy Cattle 3D Game',
      description: 'Review Crazy Cattle 3D\'s terms of service. Understand the rules and conditions for playing our physics-based battle royale game and using our services.'
    }
  };

  useEffect(() => {
    // 获取当前路径
    const path = location.pathname;
    
    // 获取当前页面的 SEO 配置
    const currentSEO = seoConfig[path] || seoConfig['/'];
    
    // 更新 title
    document.title = currentSEO.title;
    
    // 更新 description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = currentSEO.description;
    
    // 更新 og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.property = 'og:title';
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = currentSEO.title;
    
    // 更新 og:description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.property = 'og:description';
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = currentSEO.description;
    
    // 找到 canonical 标签
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    
    // 如果没有找到，创建一个新的
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    
    // 设置正确的 canonical URL
    canonicalTag.href = `https://cattlecrazy3d.com${path}`;
    
    // 更新 og:url
    let ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (!ogUrlTag) {
      ogUrlTag = document.createElement('meta');
      ogUrlTag.property = 'og:url';
      document.head.appendChild(ogUrlTag);
    }
    ogUrlTag.content = `https://cattlecrazy3d.com${path}`;
  }, [location]);

  return null;
};

export default SEO; 