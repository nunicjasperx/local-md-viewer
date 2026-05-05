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
    <section className="source-section no-print">
      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Toggle header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between cursor-pointer"
          style={{
            color: '#71717a',
            padding: 'clamp(14px, 2vw, 18px) clamp(18px, 2.5vw, 24px)',
            transition: 'background 160ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <span className="text-sm font-medium flex items-center gap-2">
            查看源 Markdown
            <span className="text-xs font-mono" style={{ color: '#3f3f46' }}>
              {markdown.length} 字符
            </span>
          </span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Collapsible content */}
        <div className="collapse-content" data-open={expanded ? 'true' : 'false'}>
          <div className="collapse-inner">
            <div style={{ padding: '0 clamp(18px, 2.5vw, 24px) clamp(18px, 2.5vw, 24px)' }}>
              <div className="flex justify-end mb-2">
                <button onClick={handleCopy} className="btn">
                  <Copy size={12} /> 复制源码
                </button>
              </div>
              <pre
                className="rounded-xl overflow-auto font-mono text-sm leading-relaxed"
                style={{
                  background: '#0c0c0c',
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: '16px 20px',
                  color: '#71717a',
                  maxHeight: 500,
                }}
              >
                <code>{markdown}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
