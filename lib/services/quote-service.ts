import axios from 'axios';
import { QuoteRequest, QuoteResponse } from '@/lib/types/freight';

export const calculateFreight = async (
  request: Omit<QuoteRequest, 'token'>
): Promise<QuoteResponse> => {
  try {
    const response = await axios.post('/api/quote', request, {
      timeout: 30000,
    });
    
    return response?.data ?? { success: false, error: 'Resposta inválida' };
  } catch (error: any) {
    console.error('Calculate Freight Error:', error);
    return {
      success: false,
      error: error?.response?.data?.error ?? error?.message ?? 'Erro ao calcular frete',
    };
  }
};
