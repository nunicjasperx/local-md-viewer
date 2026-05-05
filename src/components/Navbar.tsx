import { FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(10, 10, 10, 0.72)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="app-container flex items-center justify-between" style={{ height: 72 }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 34,
              height: 34,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <FileText size={16} color="#e4e4e7" />
          </div>
          <span className="text-white font-semibold tracking-tight" style={{ fontSize: '1.05rem' }}>
            Local MD
          </span>
          <span
            className="text-xs font-mono rounded-full px-2 py-0.5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#71717a',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
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
              style={{ color: '#71717a', transition: 'color 160ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#d4d4d8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#71717a'; }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
