import { Variation } from '../types';
import { getVariationKey } from './dataProcessor';

const COLOR_PALETTE = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#ff6b6b'];

const variationColorMap = new Map<string, string>();

export function getVariationColor(variation: Variation): string {
  const key = getVariationKey(variation);

  if (!variationColorMap.has(key)) {
    const index = variationColorMap.size % COLOR_PALETTE.length;
    variationColorMap.set(key, COLOR_PALETTE[index]);
  }

  return variationColorMap.get(key)!;
}

export function getColorByVariationKey(variationKey: string, variations: Variation[]): string {
  for (const v of variations) {
    if (getVariationKey(v) === variationKey) {
      return getVariationColor(v);
    }
  }
  return COLOR_PALETTE[0];
}
