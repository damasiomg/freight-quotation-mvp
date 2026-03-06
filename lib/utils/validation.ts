

export const validateCEP = (cep: string): boolean => {
  const cleaned = cep?.replace?.(/\D/g, '') ?? '';
  return cleaned?.length === 8;
};

export const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf?.replace?.(/\D/g, '') ?? '';
  if (cleaned?.length !== 11) return false;
  
  
  const invalidCPFs = [
    '00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777',
    '88888888888', '99999999999'
  ];
  if (invalidCPFs.includes(cleaned)) return false;
  
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit = remainder >= 10 ? 0 : remainder;
  if (digit !== parseInt(cleaned.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  digit = remainder >= 10 ? 0 : remainder;
  if (digit !== parseInt(cleaned.charAt(10))) return false;
  
  return true;
};

export const validateCNPJ = (cnpj: string): boolean => {
  const cleaned = cnpj?.replace?.(/\D/g, '') ?? '';
  if (cleaned?.length !== 14) return false;
  
  
  const invalidCNPJs = [
    '00000000000000', '11111111111111', '22222222222222', '33333333333333',
    '44444444444444', '55555555555555', '66666666666666', '77777777777777',
    '88888888888888', '99999999999999'
  ];
  if (invalidCNPJs.includes(cleaned)) return false;
  
  
  let length = cleaned?.length - 2;
  let numbers = cleaned?.substring?.(0, length) ?? '';
  const digits = cleaned?.substring?.(length) ?? '';
  let sum = 0;
  let pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  
  length = length + 1;
  numbers = cleaned?.substring?.(0, length) ?? '';
  sum = 0;
  pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;
  
  return true;
};

export const validateDocument = (document: string, type: 'CPF' | 'CNPJ'): boolean => {
  return type === 'CPF' ? validateCPF(document) : validateCNPJ(document);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex?.test?.(email ?? '') ?? false;
};

export const validatePhone = (phone: string): boolean => {
  const cleaned = phone?.replace?.(/\D/g, '') ?? '';
  return cleaned?.length === 10 || cleaned?.length === 11;
};

export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') return value?.trim?.()?.length > 0;
  if (typeof value === 'number') return !isNaN(value) && value > 0;
  return value != null;
};
