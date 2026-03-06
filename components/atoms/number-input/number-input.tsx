'use client';

import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import React, { useState, useEffect } from 'react';

interface NumberInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: number) => void;
  value?: number;
  decimals?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  value = 0,
  decimals = 0,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(String(value ?? ''));

  useEffect(() => {
    const numValue = typeof value === 'number' ? value : 0;
    setInternalValue(String(numValue));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e?.target?.value ?? '';
    
    if (decimals > 0) {
      
      const cleaned = rawValue?.replace?.(/[^0-9.]/g, '') ?? '0';
      const parts = cleaned?.split?.('.') ?? [];
      const formatted = parts?.length > 1 
        ? `${parts[0]}.${parts[1]?.slice?.(0, decimals) ?? ''}`
        : cleaned;
      
      setInternalValue(formatted);
      onChange?.(parseFloat(formatted) || 0);
    } else {
      
      const cleaned = rawValue?.replace?.(/\D/g, '') ?? '0';
      setInternalValue(cleaned);
      onChange?.(parseInt(cleaned, 10) || 0);
    }
  };

  return (
    <Input
      {...props}
      value={internalValue}
      onChange={handleChange}
    />
  );
};
