import React from 'react';

interface ChevronDownIconProps {
  className?: string;
  size?: number;
}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ className, size = 12 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 9L1 4h10z" fill="currentColor" />
    </svg>
  );
};
