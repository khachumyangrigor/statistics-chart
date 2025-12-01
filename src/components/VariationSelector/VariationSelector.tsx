import { Variation } from '../../types';
import { getVariationKey } from '../../utils/dataProcessor';
import { getVariationColor } from '../../utils/colors';
import styles from './VariationSelector.module.css';

interface VariationSelectorProps {
  variations: Variation[];
  selectedVariations: string[];
  onToggle: (variationKey: string) => void;
}

export function VariationSelector({
  variations,
  selectedVariations,
  onToggle,
}: VariationSelectorProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Variations</h3>
      <div className={styles.checkboxes}>
        {variations.map((variation) => {
          const key = getVariationKey(variation);
          const isSelected = selectedVariations.includes(key);
          const isDisabled = isSelected && selectedVariations.length === 1;

          const color = getVariationColor(variation);

          return (
            <label key={key} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => onToggle(key)}
                className={styles.checkbox}
              />
              <span className={styles.colorIndicator} style={{ backgroundColor: color }} />
              <span className={styles.checkboxText}>{variation.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
