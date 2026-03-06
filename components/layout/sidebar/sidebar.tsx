'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { CaretLeftOutlined, CalculatorOutlined } from '@ant-design/icons';
import styles from './sidebar.module.scss';

interface SidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCollapsedChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleCollapse = () => {
    setCollapsed(true);
    onCollapsedChange?.(true);
  };

  const handleExpand = () => {
    setCollapsed(false);
    onCollapsedChange?.(false);
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logoSection}>
        {!collapsed ? (
          <>
            <div className={styles.logoComposed}>
              <Image
                src="/assets/only_logo.png"
                alt="SmartEnvios"
                width={32}
                height={34}
                priority
              />
              <span className={styles.logoText}>
                <span className={styles.smart}>Smart</span>
                <span className={styles.envios}>Envios</span>
              </span>
            </div>
            <button
              className={styles.collapseBtn}
              onClick={handleCollapse}
              aria-label="Recolher menu"
            >
              <CaretLeftOutlined className={styles.collapseIcon} style={{ color: '#531993' }} />
            </button>
          </>
        ) : (
          <button
            className={styles.expandBtn}
            onClick={handleExpand}
            aria-label="Expandir menu"
          >
            <Image
              src="/assets/only_logo.png"
              alt="SmartEnvios"
              width={32}
              height={34}
              priority
            />
          </button>
        )}
      </div>

      {!collapsed && (
        <>
          <div className={styles.greeting}>
            Olá, <span className={styles.userName}>Rafael Pereira</span>
          </div>

          <div className={styles.menuSection}>
            <span className={styles.menuLabel}>FERRAMENTAS</span>
            <button
              className={`${styles.menuButton} ${pathname === '/' || pathname === '/hiring' ? styles.active : ''}`}
              onClick={() => router.push('/')}
            >
              <CalculatorOutlined className={styles.menuIcon} />
              <span>Calculadora de frete</span>
            </button>
          </div>
        </>
      )}

      {collapsed && (
        <div className={styles.menuSectionCollapsed}>
          <button
            className={`${styles.menuButtonCollapsed} ${pathname === '/' || pathname === '/hiring' ? styles.active : ''}`}
            onClick={() => router.push('/')}
            title="Calculadora de frete"
          >
            <CalculatorOutlined className={styles.menuIcon} />
          </button>
        </div>
      )}
    </aside>
  );
};
