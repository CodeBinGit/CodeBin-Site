import 'server-only';
import { type Highlighter, bundledLanguages, createHighlighter } from 'shiki';

import { normalizeLanguage } from './languages';

export const CODE_THEME = 'github-dark-default';
// Very large pastes are shown without highlighting to keep pages fast.
const MAX_HIGHLIGHT_CHARS = 200_000;

let highlighter: Promise<Highlighter> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighter({ themes: [CODE_THEME], langs: [] });
  return highlighter;
}

export async function highlight(code: string, language: string | null) {
  const hl = await getHighlighter();
  let lang = normalizeLanguage(language);

  if (code.length > MAX_HIGHLIGHT_CHARS || !(lang in bundledLanguages)) {
    lang = 'text';
  } else if (!hl.getLoadedLanguages().includes(lang)) {
    await hl.loadLanguage(lang as keyof typeof bundledLanguages);
  }

  return hl.codeToHtml(code, { lang, theme: CODE_THEME });
}
