import { TimeRange } from '../types';

export function formatDateTick(value: string | number, timeRange: TimeRange): string {
  if (typeof value !== 'string') return String(value);

  if (timeRange === TimeRange.Week && value.includes(' - ')) {
    const [startDate, endDate] = value.split(' - ');
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const startFormatted = start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const endFormatted = end.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      return `${startFormatted} - ${endFormatted}`;
    }
    return value;
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

