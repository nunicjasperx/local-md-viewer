import { Copy, FileText, FileCode, FileDown, Printer } from 'lucide-react';
import { downloadMarkdown, downloadHtml, downloadWord, exportPdf, printDocument } from '../utils/export';

interface Props {
  markdown: string;
  renderedHtml: string;
  filename: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
  onToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function ExportToolbar({ markdown, renderedHtml, filename, previewRef, onToast }: Props) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      onToast('已复制到剪贴板');
    } catch {
      onToast('复制失败', 'error');
    }
  };

  const handleMd = () => {
    downloadMarkdown(markdown, filename);
    onToast('已下载 Markdown');
  };

  const handleHtml = () => {
    downloadHtml(renderedHtml, filename);
    onToast('已导出 HTML');
  };

  const handleWord = async () => {
    try {
      await downloadWord(renderedHtml, filename);
      onToast('已导出 Word');
    } catch {
      onToast('Word 导出失败', 'error');
    }
  };

  const handlePdf = async () => {
    if (!previewRef.current) return;
    try {
      await exportPdf(previewRef.current, filename);
      onToast('已导出 PDF');
    } catch {
      onToast('PDF 导出失败，尝试使用打印功能', 'error');
      printDocument();
    }
  };

  const handlePrint = () => {
    printDocument();
  };

  const btnStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    color: '#d4d4d8',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  const buttons = [
    { label: '复制', icon: Copy, action: handleCopy },
    { label: 'MD', icon: FileText, action: handleMd },
    { label: 'HTML', icon: FileCode, action: handleHtml },
    { label: 'Word', icon: FileDown, action: handleWord },
    { label: 'PDF', icon: FileDown, action: handlePdf },
    { label: '打印', icon: Printer, action: handlePrint },
  ];

  return (
    <section className="toolbar-section px-6 pb-4 no-print">
      <div
        className="mx-auto rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ maxWidth: 1200, background: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div>
          <h2 className="text-white font-semibold text-base">格式化文档</h2>
          <p className="text-xs mt-0.5" style={{ color: '#71717a' }}>
            默认视图为阅读优化。如有需要，可在下方查看源 Markdown。
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {buttons.map(({ label, icon: Icon, action }) => (
            <button
              key={label}
              onClick={action}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-colors cursor-pointer"
              style={btnStyle}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
