import { TimeRange } from '../../types';
import styles from './TimeRangeSelector.module.css';

interface TimeRangeSelectorProps {
  timeRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

export function TimeRangeSelector({ timeRange, onChange }: TimeRangeSelectorProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Time Range</h3>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${timeRange === TimeRange.Day ? styles.active : ''}`}
          onClick={() => onChange(TimeRange.Day)}
        >
          Day
        </button>
        <button
          className={`${styles.button} ${timeRange === TimeRange.Week ? styles.active : ''}`}
          onClick={() => onChange(TimeRange.Week)}
        >
          Week
        </button>
      </div>
    </div>
  );
}
