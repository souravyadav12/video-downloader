import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Tag, ArrowLeft, ChevronRight, BookOpen } from 'lucide-react';
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

// Simple Markdown renderer without ReactMarkdown dependency
function SimpleMarkdown({ content }) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-bold text-white mt-6 mb-2">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-white mt-8 mb-3 border-b border-white/10 pb-2">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={i} className="text-base font-semibold text-indigo-300 mt-4 mb-2">
          {line.slice(5)}
        </h4>
      );
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} className="border-white/10 my-6" />);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      // Gather consecutive list items
      const listItems = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1.5 text-gray-400 pl-4 my-3">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
          ))}
        </ul>
      );
      continue;
    } else if (/^\d+\. /.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1.5 text-gray-400 pl-4 my-3">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
          ))}
        </ol>
      );
      continue;
    } else if (line.startsWith('```')) {
      // Code block
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="bg-black/40 rounded-xl p-4 overflow-x-auto text-sm text-gray-300 border border-white/10 my-4">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    } else if (line.startsWith('| ')) {
      // Table
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim());
      const rows = tableLines.slice(2).map(row => row.split('|').filter(c => c.trim()).map(c => c.trim()));
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                {headers.map((h, idx) => (
                  <th key={idx} className="text-left py-2 px-3 text-gray-300 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-white/5 hover:bg-white/2">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2 px-3 text-gray-400">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.trim() !== '') {
      elements.push(
        <p key={i} className="text-gray-400 leading-relaxed my-3"
          dangerouslySetInnerHTML={{ __html: parseInline(line) }}
        />
      );
    }
    i++;
  }

  return <div>{elements}</div>;
}

function parseInline(text) {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-200">$1</strong>');
  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline code
  text = text.replace(/`(.+?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 text-sm font-mono">$1</code>');
  // Link
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  return text;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Back link */}
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors mb-8 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>

      {/* Top Ad */}
      <AdBanner size="leaderboard" className="mb-8" />

      {/* Article header */}
      <div className="glass rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-5">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${categoryColors[post.category] || 'text-gray-300 bg-white/5 border-white/10'}`}>
            {post.category}
          </span>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} read</span>
            <span>{post.date}</span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-gray-400 text-base leading-relaxed">{post.description}</p>
      </div>

      {/* Article Content */}
      <div className="glass rounded-2xl p-8 mb-8">
        <SimpleMarkdown content={post.content} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map(tag => (
          <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300 bg-white/5 border border-white/8">
            <Tag size={10} /> #{tag}
          </span>
        ))}
      </div>

      {/* Mid-article ad */}
      <AdBanner size="rectangle" className="mb-8" />

      {/* Related Articles */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-indigo-400" /> Related Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(p => (
            <Link
              key={p.id}
              to={`/blog/${p.slug}`}
              className="glass rounded-xl p-5 hover:scale-[1.02] transition-transform duration-200 group"
            >
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${categoryColors[p.category] || 'text-gray-300 bg-white/5 border-white/10'} mb-3 inline-block`}>
                {p.category}
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-2">
                {p.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1"><Clock size={10} /> {p.readTime}</span>
                <ChevronRight size={12} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
