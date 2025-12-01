import { ProcessedDataPoint } from '../types';

export function getMinMaxValues(
  data: ProcessedDataPoint[],
  selectedVariations: string[]
): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;

  for (const point of data) {
    for (const key of selectedVariations) {
      const val = point[key] as number;
      if (typeof val === 'number' && !isNaN(val)) {
        if (val < min) min = val;
        if (val > max) max = val;
      }
    }
  }

  if (!isFinite(min) || !isFinite(max)) {
    return { min: 0, max: 100 };
  }

  const padding = (max - min) * 0.1;
  return {
    min: Math.max(0, min - padding),
    max: max + padding,
  };
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
