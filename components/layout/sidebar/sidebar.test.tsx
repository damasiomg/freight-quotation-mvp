import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './sidebar';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, fill, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

const mockPush = jest.fn();
const mockUseRouter = jest.fn(() => ({ push: mockPush }));
const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => mockUseRouter(),
  usePathname: () => mockUsePathname(),
}));

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('collapses sidebar when collapse button is clicked and calls onCollapsedChange', async () => {
    const user = userEvent.setup();
    const onCollapsedChange = jest.fn();
    mockUsePathname.mockReturnValue('/');
    render(<Sidebar onCollapsedChange={onCollapsedChange} />);

    const collapseBtn = screen.getByRole('button', { name: /Recolher menu/i });
    await user.click(collapseBtn);

    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText(/Olá, /i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Expandir menu/i })).toBeInTheDocument();
  });


  it('navigates to "/" when menu button clicked in expanded state', async () => {
    const user = userEvent.setup();
    mockUsePathname.mockReturnValue('/');
    render(<Sidebar />);

    const menuBtn = screen.getByRole('button', { name: /Calculadora de frete/i });
    await user.click(menuBtn);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('applies active class to menu button when pathname matches', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Sidebar />);
    const menuBtn = screen.getByRole('button', { name: /Calculadora de frete/i });
    expect(menuBtn.className).toMatch(/active/);
  });

  it('does not apply active class when pathname does not match', () => {
    mockUsePathname.mockReturnValue('/other');
    render(<Sidebar />);
    const menuBtn = screen.getByRole('button', { name: /Calculadora de frete/i });
    expect(menuBtn.className).not.toMatch(/active/);
  });
});