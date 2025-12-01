import { ChartData, ProcessedDataPoint, TimeRange } from '../types';

export function calculateConversionRate(conversions: number, visits: number): number {
  if (!visits) return 0;
  return (conversions / visits) * 100;
}

export function processData(
  chartData: ChartData,
  selectedVariations: string[],
  timeRange: TimeRange
): ProcessedDataPoint[] {
  const processed: ProcessedDataPoint[] = [];

  chartData.data.forEach((point) => {
    const processedPoint: ProcessedDataPoint = {
      date: point.date,
    };

    selectedVariations.forEach((variationKey) => {
      const visits = point.visits[variationKey] || 0;
      const conversions = point.conversions[variationKey] || 0;
      const conversionRate = calculateConversionRate(conversions, visits);
      processedPoint[variationKey] = Number(conversionRate.toFixed(2));
    });

    processed.push(processedPoint);
  });

  if (timeRange === TimeRange.Week) {
    return groupByWeek(processed);
  }

  return processed;
}

function groupByWeek(data: ProcessedDataPoint[]): ProcessedDataPoint[] {
  const result: ProcessedDataPoint[] = [];
  const DAYS_IN_WEEK = 7;

  for (let i = 0; i < data.length; i += DAYS_IN_WEEK) {
    const week = data.slice(i, i + DAYS_IN_WEEK);
    if (!week.length) continue;

    const weekPoint: ProcessedDataPoint = {
      date: `${week[0].date} - ${week[week.length - 1].date}`,
    };

    const keys = Object.keys(week[0]).filter((k) => k !== 'date');

    keys.forEach((key) => {
      const nums = week
        .map((p) => p[key] as number)
        .filter((v) => typeof v === 'number' && !isNaN(v));

      if (nums.length) {
        const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
        weekPoint[key] = Number(avg.toFixed(2));
      }
    });

    result.push(weekPoint);
  }

  return result;
}

export function getVariationKey(variation: { id?: number; name: string }): string {
  return variation.id !== undefined ? variation.id.toString() : '0';
}

export function getVariationName(
  variationKey: string,
  variations: ChartData['variations']
): string {
  const variation = variations.find((v) => {
    const key = v.id !== undefined ? v.id.toString() : '0';
    return key === variationKey;
  });
  return variation?.name || 'Unknown';
}
