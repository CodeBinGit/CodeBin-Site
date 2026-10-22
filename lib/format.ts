import { format, formatDistanceToNowStrict } from 'date-fns';

// Supabase returns `timestamp without time zone` values stored in UTC.
export function parseDbDate(value: string): Date {
  return new Date(/([zZ]|[+-]\d\d:?\d\d)$/.test(value) ? value : `${value}Z`);
}

export function timeAgo(value: string): string {
  return formatDistanceToNowStrict(parseDbDate(value), { addSuffix: true });
}

export function fullDate(value: string): string {
  return format(parseDbDate(value), "d MMM yyyy 'at' HH:mm 'UTC'");
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function pasteIdFromSegments(segments: string[]) {
  return segments
    .map(s => {
      try {
        return decodeURIComponent(s);
      } catch {
        return s;
      }
    })
    .join('/');
}
