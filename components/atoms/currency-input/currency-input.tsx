'use client';

import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import React, { useState, useEffect } from 'react';
import { maskCurrency } from '@/lib/utils/masks';

interface CurrencyInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: number) => void;
  value?: number;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  onChange,
  value = 0,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState('');

  useEffect(() => {
    const numValue = typeof value === 'number' ? value : 0;
    setInternalValue(maskCurrency(Math.round(numValue * 100)));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e?.target?.value ?? '';
    const cleaned = rawValue?.replace?.(/\D/g, '') ?? '0';
    const numValue = parseInt(cleaned, 10) || 0;
    const decimalValue = numValue / 100;
    
    setInternalValue(maskCurrency(numValue));
    onChange?.(decimalValue);
  };

  return (
    <Input
      {...props}
      value={internalValue}
      onChange={handleChange}
    />
  );
};
