import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders title', () => {
    render(<Hero />);

    expect(screen.getByText('Corte Italiana')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<Hero />);

    expect(screen.getByText(/auténtica cocina italiana/i)).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<Hero />);

    expect(screen.getByText('Reserva Tu Mesa')).toBeInTheDocument();
  });

  it('renders scroll indicator', () => {
    render(<Hero />);

    expect(screen.getByText('Scroll')).toBeInTheDocument();
  });
});
