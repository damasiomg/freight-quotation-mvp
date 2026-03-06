'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { HiringForm } from '@/components/organisms/hiring-form';
import { CalculatorOutlined, SendOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './page.module.scss';

export default function HiringPage() {
  const breadcrumb = (
    <>
      <Link href="/" className={styles.breadcrumbLink}>
        <CalculatorOutlined style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
        <span>Cotação de Frete</span>
      </Link>
      <span className={styles.separator}>/</span>
      <span className={styles.current}>
        <SendOutlined style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
        <span>Contratação</span>
      </span>
    </>
  );

  return (
    <MainLayout pageTitle="Contratação" breadcrumb={breadcrumb}>
      <HiringForm />
    </MainLayout>
  );
}
