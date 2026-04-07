import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 mb-4">
          <AlertCircle size={12} className="text-amber-400" /> Important
        </div>
        <h1 className="text-4xl font-black gradient-text mb-3">Disclaimer</h1>
        <p className="text-gray-400 text-sm">Last updated: April 2, 2025</p>
      </div>

      <div className="glass rounded-2xl p-8 space-y-8">

        <section>
          <h2 className="text-xl font-bold text-white mb-3">General Disclaimer</h2>
          <p className="text-gray-400 leading-relaxed">
            The information and tools provided on VidSnap are for general, personal use only. VidSnap makes no representations or warranties regarding the accuracy, reliability, or completeness of the Service. Your use of VidSnap is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Copyright Disclaimer</h2>
          <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-500/25 mb-4">
            <p className="text-amber-300 text-sm leading-relaxed font-medium">
              ⚠️ VidSnap is strictly a personal-use tool. Downloading, distributing, or reproducing copyrighted content without the express permission of the copyright holder is illegal and unethical.
            </p>
          </div>
          <p className="text-gray-400 leading-relaxed">
            All videos, audio, and media content available on third-party platforms (such as YouTube, Instagram, TikTok, Facebook, Twitter/X, and others) are the intellectual property of their respective owners, creators, or licensors. VidSnap does not claim ownership over any content processed by the Service.
          </p>
          <p className="text-gray-400 leading-relaxed mt-3">
            VidSnap is designed to help users download videos for which they have a legitimate right to access — such as their own content, content licensed under Creative Commons, or content explicitly made available for download by the creator. It is the user's sole responsibility to verify that they have the legal right to download any content before doing so.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Personal Use Only</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap is intended exclusively for <strong className="text-white">personal, offline viewing</strong>. Users must not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4 mt-3">
            <li>Re-upload downloaded content to any platform without permission</li>
            <li>Use downloaded content for commercial purposes</li>
            <li>Distribute or share downloaded content publicly</li>
            <li>Use the Service to harvest content at scale or for scraping</li>
            <li>Use downloaded content in a way that infringes on platform Terms of Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">No Affiliation</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap is an independent tool and is <strong className="text-white">NOT affiliated with, endorsed by, or sponsored by</strong> YouTube, Google, Meta (Facebook/Instagram), TikTok, Twitter/X, or any other video-sharing platform. The names of these platforms are used solely for reference to describe compatibility and are trademarks of their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">External Links Disclaimer</h2>
          <p className="text-gray-400 leading-relaxed">
            Our website may contain links to external websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Limitation of Liability</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap shall not be held liable for any legal consequences arising from a user's decision to download copyrighted content. Users who misuse the Service for piracy, copyright infringement, or any other illegal activity do so entirely at their own risk and legal responsibility.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">DMCA Policy</h2>
          <p className="text-gray-400 leading-relaxed">
            If you are a copyright owner and believe that any content being facilitated through VidSnap infringes on your rights, please send a DMCA takedown notice to <span className="text-indigo-400">support@vidsnap.app</span>. We take copyright violations seriously and will respond promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Advertising Disclaimer</h2>
          <p className="text-gray-400 leading-relaxed">
            VidSnap is supported by advertising revenue (Google AdSense). Ads on this site are served by Google and its partners. VidSnap does not control the content of these ads and is not responsible for claims made by advertisers. The presence of an advertisement does not constitute an endorsement of the advertised product or service by VidSnap.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
          <p className="text-gray-400 leading-relaxed">
            For questions regarding this Disclaimer, please contact us at <span className="text-indigo-400">support@vidsnap.app</span>.
          </p>
        </section>

      </div>
    </div>
  );
}
