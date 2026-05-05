import { useRef, useCallback, useState, type DragEvent, type ChangeEvent } from 'react';
import { Upload, Sparkles, Trash2 } from 'lucide-react';
import { SAMPLE_MARKDOWN } from '../utils/sample';
import { countCharacters, countWords } from '../utils/stats';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onFilenameChange: (name: string) => void;
  onToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const MAX_SIZE = 2 * 1024 * 1024;

export default function MarkdownInput({ value, onChange, onFilenameChange, onToast }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

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
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

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
    <section className="input-section no-print">
      <div
        className="card anim-fade-up anim-delay-3"
        style={{ padding: 'clamp(18px, 3vw, 28px)' }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-white font-semibold" style={{ fontSize: '1.05rem' }}>
              在本地打开 Markdown
            </h2>
            <p className="text-xs mt-1" style={{ color: '#52525b' }}>
              粘贴 Markdown、上传 .md 文件，或试用示例。渲染会在浏览器中完成，不会发送到任何 API。
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <input ref={fileRef} type="file" accept=".md,.markdown" className="hidden" onChange={handleFileChange} />
            <button onClick={handleUploadClick} className="btn">
              <Upload size={14} /> 上传 .md
            </button>
            <button onClick={handleSample} className="btn">
              <Sparkles size={14} /> 试用示例
            </button>
            <button onClick={handleClear} className="btn" disabled={!value}>
              <Trash2 size={14} /> 清空
            </button>
          </div>
        </div>

        {/* Textarea */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`textarea-wrap relative rounded-xl overflow-hidden transition-all ${dragging ? 'drag-highlight' : ''}`}
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'border-color 180ms ease, box-shadow 180ms ease',
          }}
        >
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="# 在这里粘贴 Markdown..."
            spellCheck={false}
            className="w-full resize-none font-mono text-sm leading-relaxed outline-none"
            style={{
              height: 'clamp(220px, 30vw, 280px)',
              background: '#0c0c0c',
              color: '#d4d4d8',
              padding: '16px 20px',
              caretColor: '#f5f5f5',
            }}
          />
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1 mt-3 text-xs" style={{ color: '#3f3f46' }}>
          <div className="flex items-center gap-x-4">
            <span>{chars} 字符</span>
            <span>{words} 词</span>
            <span>最大 2.0 MB</span>
          </div>
          <span>无需上传或渲染 API</span>
        </div>
      </div>
    </section>
  );
}
