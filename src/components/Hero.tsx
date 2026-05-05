export default function Hero() {
  return (
    <section className="hero-section px-6" style={{ paddingTop: 86, paddingBottom: 72 }}>
      <div className="app-container" style={{ textAlign: 'left' }}>
        {/* Tag */}
        <div className="mb-5 anim-fade-up">
          <span
            className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3.5 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              color: '#71717a',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Markdown 查看器和格式导出
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-bold text-white anim-fade-up anim-delay-1"
          style={{
            maxWidth: 1120,
            fontSize: 'clamp(46px, 6.2vw, 86px)',
            lineHeight: 0.98,
            letterSpacing: '-0.065em',
            fontWeight: 850,
          }}
        >
          将 Markdown 作为格式化文档查看
        </h1>

        {/* Subtitle */}
        <p
          className="anim-fade-up anim-delay-2"
          style={{
            display: 'block',
            maxWidth: 780,
            marginTop: 24,
            color: 'rgba(255,255,255,0.58)',
            fontSize: 'clamp(17px, 1.35vw, 22px)',
            lineHeight: 1.65,
            letterSpacing: '-0.01em',
            textAlign: 'left',
          }}
        >
          粘贴 Markdown 或上传 .md 文件。全宽阅读，导出 HTML、PDF 或 Word。所有操作都在浏览器本地完成。
        </p>
      </div>
    </section>
  );
}
