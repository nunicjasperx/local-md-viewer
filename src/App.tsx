import { useState, useRef, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarkdownInput from './components/MarkdownInput';
import ExportToolbar from './components/ExportToolbar';
import MarkdownPreview from './components/MarkdownPreview';
import SourcePanel from './components/SourcePanel';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';
import { renderMarkdown } from './utils/markdown';

export default function App() {
  const [markdown, setMarkdown] = useState('');
  const [filename, setFilename] = useState('document.md');
  const previewRef = useRef<HTMLDivElement>(null);
  const { toasts, addToast, removeToast } = useToast();

  const renderedHtml = useMemo(() => renderMarkdown(markdown), [markdown]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <Hero />
      <MarkdownInput
        value={markdown}
        onChange={setMarkdown}
        filename={filename}
        onFilenameChange={setFilename}
        onToast={addToast}
      />
      <ExportToolbar
        markdown={markdown}
        renderedHtml={renderedHtml}
        filename={filename}
        previewRef={previewRef}
        onToast={addToast}
      />
      <MarkdownPreview ref={previewRef} renderedHtml={renderedHtml} />
      <SourcePanel markdown={markdown} onToast={addToast} />
      <Toast toasts={toasts} onRemove={removeToast} />

      <footer className="text-center py-8 px-6" style={{ color: '#3f3f46', fontSize: '0.75rem' }}>
        <p>Local MD — 所有操作均在浏览器本地完成，不上传任何内容。</p>
      </footer>
    </div>
  );
}
