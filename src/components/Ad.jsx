import React, { useEffect } from 'react';
import './Ad.css';

const Ad = ({ slot, format = 'auto', responsive = true }) => {
  useEffect(() => {
    try {
      // 确保广告代码已加载
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading ad:', error);
    }
  }, []);

  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1787814795629825"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default Ad; 