import { FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: 'rgba(15, 15, 15, 0.85)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1200, height: 72, padding: '0 1.5rem' }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}>
            <FileText size={18} color="#f5f5f5" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">Local MD</span>
          <span
            className="text-xs font-mono rounded-full px-2 py-0.5"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            MD
          </span>
        </div>

        {/* Right links */}
        <div className="hidden sm:flex items-center gap-6">
          {['工具', '关于', '中文'].map((item) => (
            <span
              key={item}
              className="text-sm cursor-default transition-colors"
              style={{ color: '#a1a1aa' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#a1a1aa')}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
