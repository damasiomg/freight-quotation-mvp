'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../fixed-label-input/fixed-label-input.module.scss';

interface FixedLabelNumberInputProps {
  label: string;
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  decimals?: number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  required?: boolean;
}

export const FixedLabelNumberInput: React.FC<FixedLabelNumberInputProps> = ({
  label,
  value = 0,
  onChange,
  placeholder = '',
  decimals = 0,
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
      setInternalValue(String(value));
    } else {
      setInternalValue('');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    
    if (decimals > 0) {
      rawValue = rawValue.replace(/[^0-9.]/g, '');
      const parts = rawValue.split('.');
      if (parts.length > 2) {
        rawValue = parts[0] + '.' + parts.slice(1).join('');
      }
    } else {
      rawValue = rawValue.replace(/[^0-9]/g, '');
    }
    
    setInternalValue(rawValue);
    onChange?.(parseFloat(rawValue) || 0);
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
            inputMode="decimal"
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
