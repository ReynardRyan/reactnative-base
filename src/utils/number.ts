export function clamp(value: number, min: number, max: number): number {
  if (min > max) [min, max] = [max, min];
  return Math.min(Math.max(value, min), max);
}

export function roundTo(value: number, digits = 0): number {
  const p = Math.pow(10, digits);
  return Math.round(value * p) / p;
}

export function formatNumber(value: number, locale?: string): string {
  const loc = locale || undefined;
  return new Intl.NumberFormat(loc).format(value);
}

export function toCurrency(value: number, currency = 'IDR', locale?: string): string {
  const loc = locale || undefined;
  return new Intl.NumberFormat(loc, { style: 'currency', currency }).format(value);
}

export function parseNumberSafe(input: unknown, fallback = 0): number {
  if (typeof input === 'number' && !Number.isNaN(input)) return input;
  if (typeof input === 'string') {
    const n = Number(input.replace(/[^0-9+\-.,]/g, '').replace(',', '.'));
    return Number.isNaN(n) ? fallback : n;
  }
  return fallback;
}

export function percent(value: number, digits = 0): string {
  return `${roundTo(value * 100, digits)}%`;
}
