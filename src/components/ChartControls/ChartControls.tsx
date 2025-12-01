import { LineStyle, Theme } from '../../types';
import { MoonIcon, SunIcon, DownloadIcon } from '../../icons';
import { Select } from '../Select';
import styles from './ChartControls.module.css';

const LINE_STYLE_OPTIONS = [
  { value: LineStyle.Line, label: 'Line' },
  { value: LineStyle.Smooth, label: 'Smooth' },
  { value: LineStyle.Area, label: 'Area' },
];

interface ChartControlsProps {
  lineStyle: LineStyle;
  theme: Theme;
  onLineStyleChange: (style: LineStyle) => void;
  onThemeToggle: () => void;
  onExport: () => void;
}

export function ChartControls({
  lineStyle,
  theme,
  onLineStyleChange,
  onThemeToggle,
  onExport,
}: ChartControlsProps) {

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <Select
          value={lineStyle}
          options={LINE_STYLE_OPTIONS}
          onChange={(value) => onLineStyleChange(value as LineStyle)}
        />
      </div>

      <div className={styles.group}>
        <button
          onClick={onThemeToggle}
          className={styles.button}
          title={theme === Theme.Light ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === Theme.Light ? (
            <MoonIcon size={18} className={styles.themeIcon} />
          ) : (
            <SunIcon size={18} className={styles.themeIcon} />
          )}
          <span className={styles.buttonText}>
            {theme === Theme.Light ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>
      </div>

      <div className={styles.group}>
        <button onClick={onExport} className={styles.button} title="Export to PNG">
          <DownloadIcon size={18} />
          <span className={styles.buttonText}>Export PNG</span>
        </button>
      </div>
    </div>
  );
}
