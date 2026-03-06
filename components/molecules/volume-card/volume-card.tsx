'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { FixedLabelNumberInput } from '@/components/atoms/fixed-label-number-input';
import { FixedLabelCurrencyInput } from '@/components/atoms/fixed-label-currency-input';
import { Volume } from '@/lib/types/freight';
import styles from './volume-card.module.scss';

interface VolumeCardProps {
  volume: Volume;
  index: number;
  isFirst: boolean;
  firstVolumePrice?: number;
  onUpdate: (index: number, volume: Volume) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  errors?: Record<string, string>;
}

export const VolumeCard: React.FC<VolumeCardProps> = ({
  volume,
  index,
  isFirst,
  firstVolumePrice = 0,
  onUpdate,
  onRemove,
  canRemove,
  errors = {},
}) => {
  const handleFieldChange = (field: keyof Volume, value: number) => {
    onUpdate(index, { ...volume, [field]: value });
  };

  return (
    <div className={styles.volumeCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Volume #{index + 1}</h3>
        {canRemove && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemove(index)}
          >
            <DeleteOutlined style={{ color: '#C41E8A', fontSize: 16 }} />
            <span className={styles.gradientText}>Remover volume</span>
          </button>
        )}
      </div>

      <div className={styles.fields}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <FixedLabelNumberInput
              label="Quantidade *"
              value={volume?.quantity ?? 0}
              onChange={(val) => handleFieldChange('quantity', val)}
              placeholder="0"
              error={!!errors[`volume_${index}_quantity`]}
              errorMessage={errors[`volume_${index}_quantity`]}
            />
          </Col>
          <Col xs={24} sm={8}>
            <FixedLabelNumberInput
              label="Peso *"
              value={volume?.weight ?? 0}
              onChange={(val) => handleFieldChange('weight', val)}
              placeholder="0kg"
              decimals={2}
              error={!!errors[`volume_${index}_weight`]}
              errorMessage={errors[`volume_${index}_weight`]}
            />
          </Col>
          <Col xs={24} sm={8}>
            {isFirst ? (
              <FixedLabelCurrencyInput
                label="Valor total da nota *"
                value={volume?.price ?? 0}
                onChange={(val) => handleFieldChange('price', val)}
                placeholder="R$ 00,00"
                error={!!errors[`volume_${index}_price`]}
                errorMessage={errors[`volume_${index}_price`]}
              />
            ) : (
              <FixedLabelCurrencyInput
                label="Valor total da nota"
                value={firstVolumePrice}
                placeholder="R$ 00,00"
                disabled
              />
            )}
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} sm={8}>
            <FixedLabelNumberInput
              label="Altura *"
              value={volume?.height ?? 0}
              onChange={(val) => handleFieldChange('height', val)}
              placeholder="00cm"
              error={!!errors[`volume_${index}_height`]}
              errorMessage={errors[`volume_${index}_height`]}
            />
          </Col>
          <Col xs={24} sm={8}>
            <FixedLabelNumberInput
              label="Largura *"
              value={volume?.width ?? 0}
              onChange={(val) => handleFieldChange('width', val)}
              placeholder="00cm"
              error={!!errors[`volume_${index}_width`]}
              errorMessage={errors[`volume_${index}_width`]}
            />
          </Col>
          <Col xs={24} sm={8}>
            <FixedLabelNumberInput
              label="Comprimento *"
              value={volume?.length ?? 0}
              onChange={(val) => handleFieldChange('length', val)}
              placeholder="00cm"
              error={!!errors[`volume_${index}_length`]}
              errorMessage={errors[`volume_${index}_length`]}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
