export default function Hero() {
  return (
    <section className="hero-section pt-16 pb-12 sm:pt-24 sm:pb-16 px-6">
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Tag */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3.5 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#a1a1aa',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Markdown 查看器和格式导出
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-center font-bold tracking-tight text-white leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
        >
          将 Markdown 作为格式化文档查看
        </h1>

        {/* Subtitle */}
        <p
          className="text-center mt-5 mx-auto leading-relaxed"
          style={{ maxWidth: 640, color: '#71717a', fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)' }}
        >
          粘贴 Markdown 或上传 .md 文件。全宽阅读，导出 HTML、PDF 或 Word。所有操作都在浏览器本地完成。
        </p>
      </div>
    </section>
  );
}
