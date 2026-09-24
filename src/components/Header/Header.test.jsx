import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

const user = userEvent.setup();

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
});

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />);

    expect(screen.getByText('Corte Italiana')).toBeInTheDocument();
    expect(screen.getByText('🍝')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Inicio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Menú' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Reservar' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: 'Galería' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contacto' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reseñas' })).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Reservar Mesa' })).toBeInTheDocument();
  });

  it('toggles mobile menu', async () => {
    render(<Header />);

    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });
});
