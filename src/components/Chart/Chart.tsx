import { useState, useRef, useCallback, forwardRef, useImperativeHandle, useMemo } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine,
  Brush,
} from 'recharts';
import {
  ProcessedDataPoint,
  LineStyle,
  ChartData,
  ChartMouseEvent,
  Theme,
  TimeRange,
} from '../../types';
import styles from './Chart.module.css';
import { CustomTooltip } from './components';
import { renderLine } from './utils/renderLine';
import { formatDateTick, getThemeColor } from '../../utils';

interface ChartProps {
  data: ProcessedDataPoint[];
  selectedVariations: string[];
  chartData: ChartData;
  lineStyle: LineStyle;
  theme: Theme;
  yAxisDomain?: [number, number];
  timeRange: TimeRange;
}

export interface ChartHandle {
  exportToPNG: () => void;
}

export const Chart = forwardRef<ChartHandle, ChartProps>(
  ({ data, selectedVariations, chartData, lineStyle, theme, yAxisDomain, timeRange }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const chartRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((state: ChartMouseEvent | null) => {
      if (state && state.activeTooltipIndex !== undefined) {
        setHoveredIndex(state.activeTooltipIndex);
      }
    }, []);

    const handleMouseLeave = useCallback(() => {
      setHoveredIndex(null);
    }, []);

    const exportToPNG = useCallback(async () => {
      if (!chartRef.current) return;

      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(chartRef.current, {
          backgroundColor: getThemeColor(theme, '#1a1a1a', '#ffffff'),
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          width: chartRef.current.scrollWidth,
          height: chartRef.current.scrollHeight,
        });

        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement('a');
            link.download = 'chart.png';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
          }
        });
      } catch (error) {
        console.error('Error exporting chart:', error);
        alert('Failed to export chart. Please try again.');
      }
    }, [theme]);

    useImperativeHandle(ref, () => ({
      exportToPNG,
    }));

    const brushColor = useMemo(() => getThemeColor(theme, '#666', '#999'), [theme]);

    const ChartComponent = lineStyle === LineStyle.Area ? ComposedChart : LineChart;

    const lines = useMemo(() => {
      return selectedVariations.map((variationKey) =>
        renderLine(variationKey, lineStyle, chartData)
      );
    }, [selectedVariations, lineStyle, chartData]);

    return (
      <div ref={chartRef} className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent
            data={data}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            margin={{ top: 20, right: 100, left: 80, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={getThemeColor(theme, '#444', '#e0e0e0')} />
            <XAxis
              dataKey="date"
              stroke={getThemeColor(theme, '#888', '#666')}
              tick={{
                fill: getThemeColor(theme, '#888', '#666'),
                fontSize: 8,
              }}
              tickFormatter={(value) => formatDateTick(value, timeRange)}
              angle={-60}
              textAnchor="end"
              height={70}
              interval={0}
            />
            <YAxis
              stroke={getThemeColor(theme, '#888', '#666')}
              tick={{
                fill: getThemeColor(theme, '#888', '#666'),
                fontSize: 12,
              }}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              domain={yAxisDomain ? [yAxisDomain[0], yAxisDomain[1]] : ['auto', 'auto']}
            />

            <Tooltip content={<CustomTooltip />} />

            {hoveredIndex !== null && data[hoveredIndex] && (
              <ReferenceLine
                x={data[hoveredIndex].date}
                stroke={getThemeColor(theme, '#666', '#999')}
                strokeDasharray="3 3"
              />
            )}

            {lines}

            {data.length > 0 && (
              <Brush
                dataKey="date"
                height={30}
                stroke={brushColor}
                tickFormatter={(value) => formatDateTick(value, timeRange)}
              />
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    );
  }
);

Chart.displayName = 'Chart';
