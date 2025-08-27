import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetButton from './ResetButton';

describe('ResetButton Component', () => {
  test('renders with default props', () => {
    const mockOnReset = jest.fn();
    render(<ResetButton onReset={mockOnReset} />);
    
    const button = screen.getByRole('button', { name: /limpar todas as seleções/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Limpar seleções');
    expect(button).not.toBeDisabled();
  });

  test('renders with custom text', () => {
    const mockOnReset = jest.fn();
    render(<ResetButton onReset={mockOnReset} text="Reset Form" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Reset Form');
  });

  test('calls onReset when clicked', () => {
    const mockOnReset = jest.fn();
    render(<ResetButton onReset={mockOnReset} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    const mockOnReset = jest.fn();
    render(<ResetButton onReset={mockOnReset} disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    // Should not call onReset when disabled
    fireEvent.click(button);
    expect(mockOnReset).not.toHaveBeenCalled();
  });

  test('has correct CSS classes when enabled', () => {
    const mockOnReset = jest.fn();
    render(<ResetButton onReset={mockOnReset} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white', 'border-red-500', 'text-red-600');
    expect(button).not.toHaveClass('bg-gray-100', 'text-gray-400', 'cursor-not-allowed');
  });

  test('has correct CSS classes when disabled', () => {
    const mockOnReset = jest.fn();
    render(<ResetButton onReset={mockOnReset} disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-100', 'text-gray-400', 'cursor-not-allowed');
    expect(button).not.toHaveClass('bg-white', 'border-red-500', 'text-red-600');
  });

  test('has proper accessibility attributes', () => {
    const mockOnReset = jest.fn();
    render(<ResetButton onReset={mockOnReset} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Limpar todas as seleções do formulário');
    expect(button).toHaveAttribute('type', 'button');
  });
});
