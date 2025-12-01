import { forwardRef } from 'react';
import { Chart, ChartHandle } from '../../components';
import { ProcessedDataPoint, ChartData, LineStyle, Theme, TimeRange } from '../../types';
import styles from './ChartSection.module.css';

interface ChartSectionProps {
  data: ProcessedDataPoint[];
  selectedVariations: string[];
  chartData: ChartData;
  lineStyle: LineStyle;
  theme: Theme;
  yAxisDomain: [number, number];
  timeRange: TimeRange;
}

export const ChartSection = forwardRef<ChartHandle, ChartSectionProps>(
  ({ data, selectedVariations, chartData, lineStyle, theme, yAxisDomain, timeRange }, ref) => {
    return (
      <div className={styles.chartWrapper}>
        <Chart
          ref={ref}
          data={data}
          selectedVariations={selectedVariations}
          chartData={chartData}
          lineStyle={lineStyle}
          theme={theme}
          yAxisDomain={yAxisDomain}
          timeRange={timeRange}
        />
      </div>
    );
  }
);

ChartSection.displayName = 'ChartSection';
