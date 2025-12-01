import { useState, useEffect, useMemo } from 'react';
import { ChartData, TimeRange, LineStyle, Theme } from '../types';
import { processData, getVariationKey, getMinMaxValues } from '../utils';

interface UseChartStateProps {
  chartData: ChartData;
}

export function useChartState({ chartData }: UseChartStateProps) {
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Day);
  const [lineStyle, setLineStyle] = useState<LineStyle>(LineStyle.Line);
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    if (selectedVariations.length === 0 && chartData.variations.length > 0) {
      const firstVariationKey = getVariationKey(chartData.variations[0]);
      setSelectedVariations([firstVariationKey]);
    }
  }, [chartData.variations, selectedVariations.length]);

  const handleVariationToggle = (variationKey: string) => {
    setSelectedVariations((prev) => {
      if (prev.includes(variationKey)) {
        if (prev.length === 1) return prev;
        return prev.filter((key) => key !== variationKey);
      }
      return [...prev, variationKey];
    });
  };

  const processedData = useMemo(
    () => processData(chartData, selectedVariations, timeRange),
    [chartData, selectedVariations, timeRange]
  );

  const yAxisDomain = useMemo(
    () => getMinMaxValues(processedData, selectedVariations),
    [processedData, selectedVariations]
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.Light ? Theme.Dark : Theme.Light));
  };

  return {
    selectedVariations,
    timeRange,
    lineStyle,
    theme,
    processedData,
    yAxisDomain: [yAxisDomain.min, yAxisDomain.max] as [number, number],
    setTimeRange,
    setLineStyle,
    setTheme: toggleTheme,
    handleVariationToggle,
  };
}
