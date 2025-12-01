import { Theme } from '../types';

export function getThemeColor(theme: Theme, dark: string, light: string): string {
  return theme === Theme.Dark ? dark : light;
}

