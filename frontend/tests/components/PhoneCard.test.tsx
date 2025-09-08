import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { Phone } from '@/types';
import PhoneCard from '../../src/components/PhoneCard';

const mockPhone: Phone = {
  id: 1,
  name: 'iPhone 7',
  manufacturer: 'Apple',
  price: 769,
  color: 'black',
  screen: '4.7 inch IPS',
  processor: 'A10 Fusion',
  ram: 2,
  imageFileName: 'iPhone_7.png',
  description: 'Test description'
};

describe('PhoneCard', () => {
  it('renders phone information correctly', () => {
    const mockOnClick = vi.fn();

    render(<PhoneCard phone={mockPhone} onClick={mockOnClick} />);

    expect(screen.getByText('iPhone 7')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('$769')).toBeInTheDocument();
    expect(screen.getByText('4.7 inch IPS')).toBeInTheDocument();
    expect(screen.getByText('A10 Fusion')).toBeInTheDocument();
    expect(screen.getByText('2GB RAM')).toBeInTheDocument();
    expect(screen.getByText('black')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const mockOnClick = vi.fn();

    render(<PhoneCard phone={mockPhone} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation', () => {
    const mockOnClick = vi.fn();

    render(<PhoneCard phone={mockPhone} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('displays fallback when image fails to load', () => {
    const mockOnClick = vi.fn();

    render(<PhoneCard phone={mockPhone} onClick={mockOnClick} />);

    const image = screen.getByAltText('iPhone 7 - Apple');
    fireEvent.error(image);

    expect(screen.getByText('Image not available')).toBeInTheDocument();
  });
});
