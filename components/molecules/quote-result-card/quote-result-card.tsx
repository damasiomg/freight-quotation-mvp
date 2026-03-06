'use client';
import React from 'react';
import Image from 'next/image';
import { StarFilled, FlagOutlined,ArrowsAltOutlined } from '@ant-design/icons';
import { QuoteService } from '@/lib/types/freight';
import { formatCurrency } from '@/lib/utils/masks';
import styles from './quote-result-card.module.scss';
import { capitalizeText, formatDecimal } from '@/lib/utils';

interface QuoteResultCardProps {
  service: QuoteService;
  onSelect: (service: QuoteService) => void;
  selected?: boolean;
}

export const QuoteResultCard: React.FC<QuoteResultCardProps> = ({
  service,
  onSelect,
  selected = false,
}) => {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={() => onSelect(service)}
    >
      <div className={styles.logoSection}>
        <div className={styles.carrierLogo}>
          <Image src={service.carrier_avatar ? service.carrier_avatar : "/assets/carriers.png"} alt="Logo" width={45} height={45} />
        </div>
      </div>

      <div className={styles.carrierInfo}>
        {!!service?.carrier_url && <div
          className={styles.carrierLink}
          onClick={() => window.open(service.carrier_url, '_blank')}
        >
          <span className={styles.carrierName}>
            {capitalizeText(service?.service_name) ?? 'Carriers'}
          </span>
          <ArrowsAltOutlined className={styles.carrierLink__icon} />
        </div>}
        <div className={styles.rating}>
          <StarFilled className={styles.starIcon} />
          <span className={styles.value}>{formatDecimal(Number(service?.rating) ?? 0)}</span>
        </div>
      </div>

      <div className={styles.label}>
        <span>Valor</span>
        <span className={styles.value}>{formatCurrency(service?.price ?? 0)}</span>
      </div>

      <div className={styles.label}>
        <span>Prazo</span>
        <span className={styles.value}>{service?.delivery_time ?? '-'} dias úteis</span>
      </div>

      <div className={styles.label}>
        <span>Documento</span>
        <span className={styles.value}>{service?.document_type ?? '-'}</span>
      </div>

      <div className={styles.label}>
        <span>Previsão</span>
        <span className={styles.value}>{service?.delivery_date ?? '-'}</span>
      </div>

      <button
        className={`${styles.selectBtn} ${selected ? styles.selectedBtn : ''}`}
        type="button"
      >
        {selected ? 'Selecionado' : 'Selecionar'}
      </button>
    </div>
  );
};
