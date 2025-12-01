import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from '../../icons';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

export function Select({ value, options, onChange, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`${styles.selectWrapper} ${className ?? ''}`}>
      <button
        type="button"
        className={styles.selectButton}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.selectValue}>{selectedOption?.label || value}</span>
        <ChevronDownIcon
          size={12}
          className={`${styles.selectIcon} ${isOpen ? styles.selectIconOpen : ''}`}
        />
      </button>
      {isOpen && (
        <div className={styles.selectDropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.selectOption} ${value === option.value ? styles.selectOptionActive : ''}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
              {value === option.value && <CheckIcon size={16} className={styles.checkIcon} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
