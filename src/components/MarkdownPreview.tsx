import { forwardRef } from 'react';
import { FileText } from 'lucide-react';

interface Props {
  renderedHtml: string;
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: 420, padding: '80px 24px' }}>
    <div
      className="flex items-center justify-center rounded-2xl mb-6"
      style={{
        width: 72,
        height: 72,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}
    >
      <FileText size={30} color="#52525b" />
    </div>
    <h3 className="text-base font-medium mb-2" style={{ color: '#71717a' }}>
      格式化后的 Markdown 会显示在这里
    </h3>
    <p className="text-sm" style={{ color: '#3f3f46', maxWidth: 360 }}>
      粘贴 Markdown 或上传 .md 文件，进入专注阅读视图。
    </p>
  </div>
);

const MarkdownPreview = forwardRef<HTMLDivElement, Props>(({ renderedHtml }, ref) => {
  return (
    <section className="preview-section">
      <div
        className="card anim-fade-up anim-delay-5"
        style={{ minHeight: renderedHtml ? 'auto' : 520, overflow: 'hidden' }}
      >
        {renderedHtml ? (
          <div style={{ padding: 'clamp(32px, 4vw, 56px) clamp(20px, 3vw, 32px) clamp(48px, 5vw, 72px)' }}>
            <div
              ref={ref}
              className="markdown-body mx-auto"
              style={{ maxWidth: 820 }}
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
});

MarkdownPreview.displayName = 'MarkdownPreview';

export default MarkdownPreview;
