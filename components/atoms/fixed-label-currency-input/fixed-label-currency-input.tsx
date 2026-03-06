'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../fixed-label-input/fixed-label-input.module.scss';

interface FixedLabelCurrencyInputProps {
  label: string;
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  required?: boolean;
}

export const FixedLabelCurrencyInput: React.FC<FixedLabelCurrencyInputProps> = ({
  label,
  value = 0,
  onChange,
  placeholder = 'R$ 00,00',
  disabled = false,
  error = false,
  errorMessage,
  className = '',
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value && value > 0) {
      setInternalValue(formatCurrency(value));
    } else {
      setInternalValue('');
    }
  }, [value]);

  const formatCurrency = (val: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(rawValue, 10) / 100 || 0;
    
    if (rawValue === '') {
      setInternalValue('');
      onChange?.(0);
    } else {
      setInternalValue(formatCurrency(numValue));
      onChange?.(numValue);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  
  const isRequired = required || label.endsWith('*');
  const displayLabel = label.replace(/\s*\*$/, '');

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      <div
        className={`
          ${styles.inputContainer}
          ${isFocused ? styles.focused : ''}
          ${error ? styles.error : ''}
          ${disabled ? styles.disabled : ''}
        `}
        onClick={() => inputRef.current?.focus()}
      >
        <label className={`${styles.label} ${isFocused ? styles.labelFocused : ''}`}>
          {displayLabel}{isRequired && <span className={styles.required}> *</span>}
        </label>
        <div className={styles.inputRow}>
          <input
            ref={inputRef}
            type="text"
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={styles.input}
            placeholder={placeholder}
          />
        </div>
      </div>
      {error && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};
