'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, message, Input } from 'antd';
import { useRouter } from 'next/navigation';
import {
  SendOutlined,
  FlagOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  EditOutlined,
  CalculatorOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setSenderData, setDestinyData, setObservation } from '@/lib/redux/hiring-slice';
import { resetQuotation, setSelectedService } from '@/lib/redux/quotation-slice';
import { resetHiring } from '@/lib/redux/hiring-slice';
import {
  maskCEP,
  unmaskCEP,
  maskDocument,
  unmaskDocument,
  maskPhone,
  unmaskPhone,
  formatCurrency,
} from '@/lib/utils/masks';
import {
  validateDocument,
  validateEmail,
  validatePhone,
  isRequired,
} from '@/lib/utils/validation';
import { OrderPayload } from '@/lib/types/freight';
import styles from './hiring-form.module.scss';
import { FixedLabelInput } from '../..//atoms/fixed-label-input';
import { formatDecimal } from '@/lib/utils';
import { QuoteResultCard } from '@/components/molecules';


export const HiringForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const quotation = useAppSelector((state) => state?.quotation);
  const hiring = useAppSelector((state) => state?.hiring);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showAllResults, setShowAllResults] = useState(false);
  const [volumeDeclarations, setVolumeDeclarations] = useState<string[]>([]);
  const [volumeValues, setVolumeValues] = useState<any[]>([]);


  useEffect(() => {
    if (quotation?.zipCodeStart) {
      dispatch(setSenderData({ zipcode: quotation?.zipCodeStart }));
    }
    if (quotation?.zipCodeEnd) {
      dispatch(setDestinyData({ zipcode: quotation?.zipCodeEnd }));
    }
    if (quotation?.volumes?.length) {
      setVolumeDeclarations(quotation.volumes.map(() => ''));
      setVolumeValues(quotation.volumes.map(() => 0));
    }
  }, [quotation?.zipCodeStart, quotation?.zipCodeEnd, quotation?.volumes?.length, dispatch]);


  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!isRequired(hiring?.sender?.name)) {
      errors.sender_name = 'Nome obrigatório';
    }
    if (!validateDocument(hiring?.sender?.document ?? '', hiring?.sender?.documentType ?? 'CPF')) {
      errors.sender_document = `${hiring?.sender?.documentType} inválido`;
    }

    if (!isRequired(hiring?.destiny?.name)) {
      errors.destiny_name = 'Nome obrigatório';
    }
    if (!validateDocument(hiring?.destiny?.document ?? '', hiring?.destiny?.documentType ?? 'CPF')) {
      errors.destiny_document = `${hiring?.destiny?.documentType} inválido`;
    }
    if (!validateEmail(hiring?.destiny?.email ?? '')) {
      errors.destiny_email = 'E-mail inválido';
    }
    if (!validatePhone(hiring?.destiny?.phone ?? '')) {
      errors.destiny_phone = 'Telefone inválido';
    }
    if (!isRequired(hiring?.destiny?.number)) {
      errors.destiny_number = 'Número obrigatório';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2
})

  const handleContract = () => {
      console.log('teste')

    if (!validateForm()) {
      message.error('Por favor, preencha todos os campos obrigatórios corretamente');
      return;
    }

    const orderPayload: OrderPayload = {
      quote_service_id: quotation?.selectedService?.id ?? '',
      customer_id: quotation?.customerId ?? '',
      type: quotation?.type ?? '',
      freightContentStatement: {
        documentType: hiring?.sender?.documentType ?? 'CPF',
        sender_document: unmaskDocument(hiring?.sender?.document ?? ''),
        sender_name: hiring?.sender?.name ?? '',
        sender_email: hiring?.sender?.email ?? '',
        sender_phone: unmaskPhone(hiring?.sender?.phone ?? ''),
        sender_zipcode: unmaskCEP(hiring?.sender?.zipcode ?? ''),
        sender_street: hiring?.sender?.street ?? 'Autopreenchido',
        sender_number: hiring?.sender?.number ?? '',
        sender_complement: hiring?.sender?.complement ?? '',
        sender_neighborhood: hiring?.sender?.neighborhood ?? 'Autopreenchido',
        sender_city: hiring?.sender?.city ?? 'Autopreenchido',
        sender_state: hiring?.sender?.state ?? '',
        destiny_document: unmaskDocument(hiring?.destiny?.document ?? ''),
        destiny_name: hiring?.destiny?.name ?? '',
        destiny_email: hiring?.destiny?.email ?? '',
        destiny_phone: unmaskPhone(hiring?.destiny?.phone ?? ''),
        destiny_zipcode: unmaskCEP(hiring?.destiny?.zipcode ?? ''),
        destiny_street: hiring?.destiny?.street ?? 'Autopreenchido',
        destiny_number: hiring?.destiny?.number ?? '',
        destiny_complement: hiring?.destiny?.complement ?? '',
        destiny_neighborhood: hiring?.destiny?.neighborhood ?? 'Autopreenchido',
        destiny_city: hiring?.destiny?.city ?? 'Autopreenchido',
        destiny_state: hiring?.destiny?.state ?? '',
        observation: hiring?.observation ?? '',
        items: quotation?.volumes?.map?.((volume, idx) => ({
          amount: volume?.quantity ?? 0,
          weight: volume?.weight ?? 0,
          height: volume?.height ?? 0,
          width: volume?.width ?? 0,
          length: volume?.length ?? 0,
          description: volumeDeclarations[idx] || 'Produto',
          unit_price: volume?.price ?? 0,
          total_price: (volume?.price ?? 0) * (volume?.quantity ?? 0),
        })) ?? [],
      },
    };

    console.log('Order Payload:', JSON.stringify(orderPayload, null, 2));
    message.success('Pedido simulado com sucesso! Verifique o console.');
  };

  const handleNewQuote = () => {
    dispatch(resetQuotation());
    dispatch(resetHiring());
    router.push('/');
  };

  const handleServiceSelect = (service: any) => {
    dispatch(setSelectedService(service));
  };
  

  const handleEdit = () => {
    router.push('/');
  };

  const totalWeight = quotation?.volumes?.reduce((sum, v) => sum + ((v?.weight ?? 0) * (v?.quantity ?? 0)), 0) ?? 0;
  const totalValue = quotation?.volumes?.reduce((sum, v) => sum + ((v?.price ?? 0) * (v?.quantity ?? 0)), 0) ?? 0;

  const displayedCarriers = showAllResults 
    ? quotation?.quotationResults 
    : quotation?.quotationResults?.slice(0, 3);

  return (
    <div className={styles.hiringForm}>
      {}
        <h2 className={styles.sectionTitle}>Cotação Selecionada</h2>
      <div className={styles.section}>

        {}
        <div className={styles.routeInfo}>
          <div className={styles.routePoint}>
            <SendOutlined className={styles.routeIcon } />
            <div>
              <span className={styles.routeLabel}>Origem</span>
              <span className={styles.routeCity}>Ribeirão Preto - SP</span>
            </div>
          </div>
          <div className={styles.dottedLine}></div>
          <div className={styles.routePoint}>
            <FlagOutlined className={styles.routeIcon} />
            <div>
              <span className={styles.routeLabel}>Destino</span>
              <span className={styles.routeCity}>Campina Grande - PB</span>
            </div>
          </div>
        </div>



        <div className={styles.resultsSection}>
          {displayedCarriers?.map?.((service, index) => (
            <QuoteResultCard
              key={service?.id || index}
              service={service}
              onSelect={handleServiceSelect}
              selected={quotation?.selectedService?.id === service?.id}
            />
          ))}


        </div>

        {quotation?.quotationResults?.length > 3 && (
          <div className={styles.showMoreBtn}>
            <button type="button" onClick={() => setShowAllResults(!showAllResults)}>
              {showAllResults ? <CaretUpOutlined className={styles.arrowIcon} /> : <CaretDownOutlined className={styles.arrowIcon} />}
              <span className={styles.gradientText}>
                {showAllResults ? 'Mostrar menos' : 'Mostrar outros transportes'}
              </span>
            </button>
          </div>
        )}
      </div>

      {}
      <div className={styles.section}>
        <div className={styles.volumesTable}>
          <div className={styles.tableHeader}>
            <span></span>
            <span>Quantidade</span>
            <span>Dimensões (cm)</span>
            <span>Peso (kg)</span>
            <span>Valor <span className={styles.required}>*</span></span>
            <span>Declaração <span className={styles.required}>*</span></span>
          </div>
          {quotation?.volumes?.map?.((volume, idx) => (
            <div key={idx} className={styles.tableRow}>
              <span className={styles.volumeLabel}>Volume #{idx + 1}</span>
              <span className={styles.strongLabel}>{volume?.quantity ?? 0}</span>
              <span className={styles.strongLabel}>{volume?.height ?? 0} x {volume?.width ?? 0} x {volume?.length ?? 0}</span>
              <span className={styles.strongLabel}>{volume?.weight ?? 0} kg</span>
              <span>


              <Input
                value={formatCurrency((volumeValues[idx] ?? 0) / 100)}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "");

                  setVolumeValues(prev => {
                    const next = [...prev];
                    next[idx] = Number(digits);
                    return next;
                  });
                }}
                className={styles.valueInput}
              />

              </span>
              <span>
                <Input
                  placeholder="Ex: Camisa e Sapato"
                  value={volumeDeclarations[idx] ?? ''}
                  onChange={(e) => {
                    const newDeclarations = [...volumeDeclarations];
                    newDeclarations[idx] = e.target.value;
                    setVolumeDeclarations(newDeclarations);
                  }}
                  size="small"
                  className={styles.declarationInput}
                />
              </span>
            </div>
          ))}
        </div>

        <div className={styles.totalRow}>
          <span>Peso total do envio: <span className={styles.totalValue}>{formatDecimal(totalWeight)}kg</span></span>
          <span>Valor total: <span className={styles.totalValue}>{formatCurrency(totalValue)}</span></span>
        </div>


      <button
        className={styles.editBtn}
        type="button"
        onClick={handleEdit}
      >
          <EditOutlined className={styles.editIcon} />
          <span className={styles.gradientText}>Editar</span>
      </button>
      </div>

      {}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Informações de envio</h2>

        {}
        <div className={styles.formGroup}>
          <h3 className={styles.formGroupTitle}>Remetente</h3>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="CNPJ/CPF *"
                value={hiring?.sender?.document ?? ''}
                mask={(val) => maskDocument(val, hiring?.sender?.documentType ?? 'CPF')}
                unmask={unmaskDocument}
                onChange={(val) => dispatch(setSenderData({ document: val }))}
                error={!!validationErrors?.sender_document}
                errorMessage={validationErrors?.sender_document}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="Nome *"
                value={hiring?.sender?.name ?? ''}
                onChange={(val) => dispatch(setSenderData({ name: val }))}
                error={!!validationErrors?.sender_name}
                errorMessage={validationErrors?.sender_name}
              />
            </Col>
          </Row>
        </div>

        {}
        <div className={styles.formGroup}>
          <h3 className={styles.formGroupTitle}>Destinatário</h3>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="CNPJ/CPF *"
                value={hiring?.destiny?.document ?? ''}
                mask={(val) => maskDocument(val, hiring?.destiny?.documentType ?? 'CPF')}
                unmask={unmaskDocument}
                onChange={(val) => dispatch(setDestinyData({ document: val }))}
                error={!!validationErrors?.destiny_document}
                errorMessage={validationErrors?.destiny_document} 
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="Nome *"
                value={hiring?.destiny?.name ?? ''}
                onChange={(val) => dispatch(setDestinyData({ name: val }))}
                error={!!validationErrors?.destiny_name}
                errorMessage={validationErrors?.destiny_name}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="E-mail *"
                value={hiring?.destiny?.email ?? ''}
                onChange={(val) => dispatch(setDestinyData({ email: val }))}
                error={!!validationErrors?.destiny_email}
                errorMessage={validationErrors?.destiny_email}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="Celular *"
                value={hiring?.destiny?.phone ?? ''}
                mask={maskPhone}
                unmask={unmaskPhone}
                onChange={(val) => dispatch(setDestinyData({ phone: val }))}
                error={!!validationErrors?.destiny_phone}
                errorMessage={validationErrors?.destiny_phone}
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="CEP *"
                value={maskCEP(hiring?.destiny?.zipcode ?? '')}
                disabled
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="Logradouro *"
                value="Autopreenchido"
                disabled
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="Número *"
                value={hiring?.destiny?.number ?? ''}
                onChange={(val) => dispatch(setDestinyData({ number: val }))}
                error={!!validationErrors?.destiny_number}
                errorMessage={validationErrors?.destiny_number}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="Complemento"
                value={hiring?.destiny?.complement ?? ''}
                onChange={(val) => dispatch(setDestinyData({ complement: val }))}
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="Bairro *"
                value="Autopreenchido"
                disabled
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FixedLabelInput
                label="Cidade *"
                value="Autopreenchido"
                disabled
              />
            </Col>
            <Col xs={24} md={12}>
              <FixedLabelInput
                label="Observação"
                value={hiring?.observation ?? ''}
                onChange={(val) => dispatch(setObservation(val))}
              />
            </Col>
          </Row>
        </div>
      </div>

      {}
      <div className={styles.bottomActions}>
        <button type="button" className={styles.newQuoteBtn} onClick={handleNewQuote}>
          <CalculatorOutlined className={styles.calcIcon} />
          <span className={styles.gradientText}>Realizar nova cotação</span>
        </button>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={handleContract}
        >
          Criar pedido de frete
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};
