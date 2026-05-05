import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';

interface Props {
  markdown: string;
  onToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function SourcePanel({ markdown, onToast }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      onToast('已复制源码');
    } catch {
      onToast('复制失败', 'error');
    }
  };

  if (!markdown) return null;

  return (
    <section className="source-section px-6 pb-12 no-print">
      <div
        className="mx-auto rounded-2xl overflow-hidden"
        style={{ maxWidth: 1200, background: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Toggle header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-5 sm:px-6 py-4 transition-colors cursor-pointer"
          style={{ color: '#a1a1aa' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <span className="text-sm font-medium flex items-center gap-2">
            查看源 Markdown
            <span className="text-xs font-mono" style={{ color: '#52525b' }}>
              {markdown.length} 字符
            </span>
          </span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Content */}
        {expanded && (
          <div className="px-5 sm:px-6 pb-5">
            <div className="flex justify-end mb-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              >
                <Copy size={12} /> 复制源码
              </button>
            </div>
            <pre
              className="rounded-xl overflow-auto font-mono text-sm leading-relaxed"
              style={{
                background: '#0f0f0f',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '1rem 1.25rem',
                color: '#a1a1aa',
                maxHeight: 500,
              }}
            >
              <code>{markdown}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
