import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <div className="legal-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Crazy Cattle 3D. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2>2. Data We Collect</h2>
          <p>We collect and process the following data:</p>
          <ul>
            <li>Game performance data (scores, achievements)</li>
            <li>Technical data (browser type, device information)</li>
            <li>Usage data (how you interact with our game)</li>
            <li>Analytics data (Google Analytics)</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Improve game performance and user experience</li>
            <li>Analyze game usage patterns</li>
            <li>Maintain and enhance game security</li>
            <li>Provide customer support</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal data against unauthorized access, 
            alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Request data portability</li>
          </ul>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            <br />
            Email: privacy@crazycattle3d.com
          </p>
        </section>

        <section>
          <h2>7. Updates to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. The latest version will always be posted on this page 
            with the effective date.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 