import { Line, Area } from 'recharts';
import { LineStyle, ChartData } from '../../../types';
import { getColorByVariationKey, getVariationName } from '../../../utils';

export function renderLine(
  variationKey: string,
  lineStyle: LineStyle,
  chartData: ChartData
): JSX.Element {
  const variationName = getVariationName(variationKey, chartData.variations);
  const color = getColorByVariationKey(variationKey, chartData.variations);

  const commonProps = {
    dataKey: variationKey,
    name: variationName,
    stroke: color,
    strokeWidth: 2,
    dot: { r: 4 },
    activeDot: { r: 6 },
  };

  if (lineStyle === LineStyle.Area) {
    return (
      <Area
        key={variationKey}
        {...commonProps}
        type="monotone"
        fill={color}
        fillOpacity={0.3}
      />
    );
  }

  if (lineStyle === LineStyle.Smooth) {
    return <Line key={variationKey} {...commonProps} type="monotone" />;
  }

  return <Line key={variationKey} {...commonProps} type="linear" />;
}

