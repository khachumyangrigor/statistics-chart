import { ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>A/B Test Statistics</h1>
          <p className={styles.subtitle}>Conversion Rate Visualization</p>
        </header>
        {children}
      </div>
    </div>
  );
}
