function getBaseFilename(filename: string): string {
  return filename.replace(/\.(md|markdown)$/i, '') || 'document';
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadMarkdown(content: string, filename: string): void {
  const name = getBaseFilename(filename) + '.md';
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  triggerDownload(blob, name);
}

export function downloadHtml(renderedHtml: string, filename: string): void {
  const name = getBaseFilename(filename) + '.html';
  const fullHtml = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getBaseFilename(filename)}</title>
  <style>
    :root {
      --bg: #0b0b0b;
      --panel: #111111;
      --code-bg: #2b2b2b;
      --border: rgba(255,255,255,0.08);
      --border-strong: rgba(255,255,255,0.14);
      --text: #f5f5f5;
      --muted: #a1a1aa;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      line-height: 1.75;
      padding: 3rem 1.5rem;
      max-width: 820px;
      margin: 0 auto;
    }
    code, pre { font-family: "JetBrains Mono", "Fira Code", SFMono-Regular, Consolas, monospace; }
    h1 { font-size: 2.25rem; font-weight: 700; color: #fff; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--border-strong); }
    h2 { font-size: 1.625rem; font-weight: 600; color: #fff; margin-top: 2.5rem; margin-bottom: 0.75rem; padding-bottom: 0.375rem; border-bottom: 1px solid var(--border); }
    h3 { font-size: 1.3rem; font-weight: 600; color: #f0f0f0; margin-top: 2rem; margin-bottom: 0.5rem; }
    h4 { font-size: 1.1rem; font-weight: 600; color: #e5e5e5; margin-top: 1.5rem; margin-bottom: 0.5rem; }
    h5, h6 { font-size: 1rem; font-weight: 600; color: #d4d4d4; margin-top: 1.25rem; margin-bottom: 0.5rem; }
    p { margin-bottom: 1rem; color: #d4d4d8; }
    a { color: #60a5fa; text-decoration: none; }
    a:hover { text-decoration: underline; }
    strong { font-weight: 600; color: #f5f5f5; }
    em { font-style: italic; }
    del { color: #71717a; text-decoration: line-through; }
    ul, ol { margin-bottom: 1rem; padding-left: 1.75rem; }
    ul { list-style: disc; }
    ol { list-style: decimal; }
    li { margin-bottom: 0.375rem; color: #d4d4d8; }
    blockquote { border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin-bottom: 1rem; background: rgba(59,130,246,0.06); border-radius: 0 8px 8px 0; color: #a1a1aa; }
    blockquote p:last-child { margin-bottom: 0; }
    code { background: var(--code-bg); padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.875em; color: #e879f9; }
    pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; overflow-x: auto; }
    pre code { background: transparent; padding: 0; border-radius: 0; font-size: 0.875rem; line-height: 1.7; color: #d4d4d8; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 1.25rem; border: 1px solid var(--border-strong); border-radius: 8px; overflow: hidden; }
    thead { background: #1f1f1f; }
    th { padding: 0.625rem 0.875rem; text-align: left; font-weight: 600; color: #f5f5f5; border-bottom: 2px solid var(--border-strong); font-size: 0.875rem; }
    td { padding: 0.625rem 0.875rem; border-bottom: 1px solid var(--border); color: #d4d4d8; font-size: 0.875rem; }
    tr:last-child td { border-bottom: none; }
    hr { border: none; height: 1px; background: var(--border-strong); margin: 2rem 0; }
    img { max-width: 100%; border-radius: 8px; }
    .hljs { color: #d4d4d8; }
    .hljs-keyword { color: #c084fc; }
    .hljs-string { color: #86efac; }
    .hljs-number { color: #fbbf24; }
    .hljs-comment { color: #6b7280; font-style: italic; }
    .hljs-function, .hljs-title { color: #60a5fa; }
    .hljs-built_in, .hljs-literal { color: #f472b6; }
    .hljs-attr, .hljs-type { color: #fbbf24; }
    .hljs-meta { color: #a78bfa; }
    .hljs-selector-tag { color: #f472b6; }
    .hljs-selector-class { color: #86efac; }
    .hljs-addition { color: #86efac; background: rgba(34,197,94,0.1); }
    .hljs-deletion { color: #f87171; background: rgba(239,68,68,0.1); }
    input[type="checkbox"] { appearance: none; width: 16px; height: 16px; border: 2px solid var(--border-strong); border-radius: 4px; background: #1f1f1f; vertical-align: middle; margin-right: 0.25rem; }
    input[type="checkbox"]:checked { background: #22c55e; border-color: #22c55e; }
  </style>
</head>
<body>
${renderedHtml}
</body>
</html>`;
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  triggerDownload(blob, name);
}

export async function downloadWord(renderedHtml: string, filename: string): Promise<void> {
  const name = getBaseFilename(filename) + '.doc';
  const title = getBaseFilename(filename);
  const wordHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="UTF-8">
<meta name="ProgId" content="Word.Document">
<meta name="Generator" content="Microsoft Word 15">
<!--[if gte mso 9]><xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml><![endif]-->
<title>${title}</title>
<style>
p { margin: 0 0 8pt 0; }
h1 { font-size: 24pt; font-weight: bold; margin: 0 0 12pt 0; border-bottom: 2pt solid #ddd; padding-bottom: 6pt; }
h2 { font-size: 18pt; font-weight: bold; margin: 18pt 0 8pt 0; border-bottom: 1pt solid #eee; padding-bottom: 4pt; }
h3 { font-size: 14pt; font-weight: bold; margin: 14pt 0 6pt 0; }
h4, h5, h6 { font-size: 12pt; font-weight: bold; margin: 12pt 0 4pt 0; }
ul, ol { margin: 0 0 8pt 0; padding-left: 24pt; }
li { margin-bottom: 4pt; }
blockquote { border-left: 3pt solid #3b82f6; padding: 8pt 12pt; margin: 0 0 8pt 0; background: #f0f7ff; color: #555; }
pre { background: #f3f4f6; border: 1pt solid #ddd; padding: 8pt 12pt; margin: 0 0 10pt 0; font-family: Consolas, monospace; font-size: 10pt; }
code { background: #f3f4f6; padding: 1pt 4pt; font-family: Consolas, monospace; font-size: 10pt; }
pre code { background: transparent; padding: 0; }
table { border-collapse: collapse; width: 100%; margin-bottom: 10pt; }
th, td { border: 1pt solid #ddd; padding: 6pt 8pt; text-align: left; }
th { background: #f3f4f6; font-weight: bold; }
hr { border: none; height: 1pt; background: #ddd; margin: 16pt 0; }
img { max-width: 100%; }
a { color: #2563eb; }
</style>
</head>
<body>
${renderedHtml}
</body>
</html>`;

  const boundary = '----=_NextPart_' + Math.random().toString(36).slice(2);
  const mhtml = `MIME-Version: 1.0
Content-Type: multipart/related; boundary="${boundary}"

--${boundary}
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: quoted-printable
Content-Location: file:///./${encodeURIComponent(name)}

${wordHtml}

--${boundary}--`;

  const blob = new Blob([mhtml], { type: 'application/msword' });
  triggerDownload(blob, name);
}

export async function exportPdf(element: HTMLElement, filename: string): Promise<void> {
  const name = getBaseFilename(filename) + '.pdf';

  // Use html2pdf.js
  const html2pdf = (await import('html2pdf.js')).default;
  const opt = {
    margin: [15, 15, 15, 15] as [number, number, number, number],
    filename: name,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0b0b0b' },
    jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  // Clone the element and apply print-friendly styles
  const cloned = element.cloneNode(true) as HTMLElement;
  cloned.style.background = '#0b0b0b';
  cloned.style.padding = '20px';
  cloned.style.maxWidth = '820px';
  cloned.style.color = '#f5f5f5';

  await html2pdf().set(opt).from(cloned).save();
}

export function printDocument(): void {
  window.print();
}
