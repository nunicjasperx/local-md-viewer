import { Copy, FileText, FileCode, FileDown, Printer, Maximize2 } from 'lucide-react';
import { downloadMarkdown, downloadHtml, downloadWord, exportPdf, printDocument } from '../utils/export';

interface Props {
  markdown: string;
  renderedHtml: string;
  filename: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
  onToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onFullscreen: () => void;
}

export default function ExportToolbar({ markdown, renderedHtml, filename, previewRef, onToast, onFullscreen }: Props) {
  const hasContent = markdown.trim().length > 0;

  const guard = (fn: () => void) => {
    if (!hasContent) {
      onToast('请先输入或上传 Markdown', 'info');
      return;
    }
    fn();
  };

  const handleCopy = async () => {
    guard(async () => {
      try {
        await navigator.clipboard.writeText(markdown);
        onToast('已复制到剪贴板');
      } catch {
        onToast('复制失败', 'error');
      }
    });
  };

  const handleMd = () => guard(() => {
    downloadMarkdown(markdown, filename);
    onToast('已下载 Markdown');
  });

  const handleHtml = () => guard(() => {
    downloadHtml(renderedHtml, filename);
    onToast('已导出 HTML');
  });

  const handleWord = () => guard(async () => {
    try {
      await downloadWord(renderedHtml, filename);
      onToast('已导出 Word');
    } catch {
      onToast('Word 导出失败', 'error');
    }
  });

  const handlePdf = () => guard(async () => {
    if (!previewRef.current) return;
    try {
      await exportPdf(previewRef.current, filename);
      onToast('已导出 PDF');
    } catch {
      onToast('PDF 导出失败，尝试使用打印功能', 'error');
      printDocument();
    }
  });

  const handlePrint = () => guard(() => {
    printDocument();
  });

  const handleFullscreen = () => guard(() => {
    onFullscreen();
  });

  const buttons = [
    { label: '复制', icon: Copy, action: handleCopy },
    { label: 'MD', icon: FileText, action: handleMd },
    { label: 'HTML', icon: FileCode, action: handleHtml },
    { label: 'Word', icon: FileDown, action: handleWord },
    { label: 'PDF', icon: FileDown, action: handlePdf },
    { label: '全屏', icon: Maximize2, action: handleFullscreen, primary: true },
    { label: '打印', icon: Printer, action: handlePrint },
  ];

  return (
    <section className="toolbar-section no-print">
      <div
        className="card anim-fade-up anim-delay-4"
        style={{ padding: 'clamp(16px, 2.5vw, 24px)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-white font-semibold" style={{ fontSize: '1rem' }}>格式化文档</h2>
            <p className="text-xs mt-0.5" style={{ color: '#52525b' }}>
              默认视图为阅读优化。如有需要，可在下方查看源 Markdown。
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {buttons.map(({ label, icon: Icon, action, primary }) => (
              <button
                key={label}
                onClick={action}
                className={`btn ${primary ? 'btn-primary' : ''}`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
