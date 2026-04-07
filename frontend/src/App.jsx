import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Download, Search, Video, Music, AlertCircle,
  Settings2, Zap, Shield, Clock, Star, Heart, Coffee,
  TrendingUp, CheckCircle, ChevronDown, X, CreditCard, Smartphone,
  ChevronRight, Info, HelpCircle
} from 'lucide-react';

// Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import Contact from './pages/Contact';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AdBanner } from './components/AdBanner';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// ========================
//  HELPERS
// ========================

function getBadge(heightNum) {
  if (heightNum >= 2160) return { label: '4K', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)' };
  if (heightNum >= 1440) return { label: '2K', bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)' };
  if (heightNum >= 1080) return { label: 'HD', bg: 'linear-gradient(135deg,#10b981,#059669)' };
  return null;
}

function getFormatLabel(res) {
  if (res === 'audio') return { main: 'Audio only', sub: 'M4A · Best quality' };
  const h = parseInt(res);
  if (h >= 2160) return { main: `${h}p`, sub: '4K Ultra HD' };
  if (h >= 1440) return { main: `${h}p`, sub: '2K Quad HD' };
  if (h >= 1080) return { main: `${h}p`, sub: 'Full HD' };
  if (h >= 720)  return { main: `${h}p`, sub: 'HD Ready' };
  if (h >= 480)  return { main: `${h}p`, sub: 'Standard' };
  return { main: `${h}p`, sub: 'Low' };
}

// ========================
//  PAYMENT PLANS
// ========================

const PLANS = [
  { id: 'coffee', name: 'Coffee', price: 49, emoji: '☕', color: 'from-amber-500 to-orange-500', glow: 'rgba(245,158,11,0.35)', perks: ['Say thanks', 'Keep servers alive', 'Good karma'], badge: null },
  { id: 'supporter', name: 'Supporter', price: 99, emoji: '🚀', color: 'from-indigo-500 to-purple-600', glow: 'rgba(99,102,241,0.4)', perks: ['Priority downloads', 'No ads (coming soon)', 'Support development'], badge: 'Popular' },
  { id: 'pro', name: 'Pro Backer', price: 199, emoji: '⭐', color: 'from-rose-500 to-pink-600', glow: 'rgba(244,63,94,0.4)', perks: ['All Supporter perks', 'Early access features', 'Name in credits'], badge: 'Best Value' },
];

// ========================
//  PAYMENT MODAL
// ========================

const PaymentModal = memo(({ onClose }) => {
  const [selected, setSelected] = useState(PLANS[1]);
  const [status, setStatus] = useState('idle');
  const [txnId, setTxnId] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handlePay = () => {
    if (typeof window.Razorpay === 'undefined') {
      alert('Razorpay is loading, please try in a moment.');
      return;
    }
    setStatus('loading');
    const RAZORPAY_KEY = 'rzp_test_YOUR_KEY_ID';
    const options = {
      key: RAZORPAY_KEY,
      amount: selected.price * 100,
      currency: 'INR',
      name: 'VidSnap',
      description: `${selected.name} — ₹${selected.price}`,
      image: '/logo.png',
      handler: (response) => { setTxnId(response.razorpay_payment_id); setStatus('success'); },
      prefill: { name: '', email: '', contact: '' },
      theme: { color: '#6366f1' },
      modal: { ondismiss: () => setStatus('idle') },
    };
    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => setStatus('failed'));
      rzp.open();
      setStatus('idle');
    } catch (err) {
      console.error('Razorpay open error:', err);
      setStatus('failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg glass rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-rose-400" />
            <span className="font-black text-white text-lg">Support VidSnap</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-6 space-y-4 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-black text-white">Thank you! 🎉</h3>
              <p className="text-gray-400 text-sm">Your payment was successful. You're awesome!</p>
              {txnId && <p className="text-xs text-gray-600 font-mono bg-white/5 px-4 py-2 rounded-lg">Txn ID: {txnId}</p>}
              <button onClick={onClose} className="btn-primary px-8 py-3 rounded-xl text-white font-bold text-sm">Close</button>
            </div>
          ) : status === 'failed' ? (
            <div className="text-center py-6 space-y-4 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              <h3 className="text-xl font-black text-white">Payment Failed</h3>
              <p className="text-gray-400 text-sm">Something went wrong. Please try again.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setStatus('idle')} className="btn-primary px-6 py-2.5 rounded-xl text-white font-bold text-sm">Try Again</button>
                <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-400 font-bold text-sm glass hover:bg-white/10">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="text-gray-400 text-sm text-center">VidSnap is free. Your support keeps it running &amp; improving. ❤️</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PLANS.map((plan) => {
                  const isSelected = selected.id === plan.id;
                  return (
                    <button key={plan.id} onClick={() => setSelected(plan)}
                      className={`relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-200 ${isSelected ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6'}`}
                    >
                      {plan.badge && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
                          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>{plan.badge}</span>
                      )}
                      <span className="text-3xl mb-1">{plan.emoji}</span>
                      <span className="font-bold text-white text-sm">{plan.name}</span>
                      <span className={`font-black text-xl bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mt-0.5`}>₹{plan.price}</span>
                      <ul className="mt-2 space-y-0.5">
                        {plan.perks.map((p, i) => (
                          <li key={i} className="text-[11px] text-gray-400 flex items-center gap-1 justify-center">
                            <CheckCircle size={10} className="text-emerald-400 flex-shrink-0" />{p}
                          </li>
                        ))}
                      </ul>
                      {isSelected && <div className="mt-2 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center"><CheckCircle size={11} className="text-white" /></div>}
                    </button>
                  );
                })}
              </div>
              <button id="razorpay-pay-btn" onClick={handlePay} disabled={status === 'loading'}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-black text-base disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'loading' ? <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Processing…</> : <><CreditCard size={18} /> Pay ₹{selected.price} · {selected.name}</>}
              </button>
              <div className="flex items-center justify-center gap-3 pt-1">
                <Smartphone size={14} className="text-gray-500" />
                <span className="text-xs text-gray-500">UPI · Cards · Net Banking · Wallets · EMI</span>
              </div>
              <p className="text-[11px] text-gray-600 text-center">🔒 Secured by Razorpay · PCI DSS compliant</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// ========================
//  SUPPORT SECTION
// ========================

const SupportSection = memo(({ onOpenPayment }) => (
  <div className="glass rounded-2xl p-6 text-center space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
    <div className="flex items-center justify-center gap-2 mb-1">
      <Heart size={18} className="text-rose-400 animate-pulse" />
      <span className="font-bold text-gray-200 text-sm uppercase tracking-wider">Support VidSnap</span>
      <Heart size={18} className="text-rose-400 animate-pulse" />
    </div>
    <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
      VidSnap is free for everyone. If it saves you time, consider supporting — it keeps the servers running!
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
      <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" id="btn-buy-coffee"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-1"
        style={{ background: 'linear-gradient(135deg,#f59e0b,#ef6c00)', boxShadow: '0 4px 14px rgba(245,158,11,0.4)' }}>
        <Coffee size={16} /> Buy me a coffee
      </a>
      <button id="btn-razorpay-open" onClick={onOpenPayment}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-1"
        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}>
        <CreditCard size={16} /> Support via Razorpay
      </button>
    </div>
    <p className="text-[11px] text-gray-600 pt-1">🔒 Secure payment · UPI · Cards · Wallets · All methods</p>
  </div>
));

// ========================
//  QUALITY DROPDOWN
// ========================

const QualityDropdown = memo(({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative w-full sm:flex-1" ref={ref}>
      <button type="button" id="quality-dropdown-btn" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 glass text-white rounded-xl py-3 px-4 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer hover:bg-white/10">
        <div className="flex items-center gap-2">
          {selected?.value === 'audio' ? <Music size={16} className="text-indigo-400" /> : <Settings2 size={16} className="text-indigo-400" />}
          <span className="text-sm">{selected?.triggerLabel || selected?.main}</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 w-full z-50" style={{ animation: 'fadeInUp 0.15s ease-out' }}>
          <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-white/10" style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.7)' }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <Settings2 size={14} className="text-indigo-400" />
              <span className="text-white font-bold text-xs tracking-widest uppercase">Quality</span>
            </div>
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {options.map((opt) => {
                const isSelected = opt.value === value;
                const badge = opt.value !== 'audio' ? getBadge(parseInt(opt.value)) : null;
                return (
                  <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 transition-all duration-100 ${isSelected ? 'bg-indigo-600/30' : 'hover:bg-white/8'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-4 flex items-center justify-center">
                        {isSelected && <CheckCircle size={14} className="text-indigo-400" />}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white">{opt.main}</span>
                          {badge && <span className="text-[9px] font-black px-1.5 py-0.5 rounded text-white" style={{ background: badge.bg, letterSpacing: '0.06em' }}>{badge.label}</span>}
                        </div>
                        {opt.sub && <div className="text-xs text-gray-400 mt-0.5">{opt.sub}</div>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// ========================
//  SKELETON LOADER
// ========================

const SkeletonCard = () => (
  <div className="glass rounded-3xl p-6 md:p-8 animate-fade-in">
    <div className="md:flex gap-6">
      <div className="skeleton md:w-64 rounded-xl h-40 flex-shrink-0" />
      <div className="flex-1 mt-6 md:mt-0 space-y-3">
        <div className="skeleton h-4 w-20 rounded" />
        <div className="skeleton h-6 w-full rounded" />
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-12 w-full rounded-xl mt-8" />
      </div>
    </div>
  </div>
);

// ========================
//  FAQ SECTION
// ========================

const faqs = [
  { q: 'Is VidSnap completely free to use?', a: 'Yes! VidSnap is 100% free for personal use. We\'re supported by unobtrusive display advertising. You can optionally donate to keep the servers running, but it\'s never required.' },
  { q: 'What video platforms does VidSnap support?', a: 'VidSnap supports hundreds of websites including YouTube, Instagram, Facebook, TikTok, Twitter/X, Dailymotion, Vimeo, and many more. If the video is publicly accessible, VidSnap can usually download it.' },
  { q: 'What is the maximum video quality I can download?', a: 'VidSnap supports downloads up to 4K Ultra HD (2160p) where available. The quality options shown depend on what the source platform offers for that specific video.' },
  { q: 'Do I need to create an account or log in?', a: 'No. VidSnap requires absolutely no registration, account creation, or personal information. Just paste a link and download — in seconds.' },
  { q: 'Is it safe to use VidSnap?', a: 'Yes. VidSnap is a browser-based tool — you don\'t download or install anything on your device. We use HTTPS encryption, never store your video URLs, and never retain your downloaded files on our servers.' },
  { q: 'Can I download videos from private accounts?', a: 'No. VidSnap can only access publicly available content — the same content any browser user can see. Private, restricted, or paywalled content cannot be accessed.' },
  { q: 'Is it legal to download videos?', a: 'VidSnap is intended for downloading content you have the legal right to save (your own videos, Creative Commons content, etc.) for personal offline viewing. Downloading copyrighted content without permission may be illegal in your country. Always respect copyright.' },
  { q: 'Why is my download slow or failing?', a: 'Download speed depends on your internet connection and the video size. For large 4K videos, processing can take a few minutes. If a download fails, try a lower quality setting or check if the video is still publicly available.' },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-white transition-colors"
      >
        <span className={`text-sm font-semibold ${open ? 'text-white' : 'text-gray-300'} leading-snug`}>{q}</span>
        <ChevronDown size={16} className={`text-indigo-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-4 animate-fade-in-up">
          <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
};

// ========================
//  HOMEPAGE
// ========================

const features = [
  { icon: <Zap size={14} />, label: 'Lightning Fast' },
  { icon: <Shield size={14} />, label: '100% Safe' },
  { icon: <Star size={14} />, label: '4K Support' },
  { icon: <Clock size={14} />, label: 'No Waiting' },
];

function HomePage() {
  const [showPayment, setShowPayment] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('1080p');
  const [isWakingUp, setIsWakingUp] = useState(false);

  const getQualityOptions = useCallback(() => {
    const ALL_QUALITIES = [2160, 1440, 1080, 720, 480, 360, 240];
    let heights;
    if (videoInfo?.formats?.length > 0) {
      heights = [...new Set(videoInfo.formats.filter(f => f.height).map(f => f.height))]
        .filter(h => h >= 144)
        .sort((a, b) => b - a);
    } else {
      heights = ALL_QUALITIES;
    }
    const videoOptions = heights.map((h, i) => {
      const res = `${h}p`;
      const { main, sub } = getFormatLabel(res);
      return { value: res, main, sub: i === 0 ? sub + ' · Best' : sub, triggerLabel: i === 0 ? `${main} — Best` : main };
    });
    return [...videoOptions, { value: 'audio', main: 'Audio only', sub: 'M4A · Best quality', triggerLabel: 'Audio only (M4A)' }];
  }, [videoInfo]);

  const handleFetchInfo = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setVideoInfo(null);
    setIsWakingUp(false);
    const wakeTimeout = setTimeout(() => setIsWakingUp(true), 5000);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/info`, { url }, { timeout: 60000 });
      setVideoInfo(response.data);
      const heights = (response.data.formats || []).filter(f => f.height).map(f => f.height);
      if (heights.length > 0) {
        setSelectedFormat(`${Math.max(...heights)}p`);
      } else {
        setSelectedFormat('1080p');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. The server may be starting up — please try again in 30 seconds.');
      } else if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
        setError('Cannot reach the server. Make sure the backend is running on port 5001.');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch video info. Please check the URL and try again.');
      }
    } finally {
      clearTimeout(wakeTimeout);
      setLoading(false);
      setIsWakingUp(false);
    }
  };

  const handleDownload = useCallback((format) => {
    setDownloading(true);
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${API_BASE_URL}/api/download`;
    const urlInput = document.createElement('input');
    urlInput.type = 'hidden'; urlInput.name = 'url'; urlInput.value = url;
    const fmtInput = document.createElement('input');
    fmtInput.type = 'hidden'; fmtInput.name = 'format'; fmtInput.value = format;
    form.appendChild(urlInput);
    form.appendChild(fmtInput);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    // The browser will start the download natively.
    // Reset the button after a few seconds.
    setTimeout(() => {
      setDownloading(false);
    }, 4000);
  }, [url]);

  const qualityOptions = getQualityOptions();

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">

      {/* Top leaderboard ad */}
      <AdBanner size="leaderboard" />

      {/* Hero text */}
      <div className="text-center space-y-4 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 mb-2">
          <Zap size={12} className="text-indigo-400" /> Free · Fast · No Signup Required
        </div>
        <h1 className="text-4xl md:text-5xl font-black gradient-text leading-tight pb-1">
          Download Any Video
        </h1>
        <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto">
          Save online videos for personal offline viewing in HD, 1080p &amp; 4K — completely free.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {features.map((f, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-gray-300 bg-white/5 border border-white/8">
              <span className="text-indigo-400">{f.icon}</span>{f.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── SEARCH CARD ── */}
      <div className="glass rounded-2xl p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <form onSubmit={handleFetchInfo} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-indigo-400" />
            </div>
            <input
              id="video-url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              autoComplete="off"
              spellCheck="false"
              className="block w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/70 focus:bg-white/8 input-glow sm:text-base transition-all duration-200"
              placeholder="Paste video link from any platform here..."
            />
          </div>
          <button id="fetch-video-btn" type="submit" disabled={loading || downloading}
            className="btn-primary w-full flex justify-center items-center py-4 px-6 rounded-xl text-white font-bold text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Fetching video info...</span>
              </div>
            ) : (
              <><Search className="mr-2 h-5 w-5" /> Get Video Info</>
            )}
          </button>
        </form>

        {loading && (
          <div className="mt-4 w-full rounded-full overflow-hidden bg-white/5">
            <div className="progress-bar w-full" style={{ height: '3px' }} />
          </div>
        )}

        {isWakingUp && loading && (
          <div className="mt-4 p-4 bg-amber-900/20 rounded-xl border border-amber-500/20 animate-fade-in-up">
            <p className="text-sm text-amber-300 font-medium flex items-center gap-2">
              <span className="text-xl">☕</span>
              Server is waking up… this may take up to 50 seconds on first request.
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-950/50 border border-red-500/30 p-4 rounded-xl flex items-start gap-3 animate-fade-in-up">
          <AlertCircle className="text-red-400 w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-red-300 text-sm font-medium">{error}</p>
        </div>
      )}

      {loading && !videoInfo && <SkeletonCard />}

      {/* ── VIDEO INFO CARD ── */}
      {videoInfo && !loading && (
        <div className="glass rounded-3xl animate-fade-in-up shadow-2xl" style={{ animationDelay: '0.05s' }}>
          <div className="md:flex gap-0">
            <div className="relative md:w-72 flex-shrink-0 overflow-hidden rounded-t-3xl md:rounded-none md:rounded-l-3xl">
              <img className="w-full h-48 md:h-full object-cover" src={videoInfo.thumbnail} alt="Video thumbnail" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {videoInfo.duration_string && (
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-lg">
                  {videoInfo.duration_string}
                </div>
              )}
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-indigo-500/15 px-3 py-1 rounded-full mb-3">
                  <Video size={12} />
                  <span>{videoInfo.platform || 'Video'}</span>
                </div>
                <h2 className="text-xl font-bold text-white leading-snug line-clamp-3">{videoInfo.title}</h2>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <QualityDropdown options={qualityOptions} value={selectedFormat} onChange={setSelectedFormat} />
                  <button id="download-btn" onClick={() => handleDownload(selectedFormat)} disabled={downloading}
                    className="btn-primary sm:flex-1 flex justify-center items-center py-3 px-6 rounded-xl text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none gap-2">
                    <Download size={16} />
                    {downloading ? 'Processing...' : 'Download'}
                  </button>
                </div>
                {downloading && (
                  <div className="p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/20 animate-fade-in-up">
                    <p className="text-xs text-emerald-400 font-medium flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                      Starting download... Check your browser downloads.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mid-page Ad */}
      <AdBanner size="rectangle" className="animate-fade-in-up" />

      {/* ── SUPPORT SECTION ── */}
      <div id="support">
        <SupportSection onOpenPayment={() => setShowPayment(true)} />
      </div>

      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}

      {/* ── WHAT IS THIS TOOL ── */}
      <div className="glass rounded-2xl p-6 sm:p-8 animate-fade-in-up space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Info size={18} className="text-indigo-400" />
          <h2 className="text-lg font-bold text-white">What is VidSnap?</h2>
        </div>
        <p className="text-gray-400 leading-relaxed text-sm">
          <strong className="text-white">VidSnap</strong> is a free, browser-based video tool that lets you save online videos for personal offline viewing. Whether you want to watch a tutorial on an airplane, keep a cooking video handy in the kitchen without burning data, or archive content before it disappears — VidSnap makes it simple and instant.
        </p>
        <p className="text-gray-400 leading-relaxed text-sm">
          Unlike other tools, VidSnap never asks you to install software, create an account, or hand over your personal information. Everything happens directly in your browser — paste a link, choose your quality, and your video downloads in seconds.
        </p>
        <p className="text-gray-400 leading-relaxed text-sm">
          VidSnap supports hundreds of video platforms and resolutions up to <strong className="text-white">4K Ultra HD</strong>. Audio-only extraction in M4A format is also available — perfect for saving music or podcast content.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {[
            { icon: '🎥', stat: '1000+', label: 'Platforms' },
            { icon: '⚡', stat: 'Instant', label: 'Processing' },
            { icon: '🔒', stat: 'Zero', label: 'Data Stored' },
            { icon: '✅', stat: 'No', label: 'Login Needed' },
          ].map(({ icon, stat, label }) => (
            <div key={label} className="text-center p-3 rounded-xl bg-white/3 border border-white/5">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="font-black text-white text-sm">{stat}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="glass rounded-2xl p-6 sm:p-8 animate-fade-in-up space-y-5">
        <h2 className="text-center font-bold text-white text-lg">How It Works — 3 Simple Steps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              step: '1', icon: '🔗', title: 'Paste Your Link',
              desc: 'Copy the video link from any platform (YouTube, Instagram, Facebook, TikTok, etc.) and paste it into the input above.'
            },
            {
              step: '2', icon: '⚙️', title: 'Choose Your Quality',
              desc: 'VidSnap fetches available quality options. Pick anything from 240p up to crystal-clear 4K Ultra HD — or go audio-only.'
            },
            {
              step: '3', icon: '⬇️', title: 'Download Instantly',
              desc: 'Click Download. Our servers process the stream and your file downloads directly to your device. No sign-up, no waiting.'
            },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="text-center p-5 rounded-xl bg-white/3 border border-white/5 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">
                {step}
              </div>
              <div className="text-3xl mb-3 mt-2">{icon}</div>
              <div className="font-bold text-white text-sm mb-2">{title}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/20 text-center">
          <p className="text-xs text-indigo-300 leading-relaxed">
            💡 <strong>Tip:</strong> For the best quality, always select the highest available resolution. For faster downloads or smaller files, choose 720p or 480p.
          </p>
        </div>
      </div>

      {/* ── SUPPORTED PLATFORMS ── */}
      <div className="glass rounded-2xl p-6 animate-fade-in-up text-center">
        <h2 className="font-bold text-white text-lg mb-4">Supported Platforms</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {['YouTube', 'Instagram', 'Facebook', 'TikTok', 'Twitter / X', 'LinkedIn', 'Dailymotion', 'Vimeo', 'Reddit', 'Pinterest', 'Twitch', '1000+ more'].map(platform => (
            <span key={platform} className="px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300 bg-white/5 border border-white/8">
              {platform}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          VidSnap works with publicly accessible videos. Private or restricted content cannot be downloaded.
        </p>
      </div>

      {/* ── FAQ ── */}
      <div className="glass rounded-2xl p-6 sm:p-8 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle size={18} className="text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-white/5">
          {faqs.map(({ q, a }, i) => (
            <FAQItem key={i} q={q} a={a} />
          ))}
        </div>
      </div>

      {/* Bottom Ad */}
      <AdBanner size="banner" />
    </main>
  );
}

// ========================
//  ROOT APP WITH ROUTING
// ========================

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
