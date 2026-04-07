import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 mb-4">
          <Shield size={12} className="text-indigo-400" /> Legal
        </div>
        <h1 className="text-4xl font-black gradient-text mb-3">Privacy Policy</h1>
        <p className="text-gray-400 text-sm">Last updated: April 2, 2025</p>
      </div>

      <div className="glass rounded-2xl p-8 space-y-8 prose-custom">

        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
          <p className="text-gray-400 leading-relaxed">
            Welcome to <strong className="text-white">VidSnap</strong> ("<strong className="text-white">we</strong>," "<strong className="text-white">our</strong>," or "<strong className="text-white">us</strong>"). We operate the website VidSnap (the "<strong className="text-white">Service</strong>"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this Privacy Policy carefully.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
          <h3 className="text-base font-semibold text-gray-200 mb-2">2.1 Information You Provide</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            When you use our contact form, we collect the name, email address, and message content that you voluntarily provide to us. We use this information solely to respond to your inquiry.
          </p>
          <h3 className="text-base font-semibold text-gray-200 mb-2">2.2 Automatically Collected Information</h3>
          <p className="text-gray-400 leading-relaxed mb-2">
            When you use VidSnap, our servers may automatically log:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-400 pl-4">
            <li>IP addresses (anonymised)</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent</li>
            <li>Referral URLs</li>
            <li>Device type (desktop / mobile)</li>
          </ul>
          <p className="text-gray-400 leading-relaxed mt-3">
            <strong className="text-gray-300">We do NOT store any video URLs you paste, video files you download, or any personally identifiable media processing data.</strong> All download requests are handled in real-time and no content is retained on our servers after delivery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. Cookies</h2>
          <p className="text-gray-400 leading-relaxed">
            We use cookies and similar tracking technologies to improve your experience. Types of cookies we use:
          </p>
          <div className="mt-4 space-y-3">
            {[
              { name: 'Essential Cookies', desc: 'Required for the website to function. They enable core functionality such as security and network management. You cannot opt out of these.' },
              { name: 'Analytics Cookies', desc: 'Help us understand how visitors interact with our website. We use Google Analytics to collect anonymized data about page views and user flows.' },
              { name: 'Advertising Cookies', desc: 'Used by Google AdSense to deliver advertisements relevant to your interests. These cookies track your browsing activity across websites.' },
              { name: 'Preference Cookies', desc: 'Store your preferences (e.g., dark/light mode) so we can provide a personalized experience on subsequent visits.' },
            ].map(({ name, desc }) => (
              <div key={name} className="p-4 bg-white/3 rounded-xl border border-white/5">
                <div className="font-semibold text-indigo-300 text-sm mb-1">{name}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 leading-relaxed mt-4">
            You can control and manage cookies through your browser settings. Disabling certain cookies may affect the functionality of this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Google AdSense & Third-Party Ads</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap uses Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site.
          </p>
          <p className="text-gray-400 leading-relaxed mt-3">
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google Ads Settings</a>. For more information on how Google uses data, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google's Privacy & Terms</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-400 pl-4">
            <li>To provide and maintain our Service</li>
            <li>To respond to your contact form inquiries</li>
            <li>To analyze usage patterns and improve our website</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To display relevant advertisements via Google AdSense</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Data Sharing & Disclosure</h2>
          <p className="text-gray-400 leading-relaxed">
            We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data with analytics providers (Google Analytics) to help us understand how our Service is used. We may also share information in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-400 pl-4 mt-3">
            <li>To comply with a legal obligation</li>
            <li>To protect and defend our rights or property</li>
            <li>To prevent or investigate possible wrongdoing</li>
            <li>With advertising partners (Google AdSense) in accordance with their privacy policies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Data Security</h2>
          <p className="text-gray-400 leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Children's Privacy</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Your Rights</h2>
          <p className="text-gray-400 leading-relaxed">
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-400 pl-4 mt-3">
            <li>Right to access information we hold about you</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to request deletion of your data</li>
            <li>Right to opt out of data processing for marketing</li>
            <li>Right to data portability (EU/UK residents)</li>
          </ul>
          <p className="text-gray-400 leading-relaxed mt-3">
            To exercise any of these rights, please contact us at the email address listed on our Contact page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">10. Changes to This Policy</h2>
          <p className="text-gray-400 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last updated" date. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">11. Contact Us</h2>
          <p className="text-gray-400 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at <span className="text-indigo-400">support@vidsnap.app</span> or through our <a href="/contact" className="text-indigo-400 hover:underline">Contact Page</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
