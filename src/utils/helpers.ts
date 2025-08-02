export function initAnalytics() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'js': new Date() });
    window.dataLayer.push({
      'config': 'G-XXXXXXXXXX'
    });
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(new Date(date));
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
