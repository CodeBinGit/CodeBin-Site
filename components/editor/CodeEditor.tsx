'use client';

import { useEffect, useState } from 'react';

import {
  LanguageDescription,
  type LanguageSupport
} from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { githubDarkInit } from '@uiw/codemirror-theme-github';
import CodeMirror, { EditorView, type Extension } from '@uiw/react-codemirror';

import { getLanguage } from '@/lib/languages';

const theme = githubDarkInit({
  settings: {
    background: 'transparent',
    gutterBackground: 'transparent',
    lineHighlight: 'rgba(255,255,255,0.03)',
    selection: 'rgba(154,107,245,0.35)',
    selectionMatch: 'rgba(154,107,245,0.18)',
    caret: '#b794f6',
    fontFamily: 'var(--font-jetbrains), monospace'
  }
});

const baseExtensions: Extension[] = [EditorView.lineWrapping];

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onSubmit?: () => void;
}

export default function CodeEditor({
  value,
  onChange,
  language,
  onSubmit
}: Props) {
  const [support, setSupport] = useState<LanguageSupport | null>(null);

  useEffect(() => {
    let cancelled = false;
    const name = getLanguage(language).cm;
    const desc = name
      ? LanguageDescription.matchLanguageName(languages, name, false)
      : null;
    if (!desc) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clears the previous language
      setSupport(null);
      return;
    }
    desc.load().then(s => !cancelled && setSupport(s));
    return () => {
      cancelled = true;
    };
  }, [language]);

  return (
    <CodeMirror
      className="code-editor"
      value={value}
      onChange={onChange}
      theme={theme}
      extensions={support ? [...baseExtensions, support] : baseExtensions}
      minHeight="420px"
      maxHeight="70vh"
      placeholder="Paste or type your code here…"
      autoFocus
      basicSetup={{ highlightActiveLine: true, foldGutter: true, tabSize: 2 }}
      onKeyDown={e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onSubmit) {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
  );
}
