'use client';

import React, { useCallback, useState } from 'react';
import { message, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import {   CaretDownOutlined, CaretUpOutlined, CalculatorOutlined, RightOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  setZipCodeStart,
  setZipCodeEnd,
  addVolume,
  removeVolume,
  updateVolume,
  setQuotationResults,
  setSelectedService,
  setCustomerId,
  setType,
  setLoading,
  setError,
} from '@/lib/redux/quotation-slice';
import { FixedLabelInput } from '@/components/atoms/fixed-label-input';
import { VolumeCard } from '@/components/molecules/volume-card';
import { QuoteResultCard } from '@/components/molecules/quote-result-card';
import { maskCEP, unmaskCEP } from '@/lib/utils/masks';
import { validateCEP, isRequired } from '@/lib/utils/validation';
import { debounce } from '@/lib/utils/debounce';
import { calculateFreight } from '@/lib/services/quote-service';
import { Volume } from '@/lib/types/freight';
import styles from './quotation-form.module.scss';

export const QuotationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const quotation = useAppSelector((state) => state?.quotation);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showAllResults, setShowAllResults] = useState(false);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!validateCEP(quotation?.zipCodeStart ?? '')) {
      errors.zipCodeStart = 'CEP de origem inválido';
    }

    if (!validateCEP(quotation?.zipCodeEnd ?? '')) {
      errors.zipCodeEnd = 'CEP de destino inválido';
    }

    quotation?.volumes?.forEach?.((volume, index) => {
      if (!isRequired(volume?.quantity) || volume?.quantity <= 0) {
        errors[`volume_${index}_quantity`] = 'Quantidade obrigatória';
      }
      if (!isRequired(volume?.length) || volume?.length <= 0) {
        errors[`volume_${index}_length`] = 'Comprimento obrigatório';
      }
      if (!isRequired(volume?.height) || volume?.height <= 0) {
        errors[`volume_${index}_height`] = 'Altura obrigatória';
      }
      if (!isRequired(volume?.weight) || volume?.weight <= 0) {
        errors[`volume_${index}_weight`] = 'Peso obrigatório';
      }
      if (!isRequired(volume?.width) || volume?.width <= 0) {
        errors[`volume_${index}_width`] = 'Largura obrigatória';
      }
      if (index === 0 && (!isRequired(volume?.price) || volume?.price <= 0)) {
        errors[`volume_${index}_price`] = 'Valor obrigatório';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCalculate = async () => {
    if (!validateForm()) {
      message.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const totalAmount = quotation?.volumes?.reduce?.(
        (sum, vol) => sum + (vol?.price ?? 0) * (vol?.quantity ?? 0),
        0
      ) ?? 0;

      const response = await calculateFreight({
        zip_code_start: unmaskCEP(quotation?.zipCodeStart ?? ''),
        zip_code_end: unmaskCEP(quotation?.zipCodeEnd ?? ''),
        volumes: quotation?.volumes ?? [],
        amount: totalAmount,
      });

      if (response?.success && response?.data) {
        dispatch(setQuotationResults(response?.data?.services ?? []));
        dispatch(setCustomerId(response?.data?.customer_id ?? ''));
        dispatch(setType(response?.data?.type ?? ''));
        message.success('Cotação realizada com sucesso!');
      } else {
        dispatch(setError(response?.error ?? 'Erro ao calcular frete'));
        message.error(response?.error ?? 'Erro ao calcular frete');
      }
    } catch (error: any) {
      const errorMsg = error?.message ?? 'Erro inesperado ao calcular frete';
      dispatch(setError(errorMsg));
      message.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const debouncedCalculate = useCallback(
    debounce(() => {
      if (validateForm()) {
        handleCalculate();
      }
    }, 500),
    [quotation]
  );

  const handleVolumeUpdate = (index: number, volume: Volume) => {
    dispatch(updateVolume({ index, volume }));
  };

  const handleVolumeRemove = (index: number) => {
    dispatch(removeVolume(index));
  };

  const handleAddVolume = () => {
    dispatch(addVolume());
  };

  const handleServiceSelect = (service: any) => {
    dispatch(setSelectedService(service));
  };

  const handleProceed = () => {
    if (!quotation?.selectedService) {
      message.warning('Por favor, selecione uma transportadora');
      return;
    }
    router.push('/hiring');
  };

  const visibleResults = showAllResults 
    ? quotation?.quotationResults 
    : quotation?.quotationResults?.slice(0, 3);

  return (
    <div className={styles.quotationForm}>
      {}
      <div className={styles.cepCard}>
        <div className={styles.cepRow}>
          <div className={styles.cepInputWrapper}>
            <FixedLabelInput
              label="Seu CEP *"
              value={quotation?.zipCodeStart ?? ''}
              mask={maskCEP}
              unmask={unmaskCEP}
              onChange={(val) => dispatch(setZipCodeStart(val))}
              placeholder="38280-000"
              error={!!validationErrors?.zipCodeStart}
              errorMessage={validationErrors?.zipCodeStart}
              maxLength={9}
            />
          </div>
          
          <div className={styles.arrowWrapper}>
            <RightOutlined style={{ color: '#C41E8A', fontSize: 18 }} />
          </div>
          
          <div className={styles.cepInputWrapper}>
            <FixedLabelInput
              label="CEP do comprador *"
              value={quotation?.zipCodeEnd ?? ''}
              mask={maskCEP}
              unmask={unmaskCEP}
              onChange={(val) => dispatch(setZipCodeEnd(val))}
              placeholder="38280-000"
              error={!!validationErrors?.zipCodeEnd}
              errorMessage={validationErrors?.zipCodeEnd}
              maxLength={9}
            />
          </div>
        </div>
      </div>

      {}
      <div className={styles.volumesSection}>
        {quotation?.volumes?.map?.((volume, index) => (
          <VolumeCard
            key={index}
            volume={volume}
            index={index}
            isFirst={index === 0}
            firstVolumePrice={quotation?.volumes?.[0]?.price ?? 0}
            onUpdate={handleVolumeUpdate}
            onRemove={handleVolumeRemove}
            canRemove={quotation?.volumes?.length > 1}
            errors={validationErrors}
          />
        ))}
      </div>

      {}
      <div className={styles.actions}>
        <button
          className={styles.addVolumeBtn}
          onClick={handleAddVolume}
          type="button"
        >
          <svg width="18" height="18" viewBox="64 64 896 896" className={styles.addIconSvg}>
            <defs>
              <linearGradient id="addBtnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C41E8A" />
                <stop offset="100%" stopColor="#7B2D8E" />
              </linearGradient>
            </defs>
            <path fill="url(#addBtnGradient)" d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"/>
            <path fill="url(#addBtnGradient)" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
          </svg>
          <span className={styles.gradientContent}>Adicionar outro volume</span>
        </button>

        <button
          className={styles.primaryBtn}
          onClick={handleCalculate}
          disabled={quotation?.loading}
          type="button"
        >
          <CalculatorOutlined className={styles.btnIcon} />
          Realizar cotação
        </button>
      </div>

      {}
      {quotation?.loading && (
        <div className={styles.loadingSection}>
          <Spin size="large" />
          <p>Calculando cotações...</p>
        </div>
      )}

      {}
      {!quotation?.loading && quotation?.quotationResults?.length > 0 && (
        <div className={styles.resultsSection}>
          {visibleResults?.map?.((service, index) => (
            <QuoteResultCard
              key={service?.id || index}
              service={service}
              onSelect={handleServiceSelect}
              selected={quotation?.selectedService?.id === service?.id}
            />
          ))}

          {quotation?.quotationResults?.length > 3 && (
            <div className={styles.showMore}>
              <button type="button" onClick={() => setShowAllResults(!showAllResults)}>
                {showAllResults ? <CaretUpOutlined className={styles.arrowToggle} /> : <CaretDownOutlined className={styles.arrowToggle} />}
                <span className={styles.gradientText}>
                  {showAllResults ? 'Mostrar menos' : 'Mostrar outros transportes'}
                </span>
              </button>
            </div>
          )}

          {quotation?.selectedService && (
            <div className={styles.proceedActions}>
              <button
                className={styles.primaryBtn}
                onClick={handleProceed}
                type="button"
              >
                Continuar para Contratação
                <RightOutlined />
              </button>
            </div>
          )}
        </div>
      )}

      {}
      {quotation?.error && (
        <div className={styles.errorSection}>
          <p>{quotation?.error}</p>
        </div>
      )}
    </div>
  );
};
