export const maskCEP = (value: string): string => {
  const cleaned = value?.replace?.(/\D/g, '') ?? '';
  if (cleaned.length <= 5) return cleaned;
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
};

export const unmaskCEP = (value: string): string => {
  return value?.replace?.(/\D/g, '') ?? '';
};

export const maskCPF = (value: string): string => {
  const cleaned = value?.replace?.(/\D/g, '') ?? '';
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

export const maskCNPJ = (value: string): string => {
  const cleaned = value?.replace?.(/\D/g, '') ?? '';
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
  if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
  if (cleaned.length <= 12) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
  return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
};

export const maskDocument = (value: string, type: 'CPF' | 'CNPJ'): string => {
  return type === 'CPF' ? maskCPF(value) : maskCNPJ(value);
};

export const unmaskDocument = (value: string): string => {
  return value?.replace?.(/\D/g, '') ?? '';
};

export const maskPhone = (value: string): string => {
  const cleaned = value?.replace?.(/\D/g, '') ?? '';
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

export const unmaskPhone = (value: string): string => {
  return value?.replace?.(/\D/g, '') ?? '';
};

export const maskCurrency = (value: string | number): string => {
  const cleaned = String(value ?? '0')?.replace?.(/\D/g, '') ?? '0';
  const number = parseInt(cleaned, 10) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};

export const unmaskCurrency = (value: string): number => {
  const cleaned = value?.replace?.(/[^0-9,]/g, '')?.replace?.(',', '.') ?? '0';
  return parseFloat(cleaned) || 0;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value ?? 0);
};
