'use client';

import React, { useState } from 'react';
import { Sidebar } from '../sidebar';
import styles from './main-layout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  breadcrumb?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  breadcrumb,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar onCollapsedChange={setSidebarCollapsed} />
      <main className={`${styles.main} ${sidebarCollapsed ? styles.expanded : ''}`}>
        <div className={styles.content}>
          {breadcrumb && <div className={styles.breadcrumb}>{breadcrumb}</div>}
          {children}
        </div>
      </main>
    </div>
  );
};
