import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import type StateCore from 'markdown-it/lib/rules_core/state_core.mjs';

const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: false,
  highlight(str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
        return `<pre class="hljs"><code class="language-${lang}">${highlighted}</code></pre>`;
      } catch (_) { /* fall through */ }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

// Task list support
md.core.ruler.after('inline', 'task-lists', (state: StateCore) => {
  const tokens = state.tokens;
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'inline') {
      const content = tokens[i].content;
      if (/^\[[ xX]\]\s/.test(content)) {
        const checked = /^\[[xX]\]/.test(content);
        tokens[i].content = content.replace(/^\[[ xX]\]\s/, '');
        tokens[i].children = md.utils.arrayReplaceAt(
          tokens[i].children!,
          0,
          [
            Object.assign(new state.Token('html_inline', '', 0), {
              content: `<input type="checkbox" ${checked ? 'checked' : ''} disabled /> `,
            }),
          ]
        );
      }
    }
  }
});

export function renderMarkdown(content: string): string {
  if (!content.trim()) return '';
  const rawHtml = md.render(content);

  const clean = DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['input'],
    ADD_ATTR: ['checked', 'disabled', 'type'],
  });

  const container = document.createElement('div');
  container.innerHTML = clean;
  container.querySelectorAll('a').forEach((a) => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });

  return container.innerHTML;
}

export function getRawHtml(content: string): string {
  return renderMarkdown(content);
}
