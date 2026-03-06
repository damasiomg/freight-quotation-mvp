import { uniqueBy } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/quotes/calculate-freight`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': API_TOKEN || '',
      },
      body: JSON.stringify({
        ...body,
        token: API_TOKEN,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data?.message || 'Erro ao calcular frete' },
        { status: response.status }
      );
    }

    const services = uniqueBy(data?.result, 'service')?.map((item: any) => ({
      id: item?.shipping_company_id || '',
      carrier_name: item?.shipping_company_name || item?.service || '',
      service_name: item?.service || '',
      price: item?.value || 0,
      delivery_time: item?.days || 0,
      delivery_date: item?.estimate_delivery || '-',
      document_type: item?.accept_content_declaration ? 'DC' : 'NF',
      rating: item?.shipping_company_rating || 0,
      carrier_avatar: item?.shipping_company_avatar || '',
      carrier_url: item?.shipping_company_url || '',
      document: item?.shipping_company_document || '',
      is_valid: item?.is_valid || false,
      error: item?.errors?.length > 0 ? item.errors[0] : null,
    })) || [];

    return NextResponse.json({
      success: true,
      data: {
        services,
        
        customer_id: 'mock-customer-123',
        type: 'freight',
      },
    });
  } catch (error: any) {
    console.error('Quote API Error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
