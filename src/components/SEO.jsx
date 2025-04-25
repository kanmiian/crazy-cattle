import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    // 获取当前路径
    const path = location.pathname;
    
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
    if (ogUrlTag) {
      ogUrlTag.content = `https://cattlecrazy3d.com${path}`;
    }
  }, [location]);

  return null;
};

export default SEO; 