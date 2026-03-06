import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuoteResultCard } from '@/components/molecules/quote-result-card';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

jest.mock('../../../lib/utils', () => ({
  formatCurrency: jest.fn((v: number) => `R$ ${v.toFixed(2).replace('.', ',')}`),
}));

jest.mock('../../../lib/utils', () => ({
  capitalizeText: jest.fn((s: string) => (s ? `${s.charAt(0).toUpperCase()}${s.slice(1)}` : s)),
  formatDecimal: jest.fn((n: number) => (Number.isNaN(n) ? '0' : String(n))),
}));

describe('QuoteResultCard', () => {
  const mockService = {
    carrier_avatar: '/avatar.png',
    carrier_url: 'https://example.com/provider',
    service_name: 'transportadora x',
    rating: '4.5',
    price: 1234.56,
    delivery_time: '3',
    document_type: 'AWB',
    delivery_date: '2024-03-01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (window as any).open = jest.fn();
  });

  it('renders provider name, formatted price and other fields', () => {
    render(<QuoteResultCard service={mockService as any} onSelect={jest.fn()} />);

    expect(screen.getByText(/Transportadora x/i)).toBeInTheDocument();

    expect(screen.getByText(/3 dias úteis/i)).toBeInTheDocument();

    expect(screen.getByText(/AWB/i)).toBeInTheDocument();

    expect(screen.getByText(/2024-03-01/i)).toBeInTheDocument();
  });

  it('calls onSelect when the card action/button is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<QuoteResultCard service={mockService as any} onSelect={onSelect} />);

    const btn = screen.getByRole('button', { name: /selecionar/i });
    await user.click(btn);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ service_name: mockService.service_name }));
  });

  it('opens carrier_url in a new tab when carrier link/area is clicked', async () => {
    const user = userEvent.setup();
    render(<QuoteResultCard service={mockService as any} onSelect={jest.fn()} />);

    const carrierNameEl = screen.getByText(/Transportadora x/i);
    await user.click(carrierNameEl);

    expect((window as any).open).toHaveBeenCalledTimes(1);
    expect((window as any).open).toHaveBeenCalledWith(mockService.carrier_url, '_blank');
  });

  it('renders "Selecionado" text when selected prop is true', () => {
    render(<QuoteResultCard service={mockService as any} onSelect={jest.fn()} selected={true} />);
    expect(screen.getByRole('button', { name: /selecionado/i })).toBeInTheDocument();
  });

  it('shows fallback when delivery_time is missing', () => {
    const s = { ...mockService, delivery_time: undefined };
    render(<QuoteResultCard service={s as any} onSelect={jest.fn()} />);
    expect(screen.getByText(/- dias úteis/i)).toBeInTheDocument();
  });
});