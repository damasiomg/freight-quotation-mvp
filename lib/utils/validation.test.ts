import {
  validateCEP,
  validateCPF,
  validateCNPJ,
  validateDocument,
  validateEmail,
  validatePhone,
  isRequired,
} from '@/lib/utils/validation';

describe('validation utils', () => {
  describe('validateCEP', () => {
    it('returns true for valid CEP with mask', () => {
      expect(validateCEP('12345-678')).toBe(true);
    });

    it('returns true for valid CEP without mask', () => {
      expect(validateCEP('12345678')).toBe(true);
    });

    it('returns false for invalid CEP (short)', () => {
      expect(validateCEP('1234567')).toBe(false);
    });

    it('returns false for empty or undefined', () => {
      expect(validateCEP('')).toBe(false);
      expect(validateCEP(undefined as any)).toBe(false);
    });
  });

  describe('validateCPF', () => {
    it('returns true for a known valid CPF', () => {
      expect(validateCPF('529.982.247-25')).toBe(true);
    });

    it('returns false for repeated digits CPF', () => {
      expect(validateCPF('111.111.111-11')).toBe(false);
    });

    it('returns false for CPF with invalid checksum', () => {
      expect(validateCPF('52998224726')).toBe(false);
    });

    it('returns false for incorrect length', () => {
      expect(validateCPF('123')).toBe(false);
    });
  });

  describe('validateCNPJ', () => {
    it('returns true for a known valid CNPJ', () => {
      expect(validateCNPJ('04.252.011/0001-10')).toBe(true);
    });

    it('returns false for repeated digits CNPJ', () => {
      expect(validateCNPJ('00000000000000')).toBe(false);
    });

    it('returns false for CNPJ with invalid checksum', () => {
      expect(validateCNPJ('04252011000111')).toBe(false);
    });

    it('returns false for incorrect length', () => {
      expect(validateCNPJ('123')).toBe(false);
    });
  });

  describe('validateDocument', () => {
    it('validates CPF when type is CPF', () => {
      expect(validateDocument('529.982.247-25', 'CPF')).toBe(true);
      expect(validateDocument('11111111111', 'CPF')).toBe(false);
    });

    it('validates CNPJ when type is CNPJ', () => {
      expect(validateDocument('04.252.011/0001-10', 'CNPJ')).toBe(true);
      expect(validateDocument('00000000000000', 'CNPJ')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('returns true for valid email', () => {
      expect(validateEmail('user@example.com')).toBe(true);
    });

    it('returns false for invalid emails', () => {
      expect(validateEmail('bad@com')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(undefined as any)).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('returns true for 11-digit phone', () => {
      expect(validatePhone('(11) 98765-4321')).toBe(true);
    });

    it('returns true for 10-digit phone', () => {
      expect(validatePhone('1134567890')).toBe(true);
    });

    it('returns false for invalid lengths', () => {
      expect(validatePhone('12345')).toBe(false);
      expect(validatePhone('')).toBe(false);
    });
  });

  describe('isRequired', () => {
    it('returns true for non-empty strings', () => {
      expect(isRequired('hello')).toBe(true);
    });

    it('returns false for empty or whitespace-only strings', () => {
      expect(isRequired('')).toBe(false);
      expect(isRequired('   ')).toBe(false);
    });

    it('returns true for positive numbers and false for zero or negatives', () => {
      expect(isRequired(10)).toBe(true);
      expect(isRequired(0)).toBe(false);
      expect(isRequired(-5)).toBe(false);
    });

    it('returns false for null/undefined and true for objects/booleans', () => {
      expect(isRequired(null)).toBe(false);
      expect(isRequired(undefined)).toBe(false);
      expect(isRequired({})).toBe(true);
      expect(isRequired(true)).toBe(true);
    });
  });
});