import { useState, useRef, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarkdownInput from './components/MarkdownInput';
import ExportToolbar from './components/ExportToolbar';
import MarkdownPreview from './components/MarkdownPreview';
import SourcePanel from './components/SourcePanel';
import Toast from './components/Toast';
import FullscreenReader from './components/FullscreenReader';
import { useToast } from './hooks/useToast';
import { renderMarkdown } from './utils/markdown';

export default function App() {
  const [markdown, setMarkdown] = useState('');
  const [filename, setFilename] = useState('document.md');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toasts, addToast, removeToast } = useToast();

  const renderedHtml = useMemo(() => renderMarkdown(markdown), [markdown]);

  const handleFullscreenOpen = useCallback(() => setIsFullscreen(true), []);
  const handleFullscreenClose = useCallback(() => setIsFullscreen(false), []);

  const handleFullscreenCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      addToast('已复制到剪贴板');
    } catch {
      addToast('复制失败', 'error');
    }
  }, [markdown, addToast]);

  return (
    <>
      <div className="min-h-screen" style={{ background: 'transparent' }}>
        <Navbar />

        <main className="app-container app-stack" style={{ paddingTop: 0, paddingBottom: 64 }}>
          <Hero />
          <MarkdownInput
            value={markdown}
            onChange={setMarkdown}
            onFilenameChange={setFilename}
            onToast={addToast}
          />
          <ExportToolbar
            markdown={markdown}
            renderedHtml={renderedHtml}
            filename={filename}
            previewRef={previewRef}
            onToast={addToast}
            onFullscreen={handleFullscreenOpen}
          />
          <MarkdownPreview ref={previewRef} renderedHtml={renderedHtml} />
          <SourcePanel markdown={markdown} onToast={addToast} />
        </main>

        <footer className="text-center py-8 px-6" style={{ color: '#27272a', fontSize: '0.7rem' }}>
          <p>Local MD — 所有操作均在浏览器本地完成，不上传任何内容。</p>
        </footer>
      </div>

      <FullscreenReader
        open={isFullscreen}
        html={renderedHtml}
        markdown={markdown}
        filename={filename}
        onClose={handleFullscreenClose}
        onCopy={handleFullscreenCopy}
        onToast={addToast}
      />

      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  );
}
