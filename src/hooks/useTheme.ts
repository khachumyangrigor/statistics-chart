import { useEffect } from 'react';
import { Theme } from '../types';

export function useTheme(theme: Theme) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
}
