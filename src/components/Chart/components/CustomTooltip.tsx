import { formatPercentage } from '../../../utils';
import { TooltipProps } from '../../../types';
import styles from '../Chart.module.css';

export const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className={styles.tooltipItem}>
          <span className={styles.tooltipDot} style={{ backgroundColor: entry.color }} />
          <span className={styles.tooltipName}>{entry.name}:</span>
          <span className={styles.tooltipValue}>{formatPercentage(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};
