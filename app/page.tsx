'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { QuotationForm } from '@/components/organisms/quotation-form';
import { CalculatorOutlined } from '@ant-design/icons';
import styles from './page.module.scss';

export default function HomePage() {

    const breadcrumb = (
    <>
      <span className={styles.current}>
        <CalculatorOutlined style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
        <span>Cotação de Frete</span>
      </span>
    </>
  );
  return (
    <MainLayout pageTitle="Cotação de frete" breadcrumb={breadcrumb}>
      <QuotationForm />
    </MainLayout>
  );
}
