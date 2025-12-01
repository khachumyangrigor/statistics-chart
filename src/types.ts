export interface Variation {
  id?: number;
  name: string;
}

export interface DataPoint {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
}

export interface ChartData {
  variations: Variation[];
  data: DataPoint[];
}

export interface ProcessedDataPoint {
  date: string;
  [variationKey: string]: string | number;
}

export enum TimeRange {
  Day = 'day',
  Week = 'week',
}

export enum LineStyle {
  Line = 'line',
  Smooth = 'smooth',
  Area = 'area',
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

export interface BrushChangeData {
  startIndex?: number;
  endIndex?: number;
}

export interface ChartMouseEvent {
  activeTooltipIndex?: number;
}
