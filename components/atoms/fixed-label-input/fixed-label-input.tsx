'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import styles from '../fixed-label-input/fixed-label-input.module.scss';

interface FixedLabelInputProps {
  label: string;
  id?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  mask?: (value: string) => string;
  unmask?: (value: string) => string;
  maxLength?: number;
  className?: string;
  required?: boolean;
}

export const FixedLabelInput: React.FC<FixedLabelInputProps> = ({
  label,
  id,
  value = '',
  onChange,
  type = 'text',
  placeholder = '',
  disabled = false,
  error = false,
  errorMessage,
  mask,
  unmask,
  maxLength,
  className = '',
  required = false,
}) => {
  const generatedId = useId();
const inputId = id ?? generatedId;
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(String(value || ''));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newVal = String(value || '');
    if (mask && newVal) {
      setInternalValue(mask(newVal));
    } else {
      setInternalValue(newVal);
    }
  }, [value, mask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    
    if (unmask) {
      rawValue = unmask(rawValue);
    }
    
    if (mask) {
      const maskedValue = mask(rawValue);
      setInternalValue(maskedValue);
    } else {
      setInternalValue(rawValue);
    }
    
    onChange?.(rawValue);
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
        <label htmlFor={inputId} className={`${styles.label} ${isFocused ? styles.labelFocused : ''}`}>
          {displayLabel}{isRequired && <span className={styles.required}> *</span>}
        </label>
        <div className={styles.inputRow}>
          <input
            id={inputId}
            ref={inputRef}
            type={type}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            maxLength={maxLength}
            className={styles.input}
            placeholder={placeholder}
          />
        </div>
      </div>
      {error && errorMessage ? (
        <span className={styles.errorMessage}>{errorMessage}</span>
      ) : (
        <span className={styles.errorPlaceholder}>&nbsp;</span>
      )}
    </div>
  );
};
