export interface Language {
  /** Shiki language id, also the value stored in the database. */
  id: string;
  label: string;
  /** Name understood by @codemirror/language-data. */
  cm?: string;
  ext: string;
}

export const LANGUAGES: Language[] = [
  { id: 'text', label: 'Plain text', ext: 'txt' },
  { id: 'razor', label: 'ASP.NET Razor', cm: 'HTML', ext: 'cshtml' },
  { id: 'bash', label: 'Bash / Shell', cm: 'Shell', ext: 'sh' },
  { id: 'c', label: 'C', cm: 'C', ext: 'c' },
  { id: 'csharp', label: 'C#', cm: 'C#', ext: 'cs' },
  { id: 'cpp', label: 'C++', cm: 'C++', ext: 'cpp' },
  { id: 'cobol', label: 'COBOL', cm: 'Cobol', ext: 'cob' },
  { id: 'coffee', label: 'CoffeeScript', cm: 'CoffeeScript', ext: 'coffee' },
  { id: 'css', label: 'CSS', cm: 'CSS', ext: 'css' },
  { id: 'dart', label: 'Dart', cm: 'Dart', ext: 'dart' },
  { id: 'diff', label: 'Diff', cm: 'Diff', ext: 'diff' },
  { id: 'docker', label: 'Dockerfile', cm: 'Dockerfile', ext: 'dockerfile' },
  { id: 'elixir', label: 'Elixir', ext: 'ex' },
  { id: 'go', label: 'Go', cm: 'Go', ext: 'go' },
  { id: 'graphql', label: 'GraphQL', ext: 'graphql' },
  { id: 'handlebars', label: 'Handlebars', cm: 'HTML', ext: 'hbs' },
  { id: 'haskell', label: 'Haskell', cm: 'Haskell', ext: 'hs' },
  { id: 'html', label: 'HTML', cm: 'HTML', ext: 'html' },
  { id: 'ini', label: 'INI', cm: 'Properties files', ext: 'ini' },
  { id: 'java', label: 'Java', cm: 'Java', ext: 'java' },
  { id: 'javascript', label: 'JavaScript', cm: 'JavaScript', ext: 'js' },
  { id: 'json', label: 'JSON', cm: 'JSON', ext: 'json' },
  { id: 'jsx', label: 'JSX', cm: 'JSX', ext: 'jsx' },
  { id: 'kotlin', label: 'Kotlin', cm: 'Kotlin', ext: 'kt' },
  { id: 'less', label: 'Less', cm: 'LESS', ext: 'less' },
  { id: 'lua', label: 'Lua', cm: 'Lua', ext: 'lua' },
  { id: 'makefile', label: 'Makefile', ext: 'mk' },
  { id: 'markdown', label: 'Markdown', cm: 'Markdown', ext: 'md' },
  { id: 'objective-c', label: 'Objective-C', cm: 'Objective-C', ext: 'm' },
  { id: 'ocaml', label: 'OCaml / Reason', cm: 'OCaml', ext: 'ml' },
  { id: 'perl', label: 'Perl', cm: 'Perl', ext: 'pl' },
  { id: 'php', label: 'PHP', cm: 'PHP', ext: 'php' },
  { id: 'powershell', label: 'PowerShell', cm: 'PowerShell', ext: 'ps1' },
  { id: 'python', label: 'Python', cm: 'Python', ext: 'py' },
  { id: 'r', label: 'R', cm: 'R', ext: 'r' },
  { id: 'ruby', label: 'Ruby', cm: 'Ruby', ext: 'rb' },
  { id: 'rust', label: 'Rust', cm: 'Rust', ext: 'rs' },
  { id: 'scala', label: 'Scala', cm: 'Scala', ext: 'scala' },
  { id: 'scss', label: 'SCSS', cm: 'SCSS', ext: 'scss' },
  { id: 'sql', label: 'SQL', cm: 'SQL', ext: 'sql' },
  { id: 'stylus', label: 'Stylus', cm: 'Stylus', ext: 'styl' },
  { id: 'svelte', label: 'Svelte', cm: 'HTML', ext: 'svelte' },
  { id: 'swift', label: 'Swift', cm: 'Swift', ext: 'swift' },
  { id: 'toml', label: 'TOML', cm: 'TOML', ext: 'toml' },
  { id: 'tsx', label: 'TSX', cm: 'TSX', ext: 'tsx' },
  { id: 'typescript', label: 'TypeScript', cm: 'TypeScript', ext: 'ts' },
  { id: 'vb', label: 'Visual Basic', cm: 'VB.NET', ext: 'vb' },
  { id: 'vue', label: 'Vue', cm: 'Vue', ext: 'vue' },
  { id: 'wasm', label: 'WebAssembly', cm: 'WebAssembly', ext: 'wat' },
  { id: 'xml', label: 'XML', cm: 'XML', ext: 'xml' },
  { id: 'yaml', label: 'YAML', cm: 'YAML', ext: 'yml' },
  { id: 'zig', label: 'Zig', ext: 'zig' }
];

const byId = new Map(LANGUAGES.map(l => [l.id, l]));

// Prism ids used by pastes created with the old site.
const LEGACY: Record<string, string> = {
  none: 'text',
  markup: 'html',
  clike: 'c',
  'css-extras': 'css',
  'js-extras': 'javascript',
  'visual-basic': 'vb',
  basic: 'vb',
  aspnet: 'razor',
  objectivec: 'objective-c',
  reason: 'ocaml',
  coffeescript: 'coffee',
  git: 'diff'
};

export function normalizeLanguage(value: string | null | undefined): string {
  const v = (value ?? '').trim().toLowerCase();
  if (byId.has(v)) return v;
  return LEGACY[v] ?? 'text';
}

export function getLanguage(value: string | null | undefined): Language {
  return byId.get(normalizeLanguage(value))!;
}
