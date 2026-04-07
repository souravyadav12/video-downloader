import React from 'react';
import { Shield, Zap, Heart, Globe, Users, Star } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 mb-4">
          <Heart size={12} className="text-rose-400" /> Our Story
        </div>
        <h1 className="text-4xl md:text-5xl font-black gradient-text mb-4">About VidSnap</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          A free, fast, privacy-respecting video tool built to help you save the videos you love — for offline personal use.
        </p>
      </div>

      {/* Mission */}
      <div className="glass rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-gray-400 leading-relaxed text-base mb-4">
          VidSnap was born out of a simple need: the ability to watch your favourite videos offline, without relying on a mobile data connection. Whether you're traveling on an airplane, commuting on the metro, or in an area with poor connectivity, VidSnap makes sure your favourite content is available when you need it.
        </p>
        <p className="text-gray-400 leading-relaxed text-base mb-4">
          We are <strong className="text-white">not a piracy tool</strong>. VidSnap is designed and intended exclusively for downloading videos that users have the legal right to save — such as their own uploads, Creative Commons-licensed content, or content made available for offline use by the creator. We strongly believe in respecting artists, creators, and copyright holders.
        </p>
        <p className="text-gray-400 leading-relaxed text-base">
          Our platform provides a fast, clean, no-nonsense experience. No registrations. No hidden fees. No intrusive pop-ups. Just paste a link and get your video.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {[
          {
            icon: <Shield size={24} className="text-emerald-400" />,
            title: 'Privacy First',
            desc: 'We never store your video URLs, download history, or personal data. Every request is processed in real-time and discarded immediately. What you download is your business.',
          },
          {
            icon: <Zap size={24} className="text-amber-400" />,
            title: 'Lightning-Fast Processing',
            desc: 'Our backend uses optimized pipelines to fetch video metadata and initiate downloads as quickly as technically possible. No waiting around.',
          },
          {
            icon: <Star size={24} className="text-indigo-400" />,
            title: 'Quality You Control',
            desc: 'From standard definition to stunning 4K Ultra HD, VidSnap lets you choose the exact quality you need. Audio-only downloads are supported too.',
          },
          {
            icon: <Globe size={24} className="text-sky-400" />,
            title: 'Multi-Platform Support',
            desc: 'VidSnap supports hundreds of video platforms including YouTube, Instagram, Facebook, TikTok, Twitter/X, Dailymotion, Vimeo, and many more.',
          },
          {
            icon: <Users size={24} className="text-purple-400" />,
            title: 'Built for Everyone',
            desc: 'Whether you\'re tech-savvy or a first-time user, VidSnap\'s clean interface is designed to be intuitive. No tutorials needed — just paste and download.',
          },
          {
            icon: <Heart size={24} className="text-rose-400" />,
            title: 'Free Forever',
            desc: 'VidSnap is and will remain free for personal use. We\'re sustained by unobtrusive advertising and optional user donations. No paywalls, ever.',
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="glass rounded-xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
              {icon}
            </div>
            <h3 className="font-bold text-white text-base">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* How it works expanded */}
      <div className="glass rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">How VidSnap Works</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          VidSnap is powered by an open-source backend that interfaces with video platform APIs to retrieve publicly available video stream information. Here's exactly what happens when you use VidSnap:
        </p>
        <div className="space-y-4">
          {[
            {
              step: '01',
              title: 'You Paste a Video URL',
              desc: 'Copy any video link from a supported platform and paste it into VidSnap\'s URL field. VidSnap accepts links from hundreds of websites.',
            },
            {
              step: '02',
              title: 'We Fetch Video Metadata',
              desc: 'VidSnap\'s server sends a request to retrieve the video\'s publicly available metadata — title, thumbnail, available quality options, and stream URLs. No content is downloaded at this stage.',
            },
            {
              step: '03',
              title: 'You Choose Your Quality',
              desc: 'We display all available quality options for that video, from low resolution up to 4K if supported. You select the quality that suits your needs.',
            },
            {
              step: '04',
              title: 'Your Browser Downloads the File',
              desc: 'VidSnap\'s server fetches the video stream in your chosen quality, merges audio and video streams if necessary, and pipes the resulting file directly to your browser as a download. The file is never stored on our servers.',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 p-4 rounded-xl bg-white/3 border border-white/5">
              <div className="text-3xl font-black gradient-text opacity-60 flex-shrink-0 w-10">{step}</div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment */}
      <div className="glass rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Our Commitment</h2>
        <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
          We are committed to operating a responsible, transparent, and legally compliant service. We take DMCA complaints seriously, we respect platform policies, and we continuously update our tool to ensure it serves its users ethically. If you have any concerns, we'd love to hear from you on our <a href="/contact" className="text-indigo-400 hover:underline">Contact</a> page.
        </p>
      </div>
    </div>
  );
}
