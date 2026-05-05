import { forwardRef } from 'react';
import { FileText } from 'lucide-react';

interface Props {
  renderedHtml: string;
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div
      className="flex items-center justify-center rounded-2xl mb-5"
      style={{ width: 64, height: 64, background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <FileText size={28} color="#52525b" />
    </div>
    <h3 className="text-base font-medium mb-2" style={{ color: '#a1a1aa' }}>
      格式化后的 Markdown 会显示在这里
    </h3>
    <p className="text-sm" style={{ color: '#52525b' }}>
      粘贴 Markdown 或上传 .md 文件，进入专注阅读视图。
    </p>
  </div>
);

const MarkdownPreview = forwardRef<HTMLDivElement, Props>(({ renderedHtml }, ref) => {
  return (
    <section className="preview-section px-6 pb-8">
      <div
        className="mx-auto rounded-2xl overflow-hidden"
        style={{
          maxWidth: 1200,
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.06)',
          minHeight: 420,
        }}
      >
        {renderedHtml ? (
          <div className="p-6 sm:p-10">
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
