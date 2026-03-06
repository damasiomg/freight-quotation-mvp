'use client';

import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import React, { useState, useEffect } from 'react';

interface MaskedInputProps extends Omit<InputProps, 'onChange'> {
  mask?: (value: string) => string;
  unmask?: (value: string) => string;
  onChange?: (value: string, unmaskedValue: string) => void;
  value?: string;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
  mask,
  unmask,
  onChange,
  value = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e?.target?.value ?? '';
    const unmaskedValue = unmask?.(rawValue) ?? rawValue;
    const maskedValue = mask?.(unmaskedValue) ?? unmaskedValue;
    
    setInternalValue(maskedValue);
    onChange?.(maskedValue, unmaskedValue);
  };

  return (
    <Input
      {...props}
      value={internalValue}
      onChange={handleChange}
    />
  );
};
