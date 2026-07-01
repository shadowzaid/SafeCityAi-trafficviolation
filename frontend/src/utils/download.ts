import { API_BASE_URL } from '../api/client';

export function resolveAssetUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
}

export function downloadUrl(url: string, filename: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.target = '_blank';
  anchor.rel = 'noreferrer';
  anchor.click();
}
