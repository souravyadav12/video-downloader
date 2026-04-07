import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Video size={16} className="text-white" />
              </div>
              <span className="font-black text-lg gradient-text">VidSnap</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              A free online video tool to save videos from popular platforms for personal, offline use.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-widest">Explore</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/blog', label: 'Blog' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-xs text-gray-500 hover:text-indigo-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-widest">Legal</h3>
            <ul className="space-y-2">
              {[
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms & Conditions' },
                { to: '/disclaimer', label: 'Disclaimer' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-xs text-gray-500 hover:text-indigo-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-widest">Trust</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-emerald-400" />
                <span className="text-xs text-gray-500">No data stored</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-emerald-400" />
                <span className="text-xs text-gray-500">No login required</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-emerald-400" />
                <span className="text-xs text-gray-500">HTTPS encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer bar */}
        <div className="border-t border-white/5 pt-6 space-y-2 text-center">
          <p className="text-xs text-gray-600 leading-relaxed max-w-3xl mx-auto">
            ⚠️ <strong className="text-gray-500">Disclaimer:</strong> VidSnap is intended for personal, offline use only. 
            Users are solely responsible for complying with the copyright laws and terms of service of the platforms from which they download content. 
            Downloading copyrighted content without permission may be illegal in your country.
          </p>
          <p className="text-xs text-gray-700">
            © {year} VidSnap · Made with <Heart size={10} className="inline text-rose-500" /> · Free forever
          </p>
        </div>
      </div>
    </footer>
  );
}
