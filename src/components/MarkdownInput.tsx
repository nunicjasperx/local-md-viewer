import { useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';
import { Upload, Sparkles, Trash2 } from 'lucide-react';
import { SAMPLE_MARKDOWN } from '../utils/sample';
import { countCharacters, countWords } from '../utils/stats';

interface Props {
  value: string;
  onChange: (value: string) => void;
  filename: string;
  onFilenameChange: (name: string) => void;
  onToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export default function MarkdownInput({ value, onChange, onFilenameChange, onToast }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chars = countCharacters(value);
  const words = countWords(value);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.match(/\.(md|markdown)$/i)) {
        onToast('仅支持 .md 或 .markdown 文件', 'error');
        return;
      }
      if (file.size > MAX_SIZE) {
        onToast('文件大小不能超过 2.0 MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onChange(content);
        onFilenameChange(file.name);
        onToast(`已加载 ${file.name}`);
      };
      reader.readAsText(file);
    },
    [onChange, onFilenameChange, onToast]
  );

  const handleUploadClick = () => fileRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent) => e.preventDefault();

  const handleSample = () => {
    onChange(SAMPLE_MARKDOWN);
    onFilenameChange('git-guide.md');
    onToast('已加载示例');
  };

  const handleClear = () => {
    onChange('');
    onFilenameChange('document.md');
    onToast('已清空');
  };

  return (
    <section className="input-section px-6 pb-8">
      <div
        className="mx-auto rounded-2xl p-6 sm:p-8"
        style={{ maxWidth: 1200, background: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-white font-semibold text-lg">在本地打开 Markdown</h2>
            <p className="text-sm mt-1" style={{ color: '#71717a' }}>
              粘贴 Markdown、上传 .md 文件，或试用示例。渲染会在浏览器中完成，不会发送到任何 API。
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <input ref={fileRef} type="file" accept=".md,.markdown" className="hidden" onChange={handleFileChange} />
            <button
              onClick={handleUploadClick}
              className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#d4d4d8', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            >
              <Upload size={15} /> 上传 .md
            </button>
            <button
              onClick={handleSample}
              className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#d4d4d8', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            >
              <Sparkles size={15} /> 试用示例
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#d4d4d8', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            >
              <Trash2 size={15} /> 清空
            </button>
          </div>
        </div>

        {/* Textarea */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="relative rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="# 在这里粘贴 Markdown..."
            spellCheck={false}
            className="w-full resize-none font-mono text-sm leading-relaxed outline-none"
            style={{
              height: 280,
              background: '#0f0f0f',
              color: '#d4d4d8',
              padding: '1rem 1.25rem',
              caretColor: '#f5f5f5',
            }}
          />
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-xs" style={{ color: '#52525b' }}>
          <span>{chars} 字符</span>
          <span>{words} 词</span>
          <span>最大 2.0 MB</span>
          <span className="hidden sm:inline" style={{ color: '#3f3f46' }}>|</span>
          <span>无需上传或渲染 API</span>
        </div>
      </div>
    </section>
  );
}
