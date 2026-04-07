import React from 'react';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 mb-4">
          <FileText size={12} className="text-indigo-400" /> Legal
        </div>
        <h1 className="text-4xl font-black gradient-text mb-3">Terms & Conditions</h1>
        <p className="text-gray-400 text-sm">Last updated: April 2, 2025</p>
      </div>

      <div className="glass rounded-2xl p-8 space-y-8">

        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-400 leading-relaxed">
            By accessing or using VidSnap ("the Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Service. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap is an online video processing tool that allows users to retrieve and download video content for personal, offline use. The Service acts as a technical intermediary, processing publicly accessible video URLs provided by the user. VidSnap does not host, store, or distribute any video content on its own servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. User Responsibilities</h2>
          <p className="text-gray-400 leading-relaxed mb-3">By using VidSnap, you agree and represent that:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4">
            <li>You will only download content that you have the legal right to download.</li>
            <li>You will only use downloaded content for personal, non-commercial, offline viewing.</li>
            <li>You will not distribute, sell, or publicly perform any downloaded content without the consent of the copyright holder.</li>
            <li>You are solely responsible for ensuring that your use of this Service complies with the laws of your jurisdiction.</li>
            <li>You will not use the Service to download content that violates any applicable law, including but not limited to copyright law.</li>
            <li>You are at least 13 years of age.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Copyright & Intellectual Property</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap respects the intellectual property rights of others and expects users to do the same. The Service is not designed to circumvent digital rights management (DRM) technologies. All video content downloaded through VidSnap remains the property of its respective copyright holders. VidSnap makes no claim to ownership of any content processed through the Service.
          </p>
          <p className="text-gray-400 leading-relaxed mt-3">
            If you are a copyright holder and believe that content is being unlawfully distributed through our Service, please contact us immediately at <span className="text-indigo-400">support@vidsnap.app</span> with a DMCA notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Platform Terms of Service</h2>
          <p className="text-gray-400 leading-relaxed">
            Video platforms (YouTube, Instagram, TikTok, Facebook, etc.) have their own Terms of Service which may prohibit downloading content without explicit permission. By using VidSnap, you acknowledge that you have reviewed and accept responsibility for complying with the Terms of Service of any platform from which you download content. VidSnap is not affiliated with, endorsed by, or sponsored by any of these platforms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Disclaimer of Warranties</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that the Service will be uninterrupted, error-free, or free from viruses or other harmful components.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
          <p className="text-gray-400 leading-relaxed">
            To the maximum extent permitted by applicable law, VidSnap and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of (or inability to use) the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Advertising</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap uses Google AdSense and other third-party advertising services to display advertisements. These advertisements help support the continued free operation of the Service. You agree that VidSnap is not responsible for the content of third-party advertisements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Modifications to Service</h2>
          <p className="text-gray-400 leading-relaxed">
            We reserve the right to modify, suspend, or discontinue the Service (or any part of it) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">10. Governing Law</h2>
          <p className="text-gray-400 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in India.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">11. Changes to Terms</h2>
          <p className="text-gray-400 leading-relaxed">
            We reserve the right to modify these Terms at any time. We will provide notice of any significant changes by updating the "Last updated" date at the top of this page. Your continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">12. Contact</h2>
          <p className="text-gray-400 leading-relaxed">
            Questions about these Terms? Contact us at <span className="text-indigo-400">support@vidsnap.app</span>.
          </p>
        </section>

      </div>
    </div>
  );
}
