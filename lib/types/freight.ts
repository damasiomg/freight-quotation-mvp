

export interface Volume {
  quantity: number;
  length: number;
  height: number;
  weight: number;
  width: number;
  price: number;
}

export interface QuoteRequest {
  token: string;
  zip_code_start: string;
  zip_code_end: string;
  volumes: Volume[];
  amount: number;
}

export interface QuoteService {
  id: string;
  carrier_name: string;
  carrier_avatar?: string;
  carrier_url?: string;
  service_name: string;
  delivery_time: number;
  price: number;
  carrier_logo?: string;
  rating?: string;
  document_type?: string;
  document?: string;
  delivery_date?: string;
  error?: string;
}

export interface QuoteResponse {
  success: boolean;
  data?: {
    customer_id: string;
    type: string;
    services: QuoteService[];
  };
  error?: string;
}

export interface FreightItem {
  amount: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  description: string;
  unit_price: number;
  total_price: number;
}

export interface FreightContentStatement {
  documentType: string;
  destiny_document: string;
  destiny_name: string;
  destiny_email: string;
  destiny_zipcode: string;
  destiny_street: string;
  destiny_number: string;
  destiny_neighborhood: string;
  destiny_city: string;
  items: FreightItem[];
  sender_document: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  sender_zipcode: string;
  sender_number: string;
  sender_city: string;
  sender_neighborhood: string;
  sender_street: string;
  sender_state: string;
  sender_complement: string;
  destiny_phone: string;
  destiny_complement: string;
  destiny_state: string;
  observation: string;
}

export interface OrderPayload {
  quote_service_id: string;
  customer_id: string;
  type: string;
  freightContentStatement: FreightContentStatement;
}

export interface QuotationState {
  zipCodeStart: string;
  zipCodeEnd: string;
  volumes: Volume[];
  totalAmount: number;
  quotationResults: QuoteService[];
  selectedService: QuoteService | null;
  customerId: string;
  type: string;
  loading: boolean;
  error: string | null;
}

export interface HiringState {
  sender: {
    document: string;
    documentType: 'CPF' | 'CNPJ';
    name: string;
    email: string;
    phone: string;
    zipcode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  destiny: {
    document: string;
    documentType: 'CPF' | 'CNPJ';
    name: string;
    email: string;
    phone: string;
    zipcode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  observation: string;
}
