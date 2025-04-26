import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>
        <span role="img" aria-label="envelope">✉️</span>
        Contact Crazy Cattle 3D
      </h1>
      <div className="contact-content">
        <section>
          <h2>
            <span role="img" aria-label="wave">👋</span> 
            Get in Touch
          </h2>
          <p>Have questions about Crazy Cattle 3D? We'd love to hear from you! Here are the best ways to reach us:</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <h3>
                <span role="img" aria-label="envelope">📧</span> 
                Email
              </h3>
              <p>For general inquiries about Crazy Cattle 3D:</p>
              <a href="mailto:support@crazycattle3d.com">support@crazycattle3d.com</a>
            </div>

            <div className="contact-method">
              <h3>
                <span role="img" aria-label="wrench">🔧</span> 
                Support
              </h3>
              <p>For technical support and bug reports:</p>
              <a href="mailto:support@crazycattle3d.com">support@crazycattle3d.com</a>
            </div>

            <div className="contact-method">
              <h3>
                <span role="img" aria-label="globe">🌐</span> 
                Social Media
              </h3>
              <p>Follow Crazy Cattle 3D on social media:</p>
              <div className="social-links">
                <a href="https://github.com/cattlecrazy3d" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>
            <span role="img" aria-label="question">❓</span> 
            Frequently Asked Questions
          </h2>
          <p>Before contacting us, you might want to check our FAQ section for quick answers to common questions about Crazy Cattle 3D.</p>
          <a href="/faq" className="btn">View FAQ</a>
        </section>

        <section>
          <h2>
            <span role="img" aria-label="handshake">🤝</span> 
            Business Inquiries
          </h2>
          <p>For business opportunities and partnerships related to Crazy Cattle 3D:</p>
          <a href="mailto:support@crazycattle3d.com">support@crazycattle3d.com</a>
        </section>
      </div>
    </div>
  );
};

export default Contact; 