export function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function capitalizeWords(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(' ');
}

export function truncate(s: string, max: number, suffix = '…'): string {
  if (max <= 0) return '';
  if (!s || s.length <= max) return s;
  return s.slice(0, Math.max(0, max - suffix.length)) + suffix;
}

export function isEmptyOrWhitespace(s?: string | null): boolean {
  return !s || s.trim().length === 0;
}

export function slugify(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

export function padLeft(s: string, length: number, char = ' '): string {
  if (s.length >= length) return s;
  return char.repeat(length - s.length) + s;
}
