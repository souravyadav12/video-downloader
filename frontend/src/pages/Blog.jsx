import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ChevronRight, BookOpen, Rss } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { AdBanner } from '../components/AdBanner';

const categoryColors = {
  Guide: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  Tutorial: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
  Review: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  Education: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  Tips: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
  Privacy: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
};

export default function Blog() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 mb-4">
          <Rss size={12} className="text-indigo-400" /> Video Tips & Guides
        </div>
        <h1 className="text-4xl md:text-5xl font-black gradient-text mb-4">VidSnap Blog</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Expert guides on video downloading, social media tips, privacy, and everything you need to get the most out of online video.
        </p>
      </div>

      {/* Top Ad */}
      <AdBanner size="leaderboard" className="mb-8" />

      {/* Featured Post */}
      <Link
        to={`/blog/${featured.slug}`}
        className="block glass rounded-2xl overflow-hidden mb-10 hover:scale-[1.01] transition-transform duration-200 group"
      >
        <div className="md:flex">
          <div className="md:w-2/5 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 flex items-center justify-center p-12 min-h-[200px]">
            <BookOpen size={72} className="text-indigo-400 opacity-40 group-hover:opacity-60 transition-opacity" />
          </div>
          <div className="p-8 md:w-3/5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${categoryColors[featured.category] || 'text-gray-300 bg-white/5 border-white/10'}`}>
                {featured.category}
              </span>
              <span className="text-xs text-gray-500">Featured</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-indigo-300 transition-colors">{featured.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{featured.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime} read</span>
              <span>{featured.date}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Article Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {rest.map((post, i) => (
          <React.Fragment key={post.id}>
            <Link
              to={`/blog/${post.slug}`}
              className="glass rounded-xl p-6 flex flex-col hover:scale-[1.02] transition-transform duration-200 group"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${categoryColors[post.category] || 'text-gray-300 bg-white/5 border-white/10'}`}>
                  {post.category}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug flex-1">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{post.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <ChevronRight size={14} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            {/* Insert ad after 3rd article */}
            {i === 2 && (
              <div className="sm:col-span-2 lg:col-span-3">
                <AdBanner size="rectangle" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Tags Cloud */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Tag size={14} /> Popular Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {[...new Set(blogPosts.flatMap(p => p.tags))].map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300 bg-white/5 border border-white/8 hover:bg-indigo-500/20 hover:border-indigo-500/30 hover:text-indigo-300 cursor-pointer transition-all">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
