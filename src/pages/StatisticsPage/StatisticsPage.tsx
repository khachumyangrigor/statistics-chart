import { useState, useRef } from 'react';
import { ChartData } from '../../types';
import { useChartState, useTheme } from '../../hooks';
import { ChartControlsSection, ChartSection } from '../../sections';
import { ChartHandle } from '../../components';
import chartDataJson from '../../../data.json';

export function StatisticsPage() {
  const [chartData] = useState<ChartData>(chartDataJson as ChartData);
  const chartRef = useRef<ChartHandle>(null);

  const {
    selectedVariations,
    timeRange,
    lineStyle,
    theme,
    processedData,
    yAxisDomain,
    setTimeRange,
    setLineStyle,
    setTheme,
    handleVariationToggle,
  } = useChartState({ chartData });

  useTheme(theme);

  const handleExportPNG = () => {
      chartRef.current?.exportToPNG();
  };

  return (
    <>
      <ChartControlsSection
        chartData={chartData}
        selectedVariations={selectedVariations}
        timeRange={timeRange}
        lineStyle={lineStyle}
        theme={theme}
        onVariationToggle={handleVariationToggle}
        onTimeRangeChange={setTimeRange}
        onLineStyleChange={setLineStyle}
        onThemeToggle={setTheme}
        onExport={handleExportPNG}
      />

      <ChartSection
        ref={chartRef}
        data={processedData}
        selectedVariations={selectedVariations}
        chartData={chartData}
        lineStyle={lineStyle}
        theme={theme}
        yAxisDomain={yAxisDomain}
        timeRange={timeRange}
      />
    </>
  );
}
