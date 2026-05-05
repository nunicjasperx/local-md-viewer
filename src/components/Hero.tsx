export default function Hero() {
  return (
    <section className="hero-section px-6" style={{ paddingTop: 64, paddingBottom: 40 }}>
      <div className="app-container">
        {/* Tag */}
        <div className="flex justify-center mb-5 anim-fade-up">
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
          className="text-center font-bold text-white anim-fade-up anim-delay-1"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 0.98,
            letterSpacing: '-0.05em',
          }}
        >
          将 Markdown 作为格式化文档查看
        </h1>

        {/* Subtitle */}
        <p
          className="text-center mt-6 mx-auto anim-fade-up anim-delay-2"
          style={{
            maxWidth: 680,
            color: '#52525b',
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            lineHeight: 1.7,
          }}
        >
          粘贴 Markdown 或上传 .md 文件。全宽阅读，导出 HTML、PDF 或 Word。所有操作都在浏览器本地完成。
        </p>
      </div>
    </section>
  );
}
