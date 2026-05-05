import { useEffect, useRef } from 'react';
import { X, Copy, FileCode, FileDown, Printer, BookOpen } from 'lucide-react';
import { downloadHtml, exportPdf, printDocument } from '../utils/export';

interface Props {
  open: boolean;
  html: string;
  markdown: string;
  filename: string;
  onClose: () => void;
  onCopy: () => void;
  onToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function FullscreenReader({ open, html, filename, onClose, onCopy, onToast }: Props) {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleExportHtml = () => {
    downloadHtml(html, filename);
    onToast('已导出 HTML');
  };

  const handleExportPdf = async () => {
    if (!articleRef.current) return;
    try {
      await exportPdf(articleRef.current, filename);
      onToast('已导出 PDF');
    } catch {
      onToast('PDF 导出失败', 'error');
    }
  };

  const handlePrint = () => {
    printDocument();
  };

  const actionBtns = [
    { label: '复制', icon: Copy, action: onCopy },
    { label: 'HTML', icon: FileCode, action: handleExportHtml },
    { label: 'PDF', icon: FileDown, action: handleExportPdf },
    { label: '打印', icon: Printer, action: handlePrint },
  ];

  return (
    <div className="reader-fullscreen">
      {/* Toolbar */}
      <div className="reader-fullscreen-toolbar">
        <div className="reader-fullscreen-title">
          <BookOpen size={16} />
          专注阅读
        </div>
        <div className="reader-fullscreen-actions">
          {actionBtns.map(({ label, icon: Icon, action }) => (
            <button key={label} onClick={action} className="btn">
              <Icon size={14} /> {label}
            </button>
          ))}
          <button
            onClick={onClose}
            className="btn"
            style={{ marginLeft: 4, color: '#a1a1aa' }}
          >
            <X size={14} /> 退出
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="reader-fullscreen-scroll">
        <div
          ref={articleRef}
          className="markdown-body fullscreen-markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
