
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { FixedLabelInput } from '@/components/atoms/fixed-label-input';
import userEvent from '@testing-library/user-event';
import { maskCPF } from '@/lib/utils/masks';


describe('FixedLabelInput', () => {
  it('renders label and input', () => {
    render(<FixedLabelInput label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('applies mask cpf correctly', async () => {
    const user = userEvent.setup();
    render(<FixedLabelInput label="CPF" mask={maskCPF} />);
    const input = screen.getByLabelText('CPF') as HTMLInputElement;

    await user.type(input, '12345678901');
    await user.tab();
    await waitFor(async () => {
      expect(input).toHaveValue('123.456.789-01');    
    });
  });
});
