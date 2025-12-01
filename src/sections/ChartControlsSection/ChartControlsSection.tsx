import { ChartData, TimeRange, LineStyle, Theme } from '../../types';
import { VariationSelector, TimeRangeSelector, ChartControls } from '../../components';
import styles from './ChartControlsSection.module.css';

interface ChartControlsSectionProps {
  chartData: ChartData;
  selectedVariations: string[];
  timeRange: TimeRange;
  lineStyle: LineStyle;
  theme: Theme;
  onVariationToggle: (variationKey: string) => void;
  onTimeRangeChange: (range: TimeRange) => void;
  onLineStyleChange: (style: LineStyle) => void;
  onThemeToggle: () => void;
  onExport: () => void;
}

export function ChartControlsSection({
  chartData,
  selectedVariations,
  timeRange,
  lineStyle,
  theme,
  onVariationToggle,
  onTimeRangeChange,
  onLineStyleChange,
  onThemeToggle,
  onExport,
}: ChartControlsSectionProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.controlsLeft}>
        <VariationSelector
          variations={chartData.variations}
          selectedVariations={selectedVariations}
          onToggle={onVariationToggle}
        />
        <TimeRangeSelector timeRange={timeRange} onChange={onTimeRangeChange} />
      </div>

      <div className={styles.controlsRight}>
        <ChartControls
          lineStyle={lineStyle}
          theme={theme}
          onLineStyleChange={onLineStyleChange}
          onThemeToggle={onThemeToggle}
          onExport={onExport}
        />
      </div>
    </div>
  );
}
