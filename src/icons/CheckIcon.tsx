import React from 'react';

interface CheckIconProps {
  className?: string;
  size?: number;
}

export const CheckIcon: React.FC<CheckIconProps> = ({ className, size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.3333 4L6 11.3333L2.66667 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
